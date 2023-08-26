"use client";
import React, { useCallback, useMemo } from "react";
import { SafeUser, safeListenting, safeReservations } from "../types/type";
import { useRouter } from "next/navigation";
import useCountries from "./hooks/useCountry";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "./HeartButton";
import Button from "./Button";
interface listeningCardProps {
  data: safeListenting;
  currentUser?: SafeUser | null;
  reservations?: safeReservations;
  onAction?: (id: string) => void;
  disable?: boolean;
  actionLabel?: string;
  actionId?: string;
}
const ListeningCard: React.FC<listeningCardProps> = ({
  data,
  currentUser,
  onAction,
  disable,
  actionId = "",
  actionLabel,
  reservations,
}) => {
  const router = useRouter();
  const { getByvalue } = useCountries();
  const location = getByvalue(data.locationValue);
  const handelCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.isPropagationStopped();
      if (disable) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disable]
  );
  const price = useMemo(() => {
    if (reservations) {
      return reservations.totalPrice;
    }
    return data.price;
  }, [reservations, data]);

  const reservationDate = useMemo(() => {
    if (!reservations) {
      return null;
    }
    const start = new Date(reservations.startDate);
    const end = new Date(reservations.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservations]);
  return (
    <div
      onClick={() => router.push(`/listenings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div
        className="
      flex flex-col gap-2 w-full"
      >
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt={data.title}
            src={data.imageSrc}
            className="object-cover scale-100 transition h-full w-full group-hover:scale-110"
          />
          <div className="absolute right-3 top-3">
            <HeartButton listeningId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location ? `${location.region}, ${location.label}` : "Loading..."}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservations && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
           <Button
           disabled={disable}
           small
           label={actionLabel} 
           onClick={handelCancel}
         />
        )}
      </div>
    </div>
  );
};

export default ListeningCard;
