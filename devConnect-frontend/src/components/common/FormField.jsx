export const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col">
      <label className="label-text text-slate-400 text-sm mb-1">{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="textarea textarea-bordered w-full bg-base-200 text-white focus:ring-2 focus:ring-indigo-500 transition-all"
          rows="3"
        ></textarea>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input input-bordered w-full bg-base-200 text-white focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      )}
    </div>
  );
};
