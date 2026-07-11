import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Truck, Award } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const AuthLayout = ({
  title,
  subtitle,
  children,
}: AuthLayoutProps) => {
  return (
    <section className="min-h-screen bg-[#F8F4EE] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden lg:block">

          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
            alt="Deshi Bedding"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-between p-10 text-white">

            {/* Logo */}

            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full bg-amber-700 text-2xl font-bold">
                  দ
                </div>

                <div>
                  <h2 className="text-3xl font-serif font-semibold">
                    Deshi Bedding
                  </h2>

                  <p className="text-sm tracking-widest text-white/80 uppercase">
                    Lep • Toshok • Balish
                  </p>
                </div>
              </Link>
            </div>

            {/* Center Text */}

            <div className="space-y-6">

              <div>
                <h1 className="text-5xl font-serif font-bold leading-tight">
                  Bringing Tradition
                  <br />
                  to Your Comfort
                </h1>

                <div className="mt-4 h-1 w-24 rounded-full bg-amber-500" />

                <p className="mt-6 max-w-md text-lg leading-8 text-white/90">
                  Handmade bedding crafted with love and traditional
                  Bangladeshi craftsmanship for every home.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6">

                <div className="text-center">
                  <Award className="mx-auto mb-3 h-8 w-8 text-amber-300" />
                  <p className="text-sm font-medium">
                    Premium Quality
                  </p>
                </div>

                <div className="text-center">
                  <ShieldCheck className="mx-auto mb-3 h-8 w-8 text-amber-300" />
                  <p className="text-sm font-medium">
                    Trusted Brand
                  </p>
                </div>

                <div className="text-center">
                  <Truck className="mx-auto mb-3 h-8 w-8 text-amber-300" />
                  <p className="text-sm font-medium">
                    Fast Delivery
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center bg-white px-6 py-10 sm:px-10">

          <div className="w-full max-w-md">

            <div className="mb-8 text-center">

              <h2 className="text-4xl font-serif font-bold text-amber-900">
                {title}
              </h2>

              <p className="mt-3 text-gray-600">
                {subtitle}
              </p>

            </div>

            {children}

          </div>

        </div>

      </div>
    </section>
  );
};

export default AuthLayout;