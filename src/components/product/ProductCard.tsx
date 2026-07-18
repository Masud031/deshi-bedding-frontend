import { Link, useNavigate } from "@tanstack/react-router";
import {
  Heart,
  ShoppingBag,
  Eye,
  Star,
} from "lucide-react";

import { useDispatch } from "react-redux";

import type { Product } from "@/Redux/products/productTypes";
import { AppDispatch } from "@/Redux/store";
import { addToCart } from "@/Redux/cart/cartSlice";

type ProductCardProps = {
  p: Product;
};

export function ProductCard({
  p,
}: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const hasDiscount =
    p.oldPrice && p.oldPrice > p.price;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: p._id,
        productCode: p.productCode,
        name: p.name,
        image: p.image,
        category: p.category,
        color: p.color,
        selectedSize: "Default",
        price: p.price,
        quantity: 1,
      })
    );

    navigate({
      to: "/cart",
    });
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">

      {/* Product Image */}

      <div className="relative aspect-[4/5] overflow-hidden bg-white">

        <Link
          to="/shop/$productId"
          params={{
            productId: p._id,
          }}
        >
          <div className="flex h-full w-full items-center justify-center p-5">

            <img
              src={p.image || "/placeholder.png"}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />

          </div>
        </Link>

        {/* Badge */}

        {p.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow">
            {p.badge}
          </span>
        )}

        {/* Actions */}

        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition duration-300 group-hover:opacity-100">

          <button className="grid h-10 w-10 place-items-center rounded-full bg-white shadow hover:bg-primary hover:text-white">
            <Heart size={18} />
          </button>

          <Link
            to="/shop/$productId"
            params={{
              productId: p._id,
            }}
            className="grid h-10 w-10 place-items-center rounded-full bg-white shadow hover:bg-primary hover:text-white"
          >
            <Eye size={18} />
          </Link>

        </div>

        {/* Add To Cart */}

        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-4 right-4 flex translate-y-14 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:translate-y-0 hover:bg-accent"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>

      </div>

      {/* Product Info */}

      <div className="space-y-3 p-5">

        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {p.category}
        </p>

        <Link
      to="/shop/$productId"
      params={{
        productId: p._id,
      }}
      className="line-clamp-2 block min-h-[56px] text-lg font-semibold transition hover:text-primary"
    >
      <Star size={18}/>
      {p.name}
    </Link>

        <div className="flex items-center gap-2 text-sm">

          <Star
            size={16}
            className="fill-yellow-500 text-yellow-500"
          />

          <span className="font-medium">
            {p.rating ?? 5}
          </span>

          <span className="text-muted-foreground">
            ({p.reviews ?? 0})
          </span>

        </div>

        <div className="flex items-center gap-3">

          <span className="text-xl font-bold text-primary">
            ৳{Number(p.price).toLocaleString()}
          </span>

          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ৳{Number(p.oldPrice).toLocaleString()}
            </span>
          )}

        </div>

      </div>

    </article>
  );
}