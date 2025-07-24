"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminSidebar from "@/components/admin-sidebar";
import { auth, orders, products as productsApi } from "@/lib/api";
import { Order, Product, User } from "@/lib/types";

export default function AdminPage() {
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          orders.getAll(),
          productsApi.getAll(),
          auth.getAllUsers(),
        ]);
        setOrdersData(ordersRes);
        setProductsData(productsRes);
        setUsersData(usersRes);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalSales = ordersData.reduce((acc, order) => acc + order.total, 0);
  const dailySales = ordersData
    .filter((order) => new Date(order.createdAt).toDateString() === new Date().toDateString())
    .reduce((acc, order) => acc + order.total, 0);

  const salesData = ordersData.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleString("default", {
      month: "short",
    });
    const existing = acc.find((item: { name: string; revenue: number }) => item.name === date);
    if (existing) {
      existing.revenue += order.total;
    } else {
      acc.push({ name: date, revenue: order.total });
    }
    return acc;
  }, [] as { name: string; revenue: number }[]);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-100">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8 md:px-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
              <Card className="bg-red-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-800">Total Sales</CardTitle>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-gray-800"
                >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">${totalSales.toFixed(2)}</div>
                <p className="text-xs text-gray-800">+50% Incomes</p>
              </CardContent>
              </Card>
           
            <Card className="bg-green-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-800">Daily User</CardTitle>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-gray-800"
              >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">4215</div>
              <p className="text-xs text-gray-800">+48% New User</p>
            </CardContent>
            </Card>
            <Card className="bg-blue-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-800">Product</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-gray-800">
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{productsData.length}</div>
              <p className="text-xs text-gray-800">+25% New Product</p>
            </CardContent>
            </Card>
            <Card className="bg-yellow-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-800">Expenses</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-gray-800">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">$219.0</div>
              <p className="text-xs text-gray-800">Target Expenses</p>
            </CardContent>
            </Card>
            
            
          </div>
          <Card className="mb-8">
            <CardHeader>
            <CardTitle>Summary Sales</CardTitle>
            </CardHeader>
            <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
              <CardTitle>Last Orders</CardTitle>
              </CardHeader>
              <CardContent>
              <table className="w-full">
                <thead>
                <tr className="text-left">
                  <th className="p-2">Customer</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Product</th>
                </tr>
                </thead>
                <tbody>
                {ordersData.slice(0, 5).map((order) => {
                  const user = usersData.find(u => u.name === order.customerName);
                  const orderId = order._id || order.id || Math.random().toString();
                  return (
                  <tr key={orderId}>
                    <td className="p-2">{user?.name || order.customerName}</td>
                    <td className="p-2">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}</td>
                    <td className="p-2">${order.total?.toFixed(2) ?? '0.00'}</td>
                    <td className="p-2">{order.products?.map(p => p.name).join(', ')}</td>
                  </tr>
                  )
                })}
                </tbody>
              </table>
              </CardContent>
            </Card>
            </div>
            <div className="space-y-8">
            <Card className="bg-orange-100">
              <CardHeader>
              <CardTitle className="text-gray-800">Active Balance</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-800">
                <p className="text-3xl font-bold">$9.470</p>
                <div className="flex justify-between text-sm">
                  <span>Incomes</span>
                  <span>$1699.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Expenses</span>
                  <span>$-799.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes</span>
                  <span>$-199.0</span>
                </div>
                <Button className="w-full mt-4">Add Virtual Card</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
              </CardHeader>
              <CardContent>
              <ul>
                <li className="flex justify-between py-2">
                <span>Easy Pay Way.</span>
                <span className="font-bold">$82258.23</span>
                </li>
                <li className="flex justify-between py-2">
                <span>Payonner.</span>
                <span className="font-bold">$61486.69</span>
                </li>
                <li className="flex justify-between py-2">
                <span>FastSpring.</span>
                <span className="font-bold">$4210.38</span>
                </li>
              </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
              <CardTitle>Expenses Status</CardTitle>
              </CardHeader>
              <CardContent>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={[{ name: 'a', v: 1 }, { name: 'b', v: 3 }, { name: 'c', v: 2 }, { name: 'd', v: 4 }]}>
                <Line type="monotone" dataKey="v" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
              </CardContent>
              </Card>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
