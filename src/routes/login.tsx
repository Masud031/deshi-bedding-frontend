import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useLoginUserMutation } from "@/Redux/features/auth/authApi";
import { setUser } from "@/Redux/features/auth/authSlice";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [showPassword, setShowPassword] = useState(false);

const [formData, setFormData] = useState({
  emailOrMobile: "",
  password: "",
});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

    // Validate Email or Mobile
const isEmail =
    /\S+@\S+\.\S+/.test(formData.emailOrMobile);

  const isMobile =
    /^01[3-9]\d{8}$/.test(formData.emailOrMobile);

  if (!isEmail && !isMobile) {
    alert("Enter a valid Email or Mobile Number.");
    return;
  }

  // Create payload
  const payload = {
    password: formData.password,
    ...(isEmail
      ? { email: formData.emailOrMobile }
      : { mobile: formData.emailOrMobile }),
  };

  try {
    const response = await loginUser(payload).unwrap();

    // Save user to Redux
    dispatch(setUser(response.user));

    // Save JWT token
    if (response.token) {
      localStorage.setItem(
        "authToken",
        response.token
      );
    }

    alert("Login Successful!");

   if (response.user.role === "admin") {
  navigate({
    to: "/dashboard/admin",
  });
} else {
  navigate({
    to: "/dashboard/user",
  });
}
  } catch (error: any) {
    console.error(error);

    alert(
      error?.data?.message ||
      "Invalid Email/Mobile or Password!"
    );
  }
};

  return (
    <section className="min-h-screen bg-stone-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white border border-stone-200 shadow-xl p-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-800">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Login to your Deshi Bedding account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
           <Label htmlFor="emailOrMobile">
            Email or Mobile Number
          </Label>

          <Input
          id="emailOrMobile"
          type="text"
          value={formData.emailOrMobile}
          onChange={handleChange}
          placeholder="example@gmail.com or 017XXXXXXXX"
          className="mt-2"
          required
        />
          </div>

          <div>
            <Label htmlFor="password">
              Password
            </Label>

            <div className="relative mt-2">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-700"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-amber-700 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-700 hover:bg-amber-800"
          >
            {isLoading ? "Signing In..." : "Login"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t" />
          <span className="mx-3 text-xs text-stone-400">
            OR
          </span>
          <div className="flex-1 border-t" />
        </div>

        {/* Google */}
        <Button
          variant="outline"
          className="w-full"
        >
          Continue with Google
        </Button>

        {/* Register */}
        <div className="mt-8 text-center text-sm text-stone-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-amber-700 hover:underline"
          >
            Create Account
          </Link>
        </div>

      </div>
    </section>
  );
}

// export default Login;