import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { BrainCircuit } from "lucide-react";
import { Link } from "react-router";
import Wrapper from "../global/wrapper";
import MobileMenu from "./mobile-menu";
import { isUserAuthenticated } from "@/lib/utils";

const Navbar = () => {
  const isAuthenticated = isUserAuthenticated();

  return (
    <header className="bg-background/80 sticky top-0 z-50 h-16 w-full backdrop-blur-xs">
      <Wrapper className="h-full">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <BrainCircuit className="w-6" />
              <span className="hidden text-xl font-semibold lg:block">MockVerse</span>
            </Link>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <li key={index} className="-1 link text-sm font-medium">
                  <Link to={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="hidden lg:block">
              <Button variant="blue">{isAuthenticated ? "Dashboard" : "Login"}</Button>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Navbar;
