"use client";

import AdminSidebar from "@/components/admin-sidebar";

export default function WarehousePage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Warehouse</h1>
        <p>This is the warehouse page.</p>
      </main>
    </div>
  );
}
