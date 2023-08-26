import Container from "../components/Container";
import Heading from "../components/Heading";
import ListeningCard from "../components/ListeningCard";
import { SafeUser, safeListenting } from "../types/type"

interface favouriteClientProps{
    listings:safeListenting[] ;
    currentUser?:SafeUser |  null;
}

const FavouriteClient:React.FC<favouriteClientProps> = ({listings,currentUser}) => {
  return (
    <Container>
        <Heading 
        title="Favourites"
        subtitle="List of places you have favourited"
        />
          <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-8">
            {listings.map((listings)=>(
                <ListeningCard
                key={listings.id}
                data={listings}
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default FavouriteClient
