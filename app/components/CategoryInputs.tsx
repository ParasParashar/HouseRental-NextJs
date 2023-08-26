import React from "react";
import { IconType } from "react-icons";
interface categoryInputsProps {
  onClick: (value: string) => void;
  label: string;
  icon: IconType;
  selected: Boolean;
}
const CategoryInputs: React.FC<categoryInputsProps> = ({
  onClick,
  label,
  icon: Icon,
  selected,
}) => {
  console.log("selected ", selected);
  return (
    <div
      onClick={() => onClick(label)}
      className={`
    rounded-xl
    border-2
    p-4
    flex
    flex-col
    gap-3
    hover:border-black
    transition
    cursor-pointer
    ${selected ? "border-black" : "border-neutral-200"}
    `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInputs;
