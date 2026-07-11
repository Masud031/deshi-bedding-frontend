
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

import { useAddProductMutation } from "@/Redux/products/productsApi";

import TextInput from "@/components/dashboard/admin/TextInput";
import SelectInput from "@/components/dashboard/admin/SelectInput";
import UploadImage, {
  type UploadImageRef,
} from "@/components/dashboard/admin/prductUpld/UploadImage";

export const Route = createFileRoute(
  "/dashboard/admin/add-product"
)({
  component: AddProduct,
});

function AddProduct() {
  const imageRef = useRef<UploadImageRef>(null);

  const [addProduct, { isLoading }] =
    useAddProductMutation();

  const [formData, setFormData] = useState({
    productCode: "",
    name: "",
    description: "",
    category: "",
    color: "",
    price: "",
    oldPrice: "",
    image:"",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        oldPrice: Number(formData.oldPrice) || 0,
        stock: {
        Default: 100,
      }
      };

      await addProduct(payload).unwrap();

      alert("Product Added Successfully");

      setFormData({
        productCode: "",
        name: "",
        description: "",
        category: "",
        color: "",
        price: "",
        oldPrice: "",
        image: "",
      });

      imageRef.current?.clearFile();
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow">
      <h2 className="mb-8 text-3xl font-bold">
        Add Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >
        <TextInput
          label="Product Code"
          name="productCode"
          type="text"
          placeholder="PRD-1001"
          value={formData.productCode}
          onChange={handleChange}
        />

        <TextInput
          label="Product Name"
          name="name"
          type="text"
          placeholder="Premium Lep"
          value={formData.name}
          onChange={handleChange}
        />

        <SelectInput
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={[
            {
              label: "Select Category",
              value: "",
            },
            {
              label: "Lep",
              value: "lep",
            },
            {
              label: "Toshok",
              value: "toshok",
            },
            {
              label: "Balish",
              value: "balish",
            },
            {
              label: "Jajim",
              value: "jajim",
            },
          ]}
        />

        <TextInput
          label="Color"
          name="color"
          type="text"
          placeholder="Red"
          value={formData.color}
          onChange={handleChange}
        />

        <TextInput
          label="Price"
          name="price"
          type="number"
          placeholder="3500"
          value={formData.price}
          onChange={handleChange}
        />

        <TextInput
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="4000"
          value={formData.oldPrice}
          onChange={handleChange}
        />

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />
        </div>

        <div className="md:col-span-2">
          <UploadImage
  ref={imageRef}
  label="Product Image"
  name="image"
  setImage={(image) =>
    setFormData((prev) => ({
      ...prev,
      image,
    }))
  }
/>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
          >
            {isLoading
              ? "Uploading..."
              : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

// export default AddProduct;

// function AddProduct() {
//   return (
//     <div className="p-10">
//       <h1 className="text-4xl font-bold text-red-600">
//         ADD PRODUCT PAGE WORKING
//       </h1>
//     </div>
//   );
// }