import { SafeUser } from "@/app/types/type";
import axios from "axios";
import {useMemo ,useCallback} from 'react';
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import UseLoginModel from "./useLoginModel";
interface IUseFavorite {
     listeningId: string | undefined;
    currentUser: SafeUser | null;
};
const useFavorite = ({ listeningId, currentUser }: IUseFavorite) => {
    const router = useRouter();
  
    const loginModal = UseLoginModel();
  
    const hasFavorited = useMemo(() => {
      const list = currentUser?.favoriteIds || [];
  
      return list.includes(listeningId);
    }, [currentUser, listeningId]);
  
    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
  
      if (!currentUser) {
        return loginModal.onOpen();
      }
  
      try {
        let request;
  
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listeningId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listeningId}`);
        }
  
        await request();
        router.refresh();
        toast.success('Success');
      } catch (error) {
        toast.error('Something went wrong.');
      }
    }, 
    [
      currentUser, 
      hasFavorited, 
      listeningId, 
      loginModal,
      router
    ]);
  
    return {
      hasFavorited,
      toggleFavorite,
    }
  }
  
  export default useFavorite;
