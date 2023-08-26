import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismaDb'
import getCurrentUser from "@/app/actions/getCurrentUser";
export async function POST(request:Request){
    const currentuser = await getCurrentUser();
    if(!currentuser){
        return NextResponse.error();
    }
    const body = await request.json();
    const {
        totalPrice,
        startDate,
        endDate,
        listingId
    } = body;
   if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }
    const listingAndReservation = await prisma.listings.update({
        where: {
          id: listingId
        },
        data: {
          reservations: {
            create: {
              userId: currentuser.id,
              startDate,
              endDate,
              totalPrice,
            }
          }
        }
      });
      return NextResponse.json(listingAndReservation);
    }