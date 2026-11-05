import React from 'react';

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  error?: string;
  hint?: string;
}

export function Field({ label, required = false, children, className = '', error, hint }: FieldProps) {
  const control = React.isValidElement<{ id?: string; name?: string }>(children) ? children.props : undefined;
  const id = control?.id || control?.name;
  return (
    <div className={'flex min-w-0 flex-col gap-2 ' + className}>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-[#00A1B1]">*</span>}
      </label>
      {children}
      {hint && <p id={id ? id + '-hint' : undefined} className="text-xs leading-relaxed text-gray-500">{hint}</p>}
      {error && <p id={id ? id + '-error' : undefined} className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

const controlClass = 'w-full min-w-0 rounded-lg border bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#00A1B1] focus:ring-2 focus:ring-[#00A1B1]/20 disabled:cursor-not-allowed disabled:bg-gray-100';

function borderClass(invalid: React.AriaAttributes['aria-invalid']) {
  return invalid ? ' border-red-400' : ' border-gray-300';
}

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & { prefix?: string };
export function TextInput({ prefix, className = '', id, name, ...props }: TextInputProps) {
  return (
    <div className="relative">
      {prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">{prefix}</span>}
      <input {...props} id={id || name} name={name}
        className={controlClass + borderClass(props['aria-invalid']) + (prefix ? ' pl-12' : '') + ' ' + className} />
    </div>
  );
}

export function TextArea({ className = '', id, name, rows = 3, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} id={id || name} name={name} rows={rows}
    className={controlClass + borderClass(props['aria-invalid']) + ' resize-y ' + className} />;
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { placeholder?: string; options: string[] };
export function Select({ placeholder, options, className = '', id, name, ...props }: SelectProps) {
  return (
    <select {...props} id={id || name} name={name}
      className={controlClass + borderClass(props['aria-invalid']) + ' pr-8 ' + className}>
      <option value="" disabled>{placeholder}</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  );
}

interface RadioCardProps {
  title: string;
  price: string;
  note: string;
  name: string;
  checked?: boolean;
  onChange?: () => void;
}

export function RadioCard({ title, price, note, name, checked = false, onChange }: RadioCardProps) {
  return (
    <label className="relative flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-sm border border-gray-300 bg-white p-3 text-center transition-colors hover:border-[#00A1B1] has-[:checked]:border-[#00A1B1] has-[:checked]:bg-[#00A1B1]/5 has-[:checked]:ring-1 has-[:checked]:ring-[#00A1B1]">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="absolute right-2 top-2 accent-[#00A1B1]" />
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#00A1B1] sm:text-xs">{title}</span>
      <span className="mt-1 text-xs font-semibold text-[#003A77] sm:text-sm">{price}</span>
      <span className="mt-1 text-[10px] text-gray-500">{note}</span>
    </label>
  );
}
