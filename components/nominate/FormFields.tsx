import React from 'react';

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, required = false, children, className = '' }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
        {label} {required && <span className="text-[#CC9808]">*</span>}
      </label>
      {children}
    </div>
  );
}

interface TextInputProps {
  type?: string;
  placeholder?: string;
  prefix?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
}

export function TextInput({
  type = 'text',
  placeholder,
  prefix,
  value,
  onChange,
  name,
  required,
}: TextInputProps) {
  return (
    <div className="relative">
      {prefix && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          {prefix}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full ${prefix ? 'pl-12' : 'px-3'} rounded-sm border border-gray-300 bg-white py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#CC9808] focus:ring-1 focus:ring-[#CC9808]`}
      />
    </div>
  );
}

interface TextAreaProps {
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  required?: boolean;
}

export function TextArea({
  placeholder,
  rows = 3,
  value,
  onChange,
  name,
  required,
}: TextAreaProps) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-vertical rounded-sm border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#CC9808] focus:ring-1 focus:ring-[#CC9808]"
    />
  );
}

interface SelectProps {
  placeholder?: string;
  options: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  required?: boolean;
}

export function Select({
  placeholder,
  options,
  value,
  onChange,
  name,
  required,
}: SelectProps) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full appearance-none rounded-sm border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#CC9808] focus:ring-1 focus:ring-[#CC9808]"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
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
    <label className="relative flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-sm border border-gray-300 bg-white p-3 text-center transition-colors hover:border-[#CC9808] has-[:checked]:border-[#CC9808] has-[:checked]:bg-[#CC9808]/5 has-[:checked]:ring-1 has-[:checked]:ring-[#CC9808]">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="absolute top-2 right-2 accent-[#CC9808]"
      />
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#CC9808] sm:text-xs">{title}</span>
      <span className="mt-1 text-xs font-semibold text-[#03193D] sm:text-sm">{price}</span>
      <span className="mt-1 text-[10px] text-gray-500">{note}</span>
    </label>
  );
}
