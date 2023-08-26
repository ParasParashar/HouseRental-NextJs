"use client"
import { SafeUser,safeListenting, safeReservations } from "../../types/type"
import {useCallback, useEffect, useMemo, useState } from "react"
import { categories } from "@/app/components/navbar/Categories"
import { Range } from "react-date-range";
import Container from "@/app/components/Container";
import ListingReservation from "@/app/components/ListingReservation";
import UseLoginModel from "@/app/components/hooks/useLoginModel";
import ListingInfo from "@/app/components/ListingInfo";
import ListingHead from "../ListingHead";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialDataRange={
  startDate:new Date(),
  endDate:new Date(),
  key:'selection'
};

interface ListingClientProps{
  reservations:safeReservations[],
    listing:safeListenting & {
      user:SafeUser,
    }
    currentUser?:SafeUser | null,
};
const ListingClient:React.FC<ListingClientProps> = ({
  listing,currentUser,reservations=[]}) => {
  const router = useRouter();
  const loginModel = UseLoginModel();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);
const[isloading,setIsloading]=useState(false);
const [totalPrice,setTotalPrice]=useState(listing.price);
const [dateRange,setDataRange]=useState<Range>(initialDataRange);

const onCreateReservation=useCallback(()=>{
  if(!currentUser){
    return loginModel.onOpen();
  }
  setIsloading(true);
  axios.post('/api/reservations',{
    totalPrice,
    startDate:dateRange.startDate,
    endDate:dateRange.endDate,
    listingId :listing.id
  })
  .then(()=>{
    toast.success('Listing reserved!')
    setDataRange(initialDataRange);
    router.push('/trips');
  })
  .catch(()=>{
    toast.error('Something Went Wrong')
  })
  .finally(()=>{
    setIsloading(false);
  })
},[totalPrice,dateRange,listing?.id,router,currentUser,loginModel]);

useEffect(()=>{
  if(dateRange.startDate && dateRange.endDate){
    const dayCount = differenceInDays(
      dateRange.endDate,
      dateRange.startDate,
    );
    if(dayCount && listing.price){
      setTotalPrice(dayCount * listing.price)
    }else{
      setTotalPrice(listing.price);
    }
  }
},[dateRange , listing.price]);

  const category = useMemo(()=>{
    return categories.find((item)=>item.label === listing.category)
  },[listing.category]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6 ">
          <ListingHead
           title={listing.title}
           imageSrc={listing.imageSrc}
           locationValue={listing.locationValue}
           id={listing.id}
           currentUser={currentUser}
           />
           <div className="grid grid-cols-1 mt-6 md:grid-cols-2 md:gap-10">
           <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guessCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
              <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDataRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isloading}
                disabledDates={disabledDates}
              />
            </div>
           </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
