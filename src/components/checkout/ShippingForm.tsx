import { useState } from "react";

export interface ShippingData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  notes: string;
}

interface Props {
  value: ShippingData;
  onChange: (data: ShippingData) => void;
}

export default function ShippingForm({
  value,
  onChange,
}: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="rounded-xl border p-6">

      <h2 className="mb-6 text-xl font-bold">
        Shipping Information
      </h2>

      <div className="space-y-4">

        <input
          name="fullName"
          placeholder="Full Name"
          value={value.fullName}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={value.phone}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />

        <input
          name="email"
          placeholder="Email"
          value={value.email}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />

        <input
          name="district"
          placeholder="district"
          value={value.district}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />

        <textarea
          name="address"
          placeholder="Shipping Address"
          value={value.address}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          rows={4}
        />

        <textarea
          name="notes"
          placeholder="Order Notes (optional)"
          value={value.notes}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          rows={3}
        />

      </div>

    </div>
  );
}