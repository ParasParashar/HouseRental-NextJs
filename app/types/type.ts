import { Listings, Reservation, User } from "@prisma/client";
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type safeListenting= Omit<
Listings,
"createdAt">&{
  createdAt:string;
};

export type safeReservations= Omit<
Reservation,
"createdAt" | "startDate" | "endDate" | "listing">&{
  createdAt:string;
  startDate:string;
  endDate:string;
  listing:safeListenting;
  
};

