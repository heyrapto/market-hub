import express from "express";
import { products, reviews, users } from "../config/db/schema";
import { AppError } from "../utils/appError";
import { db } from "../config/db";
import { avg, count, eq } from "drizzle-orm";

// review a product
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

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // update rating and content to user payload
    const result = await db
      .insert(reviews)
      .values({
        userId: userId,
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
    const { limit, page } = req.query;
    const productId = req.params;
    if (typeof productId !== "string") {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const startIndex = (Number(page) - 1) * Number(limit);
    const total = (await db.select().from(products)).length;
    const result = await db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        content: reviews.content,
        avgRating: avg(reviews.rating),
        totalReviews: count(reviews.id),
        user: {
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
        },
      })
      .from(reviews)
      .leftJoin(users, eq(users.id, reviews.userId))
      .where(eq(reviews.productId, productId))
      .offset(startIndex);

    const avgRating = result[0]?.avgRating ? Number(result[0].avgRating) : 0;

    const totalReviews = Number(result[0]?.totalReviews ?? 0);
    res.status(200).json({
      success: true,
      message: "Fetched product reviews",
      count: result.length,
      reviews: result,
      avgRating,
      totalReviews,
      page,
      limit,
      total,
    });
  } catch (error) {
    throw new AppError(`${(error as Error).message}}`, 500);
  }
};
