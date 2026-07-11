import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { useDispatch } from "react-redux";

import type { CartProduct } from "@/Redux/cart/cartTypes";

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/Redux/cart/cartSlice";

import type { AppDispatch } from "@/Redux/store";

interface Props {
  item: CartProduct;
}

export default function CartItem({
  item,
}: Props) {

  const dispatch =
    useDispatch<AppDispatch>();

  return (
    <div className="flex gap-4 rounded-xl border p-4">

      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-24 rounded-lg object-cover"
      />

      <div className="flex-1">

        <h3 className="font-semibold">
          {item.name}
        </h3>

        <p className="text-sm text-gray-500">
          {item.selectedSize}
        </p>

        <p className="mt-2 font-bold">
          ৳{item.price}
        </p>

        <div className="mt-4 flex items-center gap-2">

          <button
            onClick={() =>
              dispatch(
                decreaseQuantity(item._id)
              )
            }
            className="rounded border p-2"
          >
            <Minus size={16} />
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() =>
              dispatch(
                increaseQuantity(item._id)
              )
            }
            className="rounded border p-2"
          >
            <Plus size={16} />
          </button>

          <button
            onClick={() =>
              dispatch(
                removeFromCart(item._id)
              )
            }
            className="ml-auto text-red-600"
          >
            <Trash2 />
          </button>

        </div>

      </div>

    </div>
  );
}