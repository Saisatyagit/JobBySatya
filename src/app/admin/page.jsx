import Link from 'next/link';
import React from 'react';
import { auth } from '../auth';
import { redirect } from 'next/navigation';
import AdminNavbar from '../components/AdminNavbar';
import AdminDashboard from './Adminster';

const AdminPage = async () => {
  const session = await auth();

  // ✅ Step 1: Check if logged in
  if (!session) {
    redirect("/api/Login"); // Redirect unauthenticated users
  }

  // ✅ Step 2: Check if user is NOT an admin
  const isAdmin = session?.user?.role === "admin";
  if (!isAdmin) {
    redirect("/api/Login"); // 👈 Redirect unauthorized users too
  }

  // ✅ Step 3: Render Admin page for valid admin users
  return (
    <div className="container">
      <AdminNavbar />
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
