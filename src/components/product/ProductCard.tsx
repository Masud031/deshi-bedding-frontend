import { Link, useNavigate } from "@tanstack/react-router";
import {
  Heart,
  ShoppingBag,
  Eye,
  Star,
} from "lucide-react";

import type { Product } from "@/Redux/products/productTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Redux/store";
import { addToCart } from "@/Redux/cart/cartSlice";

type ProductCardProps = {
  p: Product;
};

export function ProductCard({
  p,
}: ProductCardProps) {
  const hasDiscount =
    p.oldPrice && p.oldPrice > p.price;

   const dispatch = useDispatch<AppDispatch>();

   const navigate = useNavigate();

//  handle add to cart//
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
    <article className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-accent/40 hover:shadow-[var(--shadow-elegant)]">

      {/* Product Image */}

      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">

        <Link
          to="/shop/$productId"
          params={{
            productId: p._id,
          }}
        >
      <img
      src={p.image || "/placeholder.png"}
      alt={p.name}
      className="absolute inset-0 h-full w-full object-cover"
    />
        </Link>

        {/* Badge */}

        {p.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {p.badge}
          </span>
        )}

        {/* Action Buttons */}

        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">

          <button className="grid h-9 w-9 place-items-center rounded-full bg-white shadow hover:bg-accent hover:text-white">
            <Heart size={18} />
          </button>

          <Link
            to="/shop/$productId"
            params={{
              productId: p._id,
            }}
            className="grid h-9 w-9 place-items-center rounded-full bg-white shadow hover:bg-accent hover:text-white"
          >
            <Eye size={18} />
          </Link>

        </div>

        {/* Add To Cart */}

        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 left-3 right-3 flex translate-y-12 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:translate-y-0 hover:bg-accent"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>

      </div>

      {/* Product Info */}

      <div className="space-y-3 p-4">

        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {p.category}
        </p>

        <Link
          to="/shop/$productId"
          params={{
            productId: p._id,
          }}
          className="block text-lg font-semibold transition hover:text-primary"
        >
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