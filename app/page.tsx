import getlistenings, { Ilistingparams } from "./actions/getListenings";
import getCurrentUser from "./actions/getCurrentUser";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListeningCard from "./components/ListeningCard";
interface homeProps {
  searchParams: Ilistingparams;
}
const Home: React.FC<homeProps> = async ({ searchParams }) => {
  const listenings = await getlistenings(searchParams);
  const currentUser = await getCurrentUser();
  if (listenings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div
        className="
            mt-5
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
      >
        {listenings.map((listing) => (
          <ListeningCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};
export default Home;
