"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import {useCallback, useState} from 'react'
import MenuItem from "./MenuItem";
import UseRegisterModel from "../hooks/useRegisterModle";
import UseLoginModel from "../hooks/useLoginModel";
import {signOut} from "next-auth/react"
import { SafeUser } from "@/app/types/type";
import useRentModel from "../hooks/useRentModel";
import { useRouter } from "next/navigation";
interface usermenuPrps{
  currentUser?:SafeUser|null;
}

const UserMenu:React.FC<usermenuPrps> = ({currentUser}) => {
  const router = useRouter();
  const registerModel = UseRegisterModel();
  const loginModel = UseLoginModel();
  const rentModel = useRentModel();
    const [isOpen,setisOpen]=useState(false);
    const toggleMenu =useCallback(()=>{
        setisOpen((value)=>!value);
    },[]);
    const handleSignUpClick = () => {
      registerModel.onOpen();
    };
    const handleLoginClick=()=>{
      loginModel.onOpen();
    }
    const onRent = useCallback(()=>{
      if(!currentUser){
        loginModel.onOpen();
      }
      rentModel.onOpen();
    },[currentUser,loginModel,rentModel])
  return (
    <div className="relative ">
      <div className="flex flex-row gap-3 items-center">
        <div
        onClick={onRent}
        className="hidden md:block text-sm py-3 px-4 rounded-full hover:bg-neutral-100 transition-all cursor-pointer">
          AirBnb your home
        </div>
        <div onClick={toggleMenu}
         className="p-4 md:px-2 md:py-1 flex flex-row items-center border-neutral-200 gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white top-12 text-sm overflow-hidden right-0">
            <div className="flex flex-col cursor-pointer">
              {currentUser?(
                <>
              <MenuItem onClick={()=>router.push('/')} label="Home" />
              <MenuItem onClick={()=>router.push('/trips')} label="My trips" />
              <MenuItem onClick={()=>router.push('/favorites')} label="My favorites" />
              <MenuItem onClick={()=>router.push('/reservations')} label="My reservations" />
              <MenuItem onClick={()=>router.push('/properties')} label="My properties" />
              <MenuItem onClick={rentModel.onOpen} label="Airbnb my home" />
              <MenuItem onClick={()=>signOut()} label="Logout" />
                </>
              ):(
              <>
              <MenuItem onClick={handleLoginClick} label="Login"/>
              <MenuItem onClick={handleSignUpClick} label="Sign Up"/>
              </>
              )}
            </div>
        </div>
      )}
      
    </div>
  );
};

export default UserMenu;
