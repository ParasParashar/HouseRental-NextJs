"use client";
import { BiSearch } from "react-icons/bi";
import UseSearchModel from "../hooks/useSearchModle";
import { useSearchParams } from "next/navigation";
import useCountries from "../hooks/useCountry";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";
const Search = () => {
  const searchModel = UseSearchModel();
  const params = useSearchParams();
  const { getByvalue } = useCountries();
  const locationValue = params?.get("locationValue");
  const starDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");
  const locationLable = useMemo(() => {
    if (locationValue) {
      return getByvalue(locationValue as string)?.label;
    }
    return "Anywhere";
  }, [getByvalue, locationValue]);
  const durationLable = useMemo(() => {
    if (starDate && endDate) {
      const start = new Date(starDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);
      if (diff === 0) {
        diff = 1;
      }
      return `${diff} Days `;
    }
    return "Any Week";
  }, [endDate, starDate]);
  const guestLable = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests `;
    }
    return "Any Guests";
  }, [guestCount]);
  return (
    <div
      className="w-full transition-all rounded-full md:w-auto border-[1px] shadow-sm cursor-pointer py-2"
      onClick={searchModel.onOpen}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="text-sm font-semibold px-6">{locationLable}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {durationLable}
        </div>
        <div className="pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3 text-sm ">
          <div className="hidden sm:block">{guestLable}</div>
          <div className="p-2 bg-rose-500 text-white rounded-full">
            <BiSearch size={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
