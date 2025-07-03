"use client";

import AdminSidebar from "@/components/admin-sidebar";

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Reports</h1>
        <p>This is the reports page.</p>
      </main>
    </div>
  );
}
