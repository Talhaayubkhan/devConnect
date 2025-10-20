export const InputField = ({
  id,
  name,
  placeholder,
  type = "text",
  icon,
  value,
  onChange,
  error,
}) => (
  <div>
    <label className="input input-bordered flex items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
      {icon}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="grow focus:outline-none bg-transparent"
      />
    </label>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
