import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  HomeIcon,
  MessageCircle,
  MoonIcon,
  SunIcon,
  UserCheck2Icon,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { HoverBorderGradient } from "./hover-border-gradient";
import { useTheme } from "@/hooks/useTheme";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "/about",
    icon: (
      <UserCheck2Icon className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
  {
    name: "Contact",
    link: "/contact",
    icon: (
      <MessageCircle className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
];

export const FloatingNavbar = () => {
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4"
        }
      >
        {navItems.map(
          (
            navItem: { name: string; link: string; icon: JSX.Element },
            idx: number
          ) => (
            <Link
              key={`link=${idx}`}
              to={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          )
        )}
        {theme === "dark" ? (
          <SunIcon
            onClick={() => setTheme("light")}
            className="h-4 w-4 cursor-pointer"
          />
        ) : (
          <MoonIcon
            onClick={() => setTheme("dark")}
            className="h-4 w-4 cursor-pointer"
          />
        )}
        <HoverBorderGradient
          onClick={() => navigate("/login")}
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          <span>Login</span>
        </HoverBorderGradient>
      </motion.div>
    </AnimatePresence>
  );
};
