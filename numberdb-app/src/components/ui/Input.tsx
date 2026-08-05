"use client";

import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

const fieldBase =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors focus:border-neon-cyan/50 focus:bg-white/[0.07]";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className = "", id, ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-slate-400">
        {label}
      </label>
    )}
    <input ref={ref} id={id} className={`${fieldBase} ${error ? "border-neon-pink/50" : ""} ${className}`} {...props} />
    {error && <p className="mt-1 text-xs text-neon-pink">{error}</p>}
  </div>
));
Input.displayName = "Input";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className = "", id, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-slate-400">
          {label}
        </label>
      )}
      <textarea ref={ref} id={id} className={`${fieldBase} min-h-[88px] resize-y ${className}`} {...props} />
      {error && <p className="mt-1 text-xs text-neon-pink">{error}</p>}
    </div>
  )
);
TextArea.displayName = "TextArea";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, className = "", id, children, ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-slate-400">
        {label}
      </label>
    )}
    <select ref={ref} id={id} className={`${fieldBase} ${className}`} {...props}>
      {children}
    </select>
  </div>
));
Select.displayName = "Select";
