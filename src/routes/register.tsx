import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "@/Redux/features/auth/authApi";
import { setUser } from "@/Redux/features/auth/authSlice";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [formData, setFormData] = useState({
  username: "",
  emailOrMobile: "",
  password: "",
  confirmPassword: "",
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

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const isEmail =
    /\S+@\S+\.\S+/.test(formData.emailOrMobile);

  const isMobile =
    /^01[3-9]\d{8}$/.test(formData.emailOrMobile);

  if (!isEmail && !isMobile) {
    alert("Enter a valid Email or Mobile Number.");
    return;
  }

  const payload = {
    username: formData.username,
    password: formData.password,
    ...(isEmail
      ? { email: formData.emailOrMobile }
      : { mobile: formData.emailOrMobile }),
  };
  

  try {
    const response = await registerUser(payload).unwrap();

    dispatch(setUser(response.user));

    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }

    alert("Registration Successful!");

    navigate({
      to: "/",
    });
  } catch (error: any) {
    console.error(error);

    alert(
      error?.data?.message ||
      "Registration Failed!"
    );
  }
};


  return (
    <section className="min-h-screen bg-stone-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-stone-200 p-8">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-800">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Join the Deshi Bedding family today
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <Label htmlFor="username">
              Full Name
            </Label>

            <Input
              id="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter your full name"
              className="mt-2"
              required
            />
          </div>

          <div>
          <Label htmlFor="emailOrMobile">
          Email or Mobile Number
        </Label>

         <Input
            id="emailOrMobile"
            value={formData.emailOrMobile}
            onChange={handleChange}
            type="text"
            placeholder="Email or 01XXXXXXXXX"
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
                value={formData.password}
                onChange={handleChange}
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a password"
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

          <div>
            <Label htmlFor="confirmPassword">
              Confirm Password
            </Label>

            <div className="relative mt-2">
              <Input
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-700"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-700 hover:bg-amber-800"
          >
            {isLoading
              ? "Creating Account..."
              : "Create Account"}
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t" />
          <span className="mx-3 text-xs text-stone-400">
            OR
          </span>
          <div className="flex-1 border-t" />
        </div>

        <Button
          variant="outline"
          className="w-full"
        >
          Continue with Google
        </Button>

        <div className="mt-8 text-center text-sm text-stone-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-amber-700 hover:underline"
          >
            Login
          </Link>
        </div>

      </div>
    </section>
  );
}
