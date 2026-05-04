import express from "express";
import { products, reviews } from "../config/db/schema";
import { AppError } from "../utils/appError";
import { db } from "../config/db";
import { eq } from "drizzle-orm";

// rate a product
export const reviewProduct = async (
  res: express.Response,
  req: express.Request,
) => {
  try {
    const { rating, content, productId } = req.body;
    if (!rating || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required field" });
    }

    // update rating and content to user payload
    // todo: keep track of the person who rate the product
    const result = await db
      .insert(reviews)
      .values({
        productId: productId,
        rating,
        content,
      })
      .returning();
    res.status(201).json({ message: "Review added", review: result[0] });
  } catch (error) {
    throw new AppError(`${(error as Error).message}}`, 500);
  }
};

// get reviews for a product
export const getProductReviews = async (
  res: express.Response,
  req: express.Request,
) => {
  try {
    const productId = req.params;
    if (typeof productId !== "string") {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const result = await db
      .select()
      .from(reviews)
      .where(eq(reviews.productId, productId));
    res.status(200).json({
      success: true,
      message: "Fetched product reviews",
      count: result.length,
      reviews: result,
    });
  } catch (error) {
    throw new AppError(`${(error as Error).message}}`, 500);
  }
};
