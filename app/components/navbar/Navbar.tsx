"use client";
import { SafeUser } from "@/app/types/type";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
interface navbarProps{
  currentUser?:SafeUser | null;
}
const Navbar:React.FC<navbarProps> = ({currentUser}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 borer-b-[1px] ">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0 ">
            <Logo/>
            <Search/>
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
      <Categories/>
    </div>
  );
};

export default Navbar;
