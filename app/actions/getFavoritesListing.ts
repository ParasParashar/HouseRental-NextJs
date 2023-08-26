import prisma from '@/app/libs/prismaDb';
import getCurrentUser from './getCurrentUser';
export default async function getFavoritesListings() {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser){
            return [];
        }
        const favorits = await prisma.listings.findMany({
            where:{
                id:{
                    in:[...(currentUser.favoriteIds || null)]
                }
            }
        });
        const safeFavorites = favorits.map((favourite)=>({
            ...favourite,
            createdAt:favourite.createdAt.toISOString(),
        }));
        return safeFavorites;
    } catch (error:any) {
        throw new Error(error);
    }
}