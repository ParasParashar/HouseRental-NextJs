"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Logo = () => {
  const router = useRouter();
  return (
    <Image
      fill
      src="/images/logo.png"
      alt="Logo"
      className="hidden mr-1 md:block cursor-pointer"
      height="100"
      width="100"
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
