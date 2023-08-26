'use client'
import { User } from '@prisma/client'
import React from 'react'
import { SafeUser } from '../types/type';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorite from './hooks/useFavorite';
interface heartButtonProps{
    currentUser?:SafeUser|null;
    listeningId?:String;
}
const HeartButton:React.FC<heartButtonProps> = ({currentUser,listeningId}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listeningId,
    currentUser
  });
  return (
    <div onClick={toggleFavorite} className='
    relative hover:opacity-70 transition cursor-pointer
    '>
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={
          hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
        }
      />
      </div>
  )
}

export default HeartButton
