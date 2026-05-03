export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "buyer" | "seller" | "admin";
  paystackAccountId: string | null;
  googleId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string | null;
  stock: number;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  buyerId: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  totalAmount: string;
  paystackPaymentIntentId: string | null;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string;
}

export interface RefreshToken {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}
