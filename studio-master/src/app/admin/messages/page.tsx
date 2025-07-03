"use client";

import AdminSidebar from "@/components/admin-sidebar";

export default function MessagesPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        <p>This is the messages page.</p>
      </main>
    </div>
  );
}
