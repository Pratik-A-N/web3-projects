export function LabelledInput({label, type, placeholder}: LablledInputType) {
  return (
    <div>
      <label htmlFor="" className="text-xs block">
        {label}
      </label>
      <input
        className="border-2 border-slate-950 rounded-md mt-2 mb-2 p-2 text-sm"
        type={type || "text"}
        placeholder={placeholder}
      />
    </div>
  );
}

interface LablledInputType {
  label: string;
  placeholder: string;
  type?: string;
}
