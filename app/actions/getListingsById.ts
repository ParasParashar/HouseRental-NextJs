import prisma from "@/app/libs/prismaDb";

interface IParams {
  listingId?: string;
}

export default async function getListingById(
  params: IParams
) {
  try {
    const { listingId } = params;

    const listing = await prisma.listings.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) {
      return null;
    }

  
return {
    ...listing,
    createdAt: listing.createdAt.toString(),};
  }
   catch (error: any) {
    throw new Error(error);
  }
}