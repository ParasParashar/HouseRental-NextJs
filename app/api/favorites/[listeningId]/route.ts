import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from'@/app/libs/prismaDb'

interface IParams {
    listeningId?: string;
  }
  
  export async function POST(
    request: Request, 
    { params }: { params: IParams }
  ) {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return NextResponse.error();
    }
  
    const { listeningId } = params;
    if (!listeningId || typeof listeningId !== 'string') {
      throw new Error('Invalid ID');
    }
  
    let favoriteIds = [...(currentUser.favoriteIds || [])];
  
    favoriteIds.push(listeningId);
  
    const user = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        favoriteIds
      }
    });
  
    return NextResponse.json(user);
  }
  
  export async function DELETE(
    request: Request, 
    { params }: { params: IParams }
  ) {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return NextResponse.error();
    }
  
    const { listeningId } = params;
  
    if (!listeningId || typeof listeningId !== 'string') {
      throw new Error('Invalid ID');
    }
  
    let favoriteIds = [...(currentUser.favoriteIds || [])];
  
    favoriteIds = favoriteIds.filter((id) => id !== listeningId);
  
    const user = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        favoriteIds
      }
    });
  
    return NextResponse.json(user);
  }