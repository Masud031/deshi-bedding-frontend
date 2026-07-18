import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { useGetSingleProductQuery } from "@/Redux/products/productsApi";
import ProductReviewList from "@/components/product/ProductReviewList";
import ReviewForm from "@/components/product/ReviewForm";




export default function SingleProductPage() {
  const { productId } = useParams({
    from: "/shop/$productId",
  });

  const {
    data,
    isLoading,
    isError,
  } = useGetSingleProductQuery(productId);

  const [selectedSize, setSelectedSize] =
    useState<string>("");

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        Loading Product...
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="py-24 text-center">
        Product not found.
      </div>
    );
  }

  const product = data.data;

  return (
    <section className="container mx-auto px-4 py-10">

      <div className="grid gap-10 lg:grid-cols-2">

        {/* Product Image */}

        <div className="overflow-hidden rounded-2xl border">

          <img
            src={product.image?.[0]}
            alt={product.name}
            className="h-full w-full object-cover"
          />

        </div>

        {/* Product Details */}

        <div>

          <p className="text-sm uppercase text-gray-500">
            {product.category}
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            {product.name}
          </h1>

          <p className="mt-5 text-3xl font-semibold text-red-600">
            ৳ {product.price.toLocaleString()}
          </p>

          {product.oldPrice && (
            <p className="text-gray-500 line-through">
              ৳ {product.oldPrice.toLocaleString()}
            </p>
          )}

          <p className="mt-6 leading-7 text-gray-600">
            {product.description}
          </p>

          {/* Size */}

          <div className="mt-8">

            <h3 className="mb-3 font-semibold">
              Select Size
            </h3>

            <div className="flex flex-wrap gap-3">

              {product.stock.map((item:any) => (
                <button
                  key={item.size}
                  disabled={item.quantity === 0}
                  onClick={() =>
                    setSelectedSize(item.size)
                  }
                  className={`rounded-lg border px-5 py-2 transition

                  ${
                    selectedSize === item.size
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-gray-300"
                  }

                  ${
                    item.quantity === 0
                      ? "cursor-not-allowed opacity-40"
                      : ""
                  }`}
                >
                  {item.size}
                </button>
              ))}

            </div>

          </div>

          {/* Add To Cart */}

    <button
  className="mt-10 rounded-xl bg-red-600 px-8 py-3 text-white"
>
  Add To Cart
</button>

<hr className="my-10" />

<ProductReviewList productId={product._id} />

<hr className="my-10" />

<ReviewForm productId={product._id} />

        </div>

      </div>

    </section>
  );
}