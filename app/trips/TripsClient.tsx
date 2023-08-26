"use client";
import React, { useCallback, useState } from "react";
import Container from "../components/Container";
import { SafeUser, safeReservations } from "../types/type";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListeningCard from "../components/ListeningCard";
interface tripsClientInterface {
  reservations: safeReservations[];
  currentUser?: SafeUser | null;
}
const TripsClient: React.FC<tripsClientInterface> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, SetdeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      SetdeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservations Cancel");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error+'Not Working');
        })
        .finally(() => {
          SetdeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you been and where you are going?"
      />
      <div
        className="mt-10 gap-8 grid grid-cols-1  sm:grid-cols-2
       md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
       "
      >
        {reservations.map((reservation) => (
          <ListeningCard
            key={reservation.id}
            data={reservation.listing}
            reservations={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disable={deletingId === reservation.id}
            currentUser={currentUser}
            actionLabel="Cancel Reservations"
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
