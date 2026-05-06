import express from "express";
import { AppError } from "../utils/appError";
import { products } from "../config/db/schema";
import { db } from "../config/db";
import { eq } from "drizzle-orm";
import { inArray } from "drizzle-orm";

// get all products
export const getAllProducts = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const startIndex = (Number(page) - 1) * Number(limit);
    const total = (await db.select().from(products)).length;
    const allProducts = await db
      .select()
      .from(products)
      .offset(startIndex)
      .orderBy(products.id);

    res.status(200).json({
      success: true,
      message: "Success",
      products: allProducts,
      page,
      limit,
      total,
    });
  } catch (error) {
    throw new AppError(`${(error as Error).message}}`, 500);
  }
};

// create a product
export const createProduct = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { title, description, price, stock, sellerId } = req.body;
    if (!title || !description || !price || !stock) {
      return res
        .status(400)
        .json({ message: "Required missing fields", success: false });
    }

    const imageUrl: string = `uploads/${req.file?.filename}`;

    const [newProduct] = await db
      .insert(products)
      .values({
        sellerId: sellerId,
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        stock: stock,
      })
      .returning();

    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      product: newProduct,
    });
  } catch (error) {
    throw new AppError(`${(error as Error).message}}`, 500);
  }
};

// get a product by id
export const getProductById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { productId } = req.params;
    if (typeof productId !== "string") {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    res.status(201).json({
      success: true,
      message: "Product search complete.",
      product: result,
    });
  } catch (error) {
    throw new AppError(`${(error as Error).message}}`, 500);
  }
};

// update a product
export const updateProduct = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { productId } = req.params;
    const { title, description, price, stock } = req.body;
    if (typeof productId !== "string") {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    // find the product by id
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);
    // return err if it doesn't exist
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    // attach image from multer
    const imageUrl: string = `uploads/${req.file?.filename}`;
    // update and send the updated product
    const updatedProduct = db
      .update(products)
      .set({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        stock: stock,
      })
      .where(eq(products.id, productId))
      .returning();

    res.status(201).json({
      success: true,
      message: "Product updated.",
      product: updatedProduct,
    });
  } catch (error) {
    throw new AppError(`${(error as Error).message}}`, 500);
  }
};

// delete a product
export const deleteProduct = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { productId } = req.params;
    if (typeof productId !== "string") {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    await db.delete(products).where(eq(products.id, productId));
    res
      .status(201)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    throw new AppError(`${(error as Error).message}}`, 500);
  }
};

// delete multiple products
export const deleteMultipleProducts = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const ids = req.body.ids;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: "ids must be an array" });
    }

    const parsedIds = ids
      .map((id: any) => Number(id))
      .filter((id: number) => !isNaN(id));

    if (parsedIds.length === 0) {
      return res.status(400).json({ error: "No valid IDs provided" });
    }

    // ensure they are strings
    const validIds = ids.filter(
      (id: unknown): id is string => typeof id === "string",
    );

    await db.delete(products).where(inArray(products.id, validIds));

    res.json({ success: true, deletedIds: parsedIds });
  } catch (error) {
    throw new AppError(`${(error as Error).message}}`, 500);
  }
};
