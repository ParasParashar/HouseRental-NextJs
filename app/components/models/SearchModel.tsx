"use client";
import qs from "query-string";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import UseSearchModel from "../hooks/useSearchModle";
import Model from "./Model";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../Calender";
import Counter from "../Counter";
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
const SearchModel = () => {
  const searchModel = UseSearchModel();
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [location, setLocation] = useState<CountrySelectValue>();
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );
  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);
  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      bathroomCount,
      roomCount,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    searchModel.onClose();
    router.push(url);
  }, [
    router,
    step, 
    searchModel, 
    location, 
    router, 
    guestCount, 
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure Everyone is free!!"
        />
        <Calender
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
         title="More Information" 
         subtitle="Find your perfect place!" 
         />

        <Counter
         title="Guests"
         subtitle="How many guests are coming?"
         value={guestCount}
         onchange={(value)=>setGuestCount(value)}
         />
        <Counter
         title="Rooms"
         subtitle="How many rooms do you need?"
         value={roomCount}
         onchange={(value)=>setRoomCount(value)}
         />
        <Counter
         title="Guests"
         subtitle="How many bathrooms do you need?"
         value={bathroomCount}
         onchange={(value)=>setBathroomCount(value)}
         />
      </div>
    );
  }

  return (
    <Model
      isOpen={searchModel.isOpen}
      onClose={searchModel.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModel;
