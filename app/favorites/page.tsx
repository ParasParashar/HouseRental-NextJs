import getCurrentUser from "../actions/getCurrentUser"
import getFavoritesListings from "../actions/getFavoritesListing";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import FavouriteClient from "./FavouriteClient";

const page = async() => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
      return(
        <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorites listings."
        />
      )
    };
    
      const listings = await getFavoritesListings();
      if(listings.length === 0){
        return(
          <EmptyState
          title="No favourites Found"
          subtitle="Looks like you have not created any favourites."
          />
          )
  }
  return (
    <Container>
        <FavouriteClient
        listings={listings}
        currentUser={currentUser}
        />
    </Container>
  )
}

export default page;