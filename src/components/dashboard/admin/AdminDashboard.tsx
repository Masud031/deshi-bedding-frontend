import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import {
  LayoutDashboard,
  PackagePlus,
  Boxes,
  Users,
  ShoppingBag,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLogoutUserMutation } from "@/Redux/features/auth/authApi";
import { logout } from "@/Redux/features/auth/authSlice";

const navItems = [
  {
    to: "/dashboard/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/dashboard/add-product",
    label: "Add Product",
    icon: PackagePlus,
  },
  {
    to: "/dashboard/manage-products",
    label: "Manage Products",
    icon: Boxes,
  },
  {
    to: "/dashboard/users",
    label: "Users",
    icon: Users,
  },
  {
    to: "/dashboard/manage-orders",
    label: "Orders",
    icon: ShoppingBag,
  },
];

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
        console.log("Logout clicked");

      await logoutUser().unwrap();
      console.log("API Success");

      dispatch(logout());

      localStorage.removeItem("authToken");

      navigate({
        to: "/",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="flex h-screen w-72 flex-col justify-between border-r bg-white">

      {/* Logo */}
      <div>

        <div className="border-b px-6 py-8">
          <Link
            to="/"
            className="text-2xl font-bold text-amber-700"
          >
            Deshi Bedding
          </Link>

          <p className="mt-1 text-sm text-stone-500">
            Admin Dashboard
          </p>
        </div>

        {/* Navigation */}

        <nav className="space-y-2 p-5">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{
                  className:
                    "bg-amber-100 text-amber-700 font-semibold",
                }}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-stone-700 transition hover:bg-amber-50 hover:text-amber-700"
              >
                <Icon size={20} />

                <span>{item.label}</span>
              </Link>
            );
          })}

        </nav>
      </div>

      {/* Logout */}

      <div className="border-t p-5">

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full"
        >
          <LogOut className="mr-2 h-4 w-4" />

          Logout
        </Button>

      </div>

    </aside>
  );
}