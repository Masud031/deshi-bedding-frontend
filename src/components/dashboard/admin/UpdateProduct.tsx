/* eslint-disable no-unused-vars */
import { useFetchProductbyIdQuery, useUpdateProductMutation } from '@/Redux/products/productsApi';
import { showToast } from '@/utils/showToast';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './prductUpld/UploadImage';
import { RootState } from '@/Redux/store';




const categories = [
  { label: 'Select Category', value: '' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Dress', value: 'dress' },
  { label: 'Jewellery', value: 'jewellery' },
  { label: 'Cosmetics', value: 'cosmetics' },
];

const colors = [
  { label: "Select Color", value: "" },
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Off white", value: "off white" },
  { label: "Meroon", value: "meroon/red" },
  { label: "Silver/Ash", value: "silver/ash" },
  { label: "Navy blue", value: "navy blue" },
  { label: "Green", value: "green" },
  { label: "Golden", value: "golden" },
  { label: "Coffi", value: "coffi" },
  { label: "Others", value: "others" },
];

const UpdateProduct = () => {

const { productId } = useParams({
  from: "/dashboard/admin/update-product/$productId",
});
  const { user } = useSelector(
  (state: RootState) => state.auth
);

  const {
    data,
    isLoading: isProductLoading,
    error,
    refetch,
  } = useFetchProductbyIdQuery(productId);

  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    color: '',
    image: '',
    stock: {}, // ✅ stock added
  });

  const [newImage, setNewImage] = useState(null);
  const [sizeInput, setSizeInput] = useState('');
  const [qtyInput, setQtyInput] = useState('');

  const productData = data?.data?.product || {};
  const {
    name,
    category,
    color,
    description,
    image: imageURL,
    price,
    stock,
  } = productData || {};

  const navigate = useNavigate();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (data?.data?.product) {
      setProduct({
        name: name || '',
        category: category || '',
        description: description || '',
        price: price || '',
        color: color || '',
        image: imageURL || '',
        stock: stock || {},
      });
    }
  }, [data?.data?.product]);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (image:any) => {
    setNewImage(image);
  };

  // ✅ Add or update size quantity
  const handleAddSizeQty = () => {
    if (!sizeInput || !qtyInput || Number(qtyInput) <= 0) {
      showToast('success','Please enter valid size and quantity.');
      return;
    }

    setProduct((prev) => ({
      ...prev,
      stock: {
        ...prev.stock,
        [sizeInput]: Number(qtyInput),
      },
    }));

    setSizeInput('');
    setQtyInput('');
  };

  // ✅ Remove size if needed
//   const handleRemoveSize = (size) => {
//     const updatedStock = { ...product.stock };
//     delete updatedStock[size];
//     setProduct((prev) => ({ ...prev, stock: updatedStock }));
//   };

//   if (isProductLoading) return <Loading />;

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      image: newImage ? newImage : product.image,
      author: user?._id,
    };

    try {
      await updateProduct({  id: productId, ...updatedProduct }).unwrap();
      showToast('success','Product updated successfully!');
      await refetch();
      navigate({
    to: "/dashboard/admin/manage-products",
    });
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <TextInput
          label="Product Name"
          name="name"
          placeholder="Ex: Diamond Earrings"
          value={product.name}
          onChange={handleChange}
        />

        {/* Category */}
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        {/* Color */}
        <SelectInput
          label="Color"
          name="color"
          value={product.color}
          onChange={handleChange}
          options={colors}
        />

        {/* Price */}
        <TextInput
          label="Price"
          name="price"
          type="number"
          placeholder="50"
          value={product.price}
          onChange={handleChange}
        />

        {/* ✅ Size & Quantity Section */}
        <div className="flex flex-wrap items-end gap-4">
          <TextInput
            type="text"
            label="Size"
            name="sizeInput"
            placeholder="e.g., 40"
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
          />

          <TextInput
            type="number"
            label="Qty"
            name="qtyInput"
            placeholder="e.g., 6"
            value={qtyInput}
            onChange={(e) => setQtyInput(e.target.value)}
          />

          <button
            type="button"
            onClick={handleAddSizeQty}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* ✅ Display added sizes */}
        {/* {Object.entries(product.stock || {}).length > 0 && (
          <div>
            <h4 className="font-semibold mt-4 mb-2">Available Sizes:</h4>
            <ul className="list-disc pl-6">
              {Object.entries(product.stock).map(([size, qty]) => (
                <li key={size} className="flex items-center justify-between">
                  <span>
                    Size {size}: {qty} pcs
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(size)}
                    className="text-red-500 text-sm ml-4"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div> */}
        {/* )} */}

        {/* Image Upload */}
       <UploadImage
        label="Product Image"
        name="image"
        setImage={handleImageChange}
        />

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            rows={6}
            name="description"
            id="description"
            value={product.description}
            placeholder="Write a product description"
            onChange={handleChange}
            className="add-product-InputCSS"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="add-product-btn"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
