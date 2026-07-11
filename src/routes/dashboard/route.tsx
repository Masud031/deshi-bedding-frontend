import {
  Outlet,
  createFileRoute,
  useLocation,
  Navigate,
  redirect,
} from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import type { RootState } from "@/Redux/store";

import AdminSidebar from "@/components/dashboard/admin/AdminSidebar";
import UserSidebar from "@/components/dashboard/user/UserSidebar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  const location = useLocation();

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render nothing until client has mounted
  if (!mounted) {
    return null;
  }

  // Redirect if user is not logged in
  // if (!user) {
  //   return <Navigate to="/login" />;
  // }
  if (!user) {
  throw redirect({
    to: "/login",
  });
}

  const hideSidebar =
    location.pathname.startsWith("/dashboard/manage-orders") ||
    location.pathname.startsWith("/dashboard/invoice");

  return (
    <div className="container mx-auto mt-6 flex flex-col gap-6 lg:flex-row">
      {!hideSidebar && (
        <aside className="w-full rounded-xl border bg-white lg:w-72">
          {user.role === "admin" ? (
            <AdminSidebar />
          ) : (
            <UserSidebar />
          )}
        </aside>
      )}

      <main className="min-h-screen flex-1 rounded-xl border bg-white p-6">
        <Outlet />
      </main>
    </div>
  );
}