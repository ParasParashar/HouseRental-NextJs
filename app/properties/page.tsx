import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import getlistenings from "../actions/getListenings";

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (<EmptyState title="Unauthorized" subtitle="Login" />);
  }
  const listings = await getlistenings({ userId: currentUser.id });
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties Found"
        subtitle="Looks like you haven't created any property. "
      />
    );
  }
  return <div>
    <PropertiesClient
    listings={listings}
    currentUser={currentUser}
    />
  </div>;
};

export default page;
