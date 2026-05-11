"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft, FiPlus, FiPackage, FiTruck, FiCheckCircle,
  FiXCircle, FiChevronRight, FiClock, FiSearch, FiFilter
} from "react-icons/fi";
import CreateOrderModal from "@/app/components/orders/CreateOrderModal";

// Dummy Order Data
const DUMMY_ORDERS = [
  {
    id: "ORD-938210",
    date: "May 10, 2026",
    total: 125000,
    status: "Processing",
    items: [
      { name: "Nike Air Max 270", image: "/images/hero-bg.png", qty: 1 },
      { name: "Adidas Running Socks", image: "/images/hero-bg.png", qty: 2 }
    ]
  },
  {
    id: "ORD-847192",
    date: "May 05, 2026",
    total: 420000,
    status: "Shipped",
    items: [
      { name: "Samsung 55\" QLED 4K Smart TV", image: "/images/hero-bg.png", qty: 1 }
    ]
  },
  {
    id: "ORD-716293",
    date: "April 28, 2026",
    total: 32000,
    status: "Delivered",
    items: [
      { name: "JBL Flip 6 Bluetooth Speaker", image: "/images/hero-bg.png", qty: 1 }
    ]
  },
  {
    id: "ORD-625104",
    date: "April 15, 2026",
    total: 48000,
    status: "Cancelled",
    items: [
      { name: "Philips Air Fryer 4.1L", image: "/images/hero-bg.png", qty: 1 }
    ]
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(DUMMY_ORDERS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCancelOrder = (orderId: string) => {
    // In a real app, this would call an API
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      )
    );
  };

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
            <FiClock className="w-3.5 h-3.5" /> Processing
          </span>
        );
      case "Shipped":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
            <FiTruck className="w-3.5 h-3.5" /> Shipped
          </span>
        );
      case "Delivered":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
            <FiCheckCircle className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case "Cancelled":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200">
            <FiXCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans pb-20">
      
      {/* Modals */}
      <CreateOrderModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />

      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-[#f5f5f5]/80 backdrop-blur-md border-b border-gray-200/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-5 h-5 rounded-full border-[3px] border-blue-600" />
            <span className="text-xl font-bold text-gray-900 font-serif">Keriro</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-semibold group"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Link>
        </div>
      </header>

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-8">
        
        {/* Page Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-sm text-gray-500 mt-1">View, track, and manage your recent purchases.</p>
          </div>
          
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="h-11 px-5 rounded-[12px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
          >
            <FiPlus className="w-4 h-4" />
            Create Order
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-[16px] p-2 border border-gray-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID or item name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-[10px] text-sm outline-none transition-all"
            />
          </div>
          <button className="h-10 px-4 rounded-[10px] bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium text-sm transition-colors border border-gray-200 flex items-center gap-2 shrink-0">
            <FiFilter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Orders List */}
        <div className="flex flex-col gap-5">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-gray-100/80 p-1.5 rounded-[24px] border border-gray-200/50 shadow-sm transition-all hover:shadow-md group cursor-pointer">
                <div className="bg-white rounded-[18px] overflow-hidden flex flex-col">
                  
                  {/* Order Summary Table */}
                  <table className="w-full text-left border-collapse border-b border-gray-100">
                    <thead>
                      <tr className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                        <th className="px-6 py-4 font-bold border-r border-gray-200">Order Number</th>
                        <th className="px-6 py-4 font-bold border-r border-gray-200">Date Placed</th>
                        <th className="px-6 py-4 font-bold border-r border-gray-200">Total Amount</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="transition-colors">
                        <td className="px-6 py-4 border-r border-gray-200">
                          <p className="text-sm font-bold text-gray-900">{order.id}</p>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-200">
                          <p className="text-sm font-semibold text-gray-700">{order.date}</p>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-200">
                          <p className="text-sm font-extrabold text-gray-900">₦{order.total.toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(order.status)}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Order Items */}
                  <div className="p-5 flex flex-col gap-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-[12px] bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                          <p className="text-xs text-gray-500 mt-1">Qty: {item.qty}</p>
                        </div>
                        <button className="hidden sm:flex text-sm font-semibold text-blue-600 hover:text-blue-700 items-center gap-1 transition-colors">
                          View Item <FiChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="px-5 py-4 border-t border-gray-50 flex items-center justify-end gap-3 bg-white">
                    {(order.status === "Processing" || order.status === "Shipped") && (
                      <button className="h-10 px-5 rounded-[10px] bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-colors shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex items-center gap-2">
                        <FiTruck className="w-4 h-4 text-blue-500" />
                        Track Order
                      </button>
                    )}
                    {order.status === "Processing" && (
                      <button 
                        onClick={() => handleCancelOrder(order.id)}
                        className="h-10 px-5 rounded-[10px] bg-white border border-red-200 hover:bg-red-50 text-red-600 font-semibold text-sm transition-colors shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
                      >
                        Cancel Order
                      </button>
                    )}
                    {(order.status === "Delivered" || order.status === "Cancelled") && (
                      <button className="h-10 px-5 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-sm flex items-center gap-2">
                        <FiPackage className="w-4 h-4" />
                        Buy Again
                      </button>
                    )}
                  </div>

                </div>
              </div>
            ))
          ) : (
            /* Empty / No results State */
            <div className="bg-gray-100/80 p-1.5 rounded-[24px] border border-gray-200/50 text-center py-16">
              <div className="bg-white rounded-[18px] py-16 px-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                  <FiPackage className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No orders found</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  {searchQuery ? "We couldn't find any orders matching your search." : "You haven't placed any orders yet. Start exploring the marketplace!"}
                </p>
                {!searchQuery && (
                  <Link href="/" className="mt-6 h-11 px-6 rounded-[12px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors inline-flex items-center justify-center shadow-sm">
                    Explore Marketplace
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
