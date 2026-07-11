interface Props {
  value: string;
  onChange: (method: string) => void;
}

export default function PaymentMethod({
  value,
  onChange,
}: Props) {
  return (
    <div className="mt-6 rounded-xl border p-6">

      <h2 className="mb-6 text-xl font-bold">
        Payment Method
      </h2>

      <div className="space-y-4">

        <label className="flex cursor-pointer items-center gap-3">

          <input
            type="radio"
            checked={value === "cod"}
            onChange={() => onChange("cod")}
          />

          Cash On Delivery

        </label>

        <label className="flex cursor-pointer items-center gap-3">

          <input
            type="radio"
            checked={value === "bkash"}
            onChange={() => onChange("bkash")}
          />

          bKash

        </label>

        <label className="flex cursor-pointer items-center gap-3">

          <input
            type="radio"
            checked={value === "nagad"}
            onChange={() => onChange("nagad")}
          />

          Nagad

        </label>

      </div>

    </div>
  );
}