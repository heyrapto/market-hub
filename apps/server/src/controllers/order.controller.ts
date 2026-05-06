import express from "express";
import { cartItems, orderItems, orders, products } from "../config/db/schema";
import { AppError } from "../utils/appError";
import { db } from "../config/db";
import { eq } from "drizzle-orm";

// place an order
export const placeOrder = async (
  req: express.Request,
  res: express.Response,
) => {
  const userId = req.user?.id;
  // fetch current user cartItems
  try {
    if (typeof userId !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId provided" });
    }
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
        throw new AppError(`User cart is empty`, 404);
      }

      const totalAmount = userCart
        .reduce((sum, item) => {
          return sum + Number(item.product.price) * item.cartItem.quantity;
        }, 0)
        .toString();

      // create the main order record
      const [newOrder] = await tx
        .insert(orders)
        .values({
          userId,
          buyerId: userId,
          totalAmount,
        })
        .returning({ id: orders.id });

      const itemsToInsert = userCart.map((item) => ({
        orderId: newOrder.id,
        productId: item.cartItem.productId,
        quantity: item.cartItem.quantity,
        price: item.product.price,
      }));

      await tx.insert(orderItems).values(itemsToInsert);

      await tx.delete(cartItems).where(eq(cartItems.userId, userId));
      return { orderId: newOrder.id };
    });

    res
      .status(201)
      .json({ message: "Order created successfully", orderId: result.orderId });
  } catch (error: any) {
    if (error.message === "Cart is empty") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to process order" });
    }
  }
};

// get order details
export const getOrderDetails = async (
  req: express.Request,
  res: express.Response,
) => {
  const orderId = req.params.id;
  const authenticatedUserId = req.user?.id;

  try {
    if (typeof orderId !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId provided" });
    }
    // fetch the order along with its structural item breakdown and product details
    const orderRows = await db
      .select({
        orderId: orders.id,
        userId: orders.userId,
        totalAmount: orders.totalAmount,
        status: orders.status,
        createdAt: orders.createdAt,
        item: {
          id: orderItems.id,
          productId: orderItems.productId,
          quantity: orderItems.quantity,
          pricePaid: orderItems.price,
        },
        product: {
          name: products.title,
          imageUrl: products.imageUrl,
        },
      })
      .from(orders)
      .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orders.id, orderId));

    // if no records return, the order does not exist
    if (orderRows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    // security Check: ensure the logged-in user owns this order record
    if (orderRows[0].userId !== authenticatedUserId) {
      return res.status(403).json({ error: "Unauthorized to view this order" });
    }

    // format SQL flat rows into a clean, structured JSON Object payload
    const orderDetails = {
      id: orderRows[0].orderId,
      totalAmount: orderRows[0].totalAmount,
      status: orderRows[0].status,
      createdAt: orderRows[0].createdAt,
      items: orderRows
        .filter((row) => row.item!.id !== null) // filter out null structures if orders are empty
        .map((row) => ({
          id: row.item!.id,
          productId: row.item!.productId,
          quantity: row.item!.quantity,
          pricePaid: row.item!.pricePaid,
          productName: row.product?.name || "Unknown Product",
          productImage: row.product?.imageUrl || null,
        })),
    };

    res.status(200).json(orderDetails);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to retrieve order details" });
  }
};

// get order status
export const getOrderStatus = async (
  req: express.Request,
  res: express.Response,
) => {
  const orderId = req.params;
  try {
    if (typeof orderId !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid order id" });
    }

    // find the order
    const orderRows = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);
    if (!orderRows) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    const order = orderRows[0];

    res.status(200).json({
      success: true,
      message: "Order status retrieved successfully",
      orderStatus: order.status,
    });
  } catch (error) {
    throw new AppError("An orror occured", 500);
  }
};

// cancel order
export const cancelOrder = async (
  req: express.Request,
  res: express.Response,
) => {
  const orderId = req.params;
  try {
    if (typeof orderId !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid order id" });
    }
    const order = db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }

    const canceledOrder = db
      .update(orders)
      .set({ status: "cancelled" })
      .where(eq(orders.id, orderId))
      .returning();

    res.status(201).json({
      success: true,
      message: "Order canceled.",
      data: canceledOrder,
    });
  } catch (error) {
    throw new AppError("An orror occured", 500);
  }
};
