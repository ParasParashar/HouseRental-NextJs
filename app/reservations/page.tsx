import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const page = async() => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
      return(
        <EmptyState
        title="Unauthorized"
        subtitle="Please Login"
        />
      )
    };
    
      const reservations = await getReservations({authorId:currentUser.id});
      if(reservations.length === 0){
        return(
          <EmptyState
          title="No reservation Found"
          subtitle="Looks like you have no reservations on your properties."
          />
          )
  }
  return (
    <Container>
        <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
        />
    </Container>
  )
}

export default page;