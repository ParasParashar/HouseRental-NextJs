"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface counterProps {
  title: string;
  subtitle: string;
  value: number;
  onchange: (value: number) => void;
}
const Counter: React.FC<counterProps> = ({
  title,
  subtitle,
  value,
  onchange,
}) => {
  const onAdd = useCallback(() => {
    onchange(value + 1);
  }, [onchange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onchange(value - 1);
  }, [onchange, value]);
  return (
    <div className="flex flex-row items-center justify-between ">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="w-10 h-10 rounded-full border-[1px] flex items-center justify-center border-neutral-400 text-neutral-600 cursor-pointer hover:opacity-80"
        >
          <AiOutlineMinus />
        </div>
            {value}
        <div className="font-light text-xl text-neutral-600">
            <div
          onClick={onAdd}
          className="w-10 h-10 rounded-full border-[1px] flex items-center justify-center border-neutral-400 text-neutral-600 cursor-pointer hover:opacity-80"
        >
          <AiOutlinePlus />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
