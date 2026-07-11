interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const TextInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: TextInputProps) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-primary"
      />
    </div>
  );
};

export default TextInput;