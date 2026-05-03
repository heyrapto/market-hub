export interface User {
  id: string;
  email: string;
  name: string;
  role: "buyer" | "seller" | "admin";
  createdAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  stock: number;
  createdAt: Date;
}

export interface Order {
  id: string;
  buyerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}
