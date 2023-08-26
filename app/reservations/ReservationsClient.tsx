"use client"
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeUser, safeReservations } from "../types/type"
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListeningCard from "../components/ListeningCard";

interface reservationsClientProps{
    reservations:safeReservations[];
    currentUser?:SafeUser| null;
}
const ReservationsClient:React.FC<reservationsClientProps> = ({reservations,currentUser}) => {
    const router = useRouter();
    const [deletingId,setdeletingId] = useState('');
    const onCancel = useCallback((id:string)=>{
        setdeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("Reservation cancelled")
            router.refresh();
        })
        .catch(()=>{
            toast.error('Something Went Wrong')
        })
        .finally(()=>{
            setdeletingId('');
        })
    },[router]);
  return (
    <Container>
        <Heading
        title="Reservations"
        subtitle="Booking On your Properties."
        />
        <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-8">
            {reservations.map((reservation)=>(
                <ListeningCard
                key={reservation.id}
                data={reservation.listing}
                reservations={reservation}
                currentUser={currentUser}
                disable={deletingId === reservation.id}
                actionId={reservation.id}
                onAction={onCancel}
                actionLabel="Cancel Guest Reservation"
                
                />
            ))}
        </div>
    </Container>
  )
}

export default ReservationsClient
