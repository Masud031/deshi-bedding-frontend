interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const SelectInput = ({
  label,
  name,
  value,
  options,
  onChange,
}: SelectInputProps) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-primary"
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;