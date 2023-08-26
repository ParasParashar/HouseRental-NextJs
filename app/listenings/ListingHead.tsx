"use client"
import Image from "next/image";
import Heading from "../components/Heading";
import useCountries from "../components/hooks/useCountry";
import { SafeUser } from "../types/type";
import HeartButton from "../components/HeartButton";

interface ListingHeadProps{
title:string;
imageSrc:string;
id:string;
locationValue:string;
currentUser?:SafeUser | null;
}
const ListingHead:React.FC<ListingHeadProps> = ({title,locationValue,imageSrc,id,currentUser}) => {
    const {getByvalue}=useCountries();
    const location = getByvalue(locationValue);
  return (
    <>
    <Heading
      title={title}
      subtitle={`${location?.region}, ${location?.label}`}
    />
    <div className="
        w-full
        h-[60vh]
        overflow-hidden 
        rounded-xl
        relative
      "
    >
      <Image
        src={imageSrc}
        fill
        className="object-cover w-full"
        alt="Image"
      />
      <div
        className="
          absolute
          top-5
          right-5
        "
      >
        <HeartButton 
          listeningId={id}
          currentUser={currentUser}
        />
      </div>
    </div>
  </>
  )
}

export default ListingHead
