import { useTheme } from "@/hooks/useTheme";
import { BrainCircuit, MoonIcon, SunIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { HoverBorderGradient } from "./hover-border-gradient";

const Navbar = () => {
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();

  return (
    <nav className="fixed top-0 z-10 flex w-full items-center justify-between space-x-1 px-4 py-2 shadow-md">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <BrainCircuit className="size-4" />
        </div>
        <span className="font-medium">MockVerse</span>
      </div>

      <div className="flex items-center gap-5">
        {theme === "dark" ? (
          <SunIcon onClick={() => setTheme("light")} className="h-4 w-4 cursor-pointer" />
        ) : (
          <MoonIcon onClick={() => setTheme("dark")} className="h-4 w-4 cursor-pointer" />
        )}
        <HoverBorderGradient
          onClick={() => navigate("/login")}
          containerClassName="rounded-full"
          as="button"
          className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
        >
          <span>Login</span>
        </HoverBorderGradient>
      </div>
    </nav>
  );
};

export default Navbar;
