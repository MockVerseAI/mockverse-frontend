import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constants";
import { Menu } from "lucide-react";
import { Link } from "react-router";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full pt-12 sm:w-[300px]">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4">
          {NAV_LINKS.map((link, index) => (
            <Link key={index} to={link.href} className="text-base font-medium transition-colors hover:text-primary">
              {link.name}
            </Link>
          ))}
          <div className="mt-4 border-t border-border pt-4">
            <Link to="#" className="w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
