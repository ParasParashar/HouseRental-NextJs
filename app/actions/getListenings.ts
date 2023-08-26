import prisma from "@/app/libs/prismaDb";
export interface Ilistingparams {
  userId?: string;
  guestCount?: number;
  bathroomCount?: number;
  roomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}
export default async function getlistenings(params: Ilistingparams) {
  try {
    const {
      userId,
      guestCount,
      bathroomCount,
      roomCount,
      startDate,
      endDate,
      locationValue,
      category
    } = params;
    let query: any = {};
    if (userId) {
      query.userId = userId;
    };
    if (category) {
      query.category = category;
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      };
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      };
    }
    if (guestCount) {
      query.guessCount = {
        gte: +guestCount
      };
    }
    if(locationValue){
      query.locationValue=locationValue;
    }
    if(startDate && endDate){
      query.NOT={
        reservations:{
          some:{
            OR:[
              {
                endDate:{gte:startDate},
                startDate:{lte:startDate}
              },
              {
                startDate:{lte:endDate},
                endDate:{gte:endDate}
              }
            ]
          }
        }
      }
    }
    const listings = await prisma.listings.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}