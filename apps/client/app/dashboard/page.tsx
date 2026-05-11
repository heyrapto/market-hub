"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FiArrowLeft, FiPlus, FiTrash2, FiEye, 
  FiPackage, FiTruck, FiCheck, FiMoreVertical 
} from "react-icons/fi";
import { MotionHighlight, MotionHighlightItem } from "@/app/components/ui/motion-highlight";
import AddProductModal from "@/app/components/dashboard/AddProductModal";

// Dummy Data
const INITIAL_LISTINGS = [
  { id: "PROD-1", title: "Nike Air Max 270", category: "Fashion", price: 85000, qty: 42, image: "/images/hero-bg.png" },
  { id: "PROD-2", title: "Samsung 55\" QLED", category: "Electronics", price: 420000, qty: 5, image: "/images/hero-bg.png" },
  { id: "PROD-3", title: "JBL Flip 6", category: "Electronics", price: 32000, qty: 15, image: "/images/hero-bg.png" },
];

const INITIAL_ORDERS = [
  { id: "ORD-938210", product: "Nike Air Max 270", buyer: "John Doe", address: "Victoria Island, Lagos", status: "Pending", date: "May 10" },
  { id: "ORD-847192", product: "JBL Flip 6", buyer: "Sarah Connor", address: "Garki, Abuja", status: "Shipped", date: "May 09" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Listings");
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleDeleteListing = (id: string) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateOrderStatus = (id: string, newStatus: string) => {
    setOrders((prev) => prev.map((order) => order.id === id ? { ...order, status: newStatus } : order));
  };

  const handleAddProduct = (product: any) => {
    setListings([product, ...listings]);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans pb-20">
      
      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddProduct}
      />

      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-[#f5f5f5]/80 backdrop-blur-md border-b border-gray-200/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-5 h-5 rounded-full border-[3px] border-blue-600" />
            <span className="text-xl font-bold text-gray-900 font-serif">Keriro Seller</span>
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
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your storefront listings and customer orders.</p>
          </div>
          
          {activeTab === "Listings" && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="h-11 px-5 rounded-[12px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
            >
              <FiPlus className="w-4 h-4" />
              List Product
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-[16px] shadow-sm border border-gray-200 p-1.5 mb-6 inline-block">
          <MotionHighlight
            mode="parent"
            controlledItems={true}
            value={activeTab}
            onValueChange={(val) => val && setActiveTab(val)}
            className="bg-gray-100 rounded-[12px]"
            containerClassName="flex items-center"
          >
            {["Listings", "Orders"].map((tab) => (
              <MotionHighlightItem
                key={tab}
                value={tab}
                className="px-6 py-2.5 rounded-[12px] font-bold text-sm transition-colors cursor-pointer relative z-10"
              >
                <span className={activeTab === tab ? "text-gray-900" : "text-gray-500 hover:text-gray-800"}>
                  {tab} {tab === "Orders" && <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{orders.filter(o => o.status === "Pending").length}</span>}
                </span>
              </MotionHighlightItem>
            ))}
          </MotionHighlight>
        </div>

        {/* Content Area */}
        <div className="bg-gray-100/80 p-1.5 rounded-[26px] border border-gray-200/50 shadow-sm">
          <div className="bg-white rounded-[20px] overflow-hidden min-h-[400px]">
            
            {/* LISTINGS TAB */}
            {activeTab === "Listings" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      <th className="px-6 py-4 font-bold border-r border-gray-200">Product</th>
                      <th className="px-6 py-4 font-bold border-r border-gray-200">Category</th>
                      <th className="px-6 py-4 font-bold text-right border-r border-gray-200">Price</th>
                      <th className="px-6 py-4 font-bold text-center border-r border-gray-200">Stock</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.length > 0 ? listings.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors group cursor-pointer">
                        <td className="px-6 py-4 border-r border-gray-200">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-[10px] bg-gray-100 overflow-hidden shrink-0">
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</p>
                              <p className="text-xs text-gray-400">{item.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-200">
                          <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">{item.category}</span>
                        </td>
                        <td className="px-6 py-4 text-right border-r border-gray-200">
                          <p className="text-sm font-bold text-gray-900">₦{item.price.toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4 text-center border-r border-gray-200">
                          <span className={`text-sm font-bold ${item.qty < 10 ? 'text-red-500' : 'text-green-600'}`}>
                            {item.qty}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteListing(item.id)} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-16 text-center">
                          <FiPackage className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 font-medium">You have no active listings.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "Orders" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      <th className="px-6 py-4 font-bold border-r border-gray-200">Order Info</th>
                      <th className="px-6 py-4 font-bold border-r border-gray-200">Buyer Details</th>
                      <th className="px-6 py-4 font-bold border-r border-gray-200">Status</th>
                      <th className="px-6 py-4 font-bold text-right">Fulfillment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? orders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer">
                        <td className="px-6 py-4 border-r border-gray-200">
                          <p className="text-sm font-bold text-gray-900">{order.product}</p>
                          <p className="text-xs text-gray-400">{order.id} • {order.date}</p>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-200">
                          <p className="text-sm font-semibold text-gray-700">{order.buyer}</p>
                          <p className="text-xs text-gray-500 max-w-[200px] truncate">{order.address}</p>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-200">
                          {order.status === "Pending" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
                              <FiPackage className="w-3.5 h-3.5" /> Pending
                            </span>
                          )}
                          {order.status === "Shipped" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                              <FiTruck className="w-3.5 h-3.5" /> Shipped
                            </span>
                          )}
                          {order.status === "Delivered" && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
                              <FiCheck className="w-3.5 h-3.5" /> Delivered
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {order.status === "Pending" && (
                            <button 
                              onClick={() => handleUpdateOrderStatus(order.id, "Shipped")}
                              className="px-4 py-1.5 bg-gray-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                            >
                              Mark Shipped
                            </button>
                          )}
                          {order.status === "Shipped" && (
                            <button 
                              onClick={() => handleUpdateOrderStatus(order.id, "Delivered")}
                              className="px-4 py-1.5 bg-white hover:bg-green-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-colors shadow-sm"
                            >
                              Mark Delivered
                            </button>
                          )}
                          {order.status === "Delivered" && (
                            <button className="w-8 h-8 rounded-full bg-gray-50 border border-transparent text-gray-400 flex items-center justify-center ml-auto">
                              <FiMoreVertical className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-16 text-center">
                          <FiTruck className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 font-medium">No orders to fulfill.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
