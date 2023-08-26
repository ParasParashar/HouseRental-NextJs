"use client";
import { PuffLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center ">
      <PuffLoader size={100} color="red" />
    </div>
  );
};

export default Loader;
