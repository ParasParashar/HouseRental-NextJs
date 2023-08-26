"use client";

import { FieldError, FieldValue, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface inputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValue>;
  errors?: UseFormRegister<FieldError>;
}
const Input: React.FC<inputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        type="text"
        id="id"
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={`peer p-4 w-full pt-6 disabled:opacity-70 font-light bg-white rounded-md border-2 outline-none transition disabled:cursor-not-allowed
 ${formatPrice ? "pl-9" : "pl-4"}
 ${errors[id] ? "border-rose-500" : "border-neutral-300"}
 ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
 `}
      />
      <label
        className={`absolute text-md duration-150 transform-translate-y-3 top-4 z-10 origin-[0] ${formatPrice ? "left-9" : "left-4"
          } 
 peer-placeholder-shown:scale-100
 peer-placeholder-shown:tranlate-y-0
 peer-focus:scale-75
 peer-focus:-translate-y-4
 ${errors[id] ? "text-rose-500" : "text-zinc-400"}
 `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
