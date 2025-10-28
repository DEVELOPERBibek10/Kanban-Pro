import { Separator } from "@radix-ui/react-dropdown-menu";
import ThemeToggle from "../Theme/ThemeToggle";
import { Button } from "../ui/button";
import Logo from "../Logo";
import { useState } from "react";
import ProjectForm from "../ProjectForm";


const Header = () => {

  const [open, setOpen] = useState(false);


  return (
    <header className="w-full h-16">
      <nav className=" flex justify-between items-center px-20 py-3">
        <div className="flex justify-center items-center gap-2">
          <Logo />
          <div>
            <span className="text-xl font-bold mr-1"> Pro</span>
            <span className="text-xl">KanBan</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Separator className="h-[25px] w-[3px] bg-zinc-700 dark:bg-gray-300 rounded-full" />
          <Button className="rounded-full cursor-pointer text-base" onClick={()=> setOpen(!open)}>
            Create Project
          </Button>
        </div>
      </nav>
      {
        <ProjectForm status="Create" open={open} setOpen={setOpen} detail={null}/>
      }
    </header>
  );
};

export default Header;
