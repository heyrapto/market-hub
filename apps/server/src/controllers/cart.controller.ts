import express from "express";
import { db } from "../config/db";
import { cartItems, products, orders, orderItems } from "../config/db/schema";
import { env } from "../config/env";
import { paystack } from "../config/paystack";
import { AppError } from "../utils/appError";
import { and, eq, sql } from "drizzle-orm";

// add to cart
export const addToCart = async (
  req: express.Request,
  res: express.Response,
) => {
  const { productId, quantity } = req.body;
  const userId = req.user?.id;

  try {
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (!productId || quantity === undefined || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid productId and quantity",
      });
    }
    const result = await db
      .insert(cartItems)
      .values({
        userId: userId,
        productId: productId,
        quantity: quantity,
      })
      .onConflictDoUpdate({
        target: [cartItems.userId, cartItems.productId],
        set: {
          quantity: sql`${cartItems.quantity} + ${quantity}`,
        },
      })
      .returning();

    res.status(201).json({
      success: true,
      message: "Item added to cart.",
      data: result[0],
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to retrieve order details" });
  }
};

// get cart
export const getCart = async (req: express.Request, res: express.Response) => {
  const userId = req.user?.id as string;
  try {
    const cartRows = await db
      .select({
        cartId: cartItems.id,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        product: {
          title: products.title,
          price: products.price,
        },
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId));

    const cartTotal = cartRows.reduce((sum, row) => {
      const price = row.product?.price ? Number(row.product.price) : 0;
      return sum + price * row.quantity;
    }, 0);
    res.status(200).json({
      success: true,
      data: {
        items: cartRows.map((row) => ({
          id: row.cartId,
          productId: row.productId,
          quantity: row.quantity,
          // expiresAt: row.expiresAt,
          name: row.product?.title || "Unknown Product",
          price: row.product?.price || "0",
          itemTotal:
            (row.product?.price ? Number(row.product.price) : 0) * row.quantity,
        })),
        totalAmount: cartTotal.toString(),
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to retrieve order details" });
  }
};

// update cart
export const updateCart = async (
  req: express.Request,
  res: express.Response,
) => {
  const { quantity, productId } = req.body;
  const userId = req.user?.id as string;
  try {
    if (!productId || quantity === undefined || quantity < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID or quantity" });
    }

    const updateResult = await db
      .update(cartItems)
      .set({ quantity: Number(quantity) })
      .where(
        and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)),
      )
      .returning();

    res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
      data: updateResult[0],
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to retrieve order details" });
  }
};

// checkout
export const checkoutCart = async (
  req: express.Request,
  res: express.Response,
) => {
  const userId = req.user?.id;
  const email = req.user?.email;

  if (!userId || !email) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const result = await db.transaction(async (tx) => {
      const userCart = await tx
        .select({
          cartItem: cartItems,
          product: {
            price: products.price,
          },
        })
        .from(cartItems)
        .innerJoin(products, eq(cartItems.productId, products.id))
        .where(eq(cartItems.userId, userId));

      if (userCart.length === 0) {
        throw new AppError("Cart is empty", 400);
      }

      const totalAmount = userCart.reduce((sum, item) => {
        return sum + Number(item.product.price) * item.cartItem.quantity;
      }, 0);

      // initialize paystack transaction
      const { ok, data } = await paystack.initializePayment({
        email,
        amount: Math.round(totalAmount * 100),
        ...(env.PAYSTACK_PLAN_CODE && { plan: env.PAYSTACK_PLAN_CODE }),
        ...(env.PAYSTACK_CALLBACK_URL && { callback_url: env.PAYSTACK_CALLBACK_URL }),
        metadata: {
          userId,
          cartCheckout: true,
        },
      });

      if (!ok || !data.status) {
        throw new AppError(data.message || "Failed to initialize payment", 400);
      }

      // create the main order record with pending status
      const [newOrder] = await tx
        .insert(orders)
        .values({
          userId,
          buyerId: userId,
          totalAmount: totalAmount.toString(),
          status: "pending",
          paystackPaymentIntentId: data.data.reference,
        })
        .returning({ id: orders.id });

      const itemsToInsert = userCart.map((item) => ({
        orderId: newOrder.id,
        productId: item.cartItem.productId,
        quantity: item.cartItem.quantity,
        price: item.product.price,
      }));

      await tx.insert(orderItems).values(itemsToInsert);

      // clear the cart
      await tx.delete(cartItems).where(eq(cartItems.userId, userId));

      return {
        orderId: newOrder.id,
        authorizationUrl: data.data.authorization_url,
        reference: data.data.reference,
      };
    });

    res.status(200).json({
      success: true,
      message: "Checkout initialized successfully",
      data: result,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    res
      .status(500)
      .json({
        success: false,
        message: error.message || "Failed to process checkout",
      });
  }
};
