import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";

import { useLogoutUserMutation } from "@/Redux/features/auth/authApi";
import { logout } from "@/Redux/features/auth/authSlice";

const navItems = [
  {
    to: "/dashboard/user",
    label: "Dashboard",
  },
  {
    to: "/dashboard/my-orders",
    label: "My Orders",
  },
  {
    to: "/dashboard/profile",
    label: "Profile",
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
      console.error(error);
    }
  };

  return (
    <aside className="flex min-h-screen flex-col justify-between p-6">
      <div>
        <Link
          to="/"
          className="text-2xl font-bold text-amber-700"
        >
          Deshi Bedding
        </Link>

        <p className="mt-1 text-sm text-stone-500">
          User Dashboard
        </p>

        <hr className="my-6" />

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block rounded-lg px-4 py-3 transition hover:bg-amber-50 hover:text-amber-700"
              activeProps={{
                className:
                  "block rounded-lg bg-amber-100 px-4 py-3 font-semibold text-amber-700",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-lg bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
      >
        Logout
      </button>
    </aside>
  );
}