import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingsById from '@/app/actions/getListingsById'
import getReservations from '@/app/actions/getReservations';
import EmptyState from '@/app/components/EmptyState';
import ListingClient from '@/app/listenings/[listingId]/ListingClient';
import React from 'react'
interface Iparams {
  listingId: string;
}
const  page = async(
  {params}:{params:Iparams}
) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingsById(params);
  const reservations = await getReservations(params);
  if(!listing){
    return(
      <EmptyState/>
    )
  }

  return (
    <ListingClient reservations={reservations} listing={listing} currentUser={currentUser}/>
  )
}

export default page
