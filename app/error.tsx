"use client"

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import EmptyState from "./components/EmptyState";

interface errorProps{
    error:Error;
}
const errorState:React.FC<errorProps> = ({error}) => {
    useEffect(()=>{
        console.error(error);
        toast.error("Something Went Wrong!!")
    },[]);
  return (
    <EmptyState
    title="Oh NO"
    subtitle="Something Went Wrong!!!"
    />
  )
}

export default errorState
