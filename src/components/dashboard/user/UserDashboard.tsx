import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";

import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  User,
  Star,
  LogOut,
} from "lucide-react";

import { useLogoutUserMutation } from "@/Redux/features/auth/authApi";
import { logout } from "@/Redux/features/auth/authSlice";

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/dashboard/orders",
    label: "My Orders",
    icon: ShoppingBag,
  },
  {
    to: "/dashboard/payments",
    label: "Payments",
    icon: CreditCard,
  },
  {
    to: "/dashboard/profile",
    label: "Profile",
    icon: User,
  },
  {
    to: "/dashboard/reviews",
    label: "Reviews",
    icon: Star,
  },
];

export default function UserSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

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
    <aside className="flex h-full flex-col justify-between rounded-xl border bg-white p-6 shadow-sm">
      <div>
        {/* Logo */}
        <div className="mb-6">
          <Link
            to="/"
            className="text-2xl font-bold text-amber-700"
          >
            Deshi Bedding
          </Link>

          <p className="mt-1 text-sm text-stone-500">
            User Dashboard
          </p>
        </div>

        <hr className="mb-6" />

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{
                  className:
                    "flex items-center gap-3 rounded-lg bg-amber-100 px-4 py-3 font-semibold text-amber-700",
                }}
                inactiveProps={{
                  className:
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-stone-600 hover:bg-stone-100",
                }}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div>
        <hr className="mb-4" />

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}