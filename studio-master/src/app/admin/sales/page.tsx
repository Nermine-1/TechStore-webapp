"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orders as ordersApi } from "@/lib/api";
import { Order } from "@/lib/types";

export default function SalesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await ordersApi.getAll();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Sales</h1>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Customer</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Total</th>
                    <th className="p-2">Products</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id || order.id}>
                      <td className="p-2">{order.customerName}</td>
                      <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-2">${order.total.toFixed(2)}</td>
                      <td className="p-2">{order.products.map((p) => p.name).join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
