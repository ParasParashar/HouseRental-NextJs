"use client";
import React, { use, useMemo, useState } from "react";
import Model from "./Model";
import useRentModel from "../hooks/useRentModel";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import { it } from "node:test";
import CategoryInputs from "../CategoryInputs";
import CountrySelect from "../CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Counter";
import ImageUpload from "../ImageUpload";
import Input from "../Input";
import axios from "axios";
import { toast } from "react-hot-toast";
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModel = () => {
  const rentModel = useRentModel();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const location = watch("location");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

const onSubmit:SubmitHandler<FieldValues>=(data)=>{
  if(step !== STEPS.PRICE){
    return onNext();
  }
  setIsLoading(true);
  axios.post('/api/listings',data)
  .then(()=>{
    toast.success('Listing Created!');
    router.refresh();
    reset();
    setStep(STEPS.CATEGORY);
    rentModel.onClose();
  })
  .catch(()=>{
    toast.error('Something went Wrong.')
  })
  .finally(()=>{
    setIsLoading(false);
  })
}

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);

  let bodyContent = (
    <div className="flex flex-col gap-8 ">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInputs
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
  if(step === STEPS.LOCATION){
    bodyContent=(
        <div className="flex flex-col gap-8">
            <Heading title="Where is your place located?"
            subtitle="Help guests find you!"/>
           <CountrySelect 
           value={location}
           onChange={(value)=>setCustomValue("location",value)}
           /> 
             <Map center={location?.latlng} />
        </div>
    )
  }

  if(step === STEPS.INFO){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading 
        title="Share Some Basic about your Place"
        subtitle="What ammenties do you have?"
        />
        <Counter 
        title="Guests"
        subtitle="How many guest Do you Allow?"
        value={guestCount}
        onchange={(value)=>setCustomValue('guestCount',value)}
        />
        <hr />
        <Counter 
        title="Rooms"
        subtitle="How many rooms Do you Allow?"
        value={roomCount}
        onchange={(value)=>setCustomValue('roomCount',value)}
        />
        <hr />
        <Counter 
        title="Bathrooms"
        subtitle="How many bathrooms Do you Allow?"
        value={bathroomCount}
        onchange={(value)=>setCustomValue('bathroomCount',value)}
        />
      </div>
    )
  }

    if(step === STEPS.IMAGES){
      bodyContent=(
        <div className="flex flex-col gap-8">
          <Heading
          title="Add a photo of your Place"
          subtitle="Show guests what your place looks like!"
          />
          <ImageUpload 
          value={imageSrc}
          onChange={(value)=>setCustomValue('imageSrc',value)} />
        </div>
      )
    }
    if(step === STEPS.DESCRIPTION){
      bodyContent=(
        <div className="flex flex-col gap-8">
          <Heading
          title="How would your describe your place?"
          subtitle="Short and Sweet works best!"
          />
          <Input 
          id="title"
          label="Title"
          disabled={isLoading}
          errors={errors}
          register={register}
          required
          />
          <hr/>
          <Input 
          id="description"
          label="Description"
          disabled={isLoading}
          errors={errors}
          register={register}
          required
          />
        </div>
      )
    }
    if(step === STEPS.PRICE){
      bodyContent=(
        <div className="flex flex-col gap-8">
          <Heading
          title="Now, sey your Price"
          subtitle="How much do you charge per night?"
          />
          <Input 
          formatPrice
          id="price"
          label="Price"
          type='number'
          disabled={isLoading}
          errors={errors}
          register={register}
          required
          />
        </div>
      )
    }

  return (
    <Model
      title="Airbnb Your Home"
      isOpen={rentModel.isOpen}
      onClose={rentModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModel;
