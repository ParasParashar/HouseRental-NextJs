"use client";
import React, { useCallback, useState } from "react";
import Container from "../components/Container";
import { SafeUser, safeListenting, } from "../types/type";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListeningCard from "../components/ListeningCard";
interface tripsClientInterface {
  listings: safeListenting[];
  currentUser?: SafeUser | null;
}
const PropertiesClient: React.FC<tripsClientInterface> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, SetdeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      SetdeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing Deleted");
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
        title="Properties"
        subtitle="List of your properties"
      />
      <div
        className="mt-10 gap-8 grid grid-cols-1  sm:grid-cols-2
       md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
       "
      >
        {listings.map((listing) => (
          <ListeningCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disable={deletingId === listing.id}
            currentUser={currentUser}
            actionLabel="Deleting Property"
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
