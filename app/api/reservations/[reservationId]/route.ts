import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismaDb'
import getCurrentUser from "@/app/actions/getCurrentUser";
interface Iparams {
    reservationId?: string;
}
export async function DELETE(
    request: Request,
    { params }: { params: Iparams }
) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    };
    const {reservationId}  = params;
    if(!reservationId || typeof reservationId !== 'string'){
        throw new Error('Invalid Id')
    }
    const reservation = await prisma.reservation.deleteMany({
        where:{
            id:reservationId,
            OR:[
                {userId:currentUser.id },
                {listing:{userId:currentUser.id}}
            ]
        }
    })
   return NextResponse.json(reservation);
}