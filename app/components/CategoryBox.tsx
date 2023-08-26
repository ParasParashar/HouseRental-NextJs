"use client";
import { IconType } from "react-icons";
import qs from "query-string";
interface categoryBoxprops {
  icon: IconType;
  selected?: Boolean;
  label: string;
  description?: string;
}
import React, { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LabelOffTwoTone } from "@mui/icons-material";

const CategoryBox: React.FC<categoryBoxprops> = ({
  description,
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const param = useSearchParams();
  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (param) {
      currentQuery = qs.parse(param.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    if (param?.get("category") === label) {
      delete updatedQuery.category;
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [label, param, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col justify-center items-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
    ${selected ? "border-b-neutral-800" : "border-transparent"}
    ${selected ? "text-neutral-800" : "text-neutral-500"}
  `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
