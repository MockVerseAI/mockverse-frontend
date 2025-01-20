import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Container from "../global/container";
import Icons from "../global/icons";
import Images from "../global/images";
import { Button } from "@/components/ui/button";
import Ripple from "@/components/ui/ripple";
import { Link } from "react-router";

const SOCIAL_PLATFORMS = [
  { icon: Icons.linkedin, position: "left-3", size: "small", iconSize: "small", className: "hidden lg:flex" },
  { icon: Icons.tiktok, position: "left-2", size: "medium", iconSize: "medium" },
  { icon: Icons.insta, position: "left-1", size: "large", iconSize: "large" },
  { icon: Icons.youtube, position: "right-1", size: "large", iconSize: "large" },
  { icon: Icons.x, position: "right-2", size: "medium", iconSize: "medium" },
  { icon: Icons.facebook, position: "right-3", size: "small", iconSize: "small", className: "hidden lg:flex" },
];

const Integration = () => {
  const getPositionClasses = (position: string) => {
    switch (position) {
      case "left-3":
        return "-translate-x-[285px]";
      case "left-2":
        return "-translate-x-[210px]";
      case "left-1":
        return "-translate-x-[125px]";
      case "right-1":
        return "translate-x-[125px]";
      case "right-2":
        return "translate-x-[210px]";
      case "right-3":
        return "translate-x-[285px]";
      default:
        return "";
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "size-20";
      case "medium":
        return "size-16";
      case "small":
        return "size-12";
      default:
        return "size-20";
    }
  };

  const getIconSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "size-10";
      case "medium":
        return "size-7";
      case "small":
        return "size-5";
      default:
        return "size-10";
    }
  };

  return (
    <div className="scale- relative flex w-full flex-col items-center justify-center py-20">
      <Container className="relative">
        <div className="relative flex flex-col items-center justify-center overflow-visible lg:hidden">
          <div className="absolute right-1/4 top-1/2 -z-10 h-14 w-3/5 -translate-y-1/2 -rotate-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 blur-[6.5rem] lg:h-20"></div>

          <div className="mx-auto mt-8 h-auto w-full max-w-sm">
            <img src="/images/integration.svg" alt="Integration" width={1000} height={1000} className="h-auto w-full" />
          </div>
        </div>
      </Container>

      <div className="inset-x-0 mx-auto mt-12 flex max-w-3xl flex-col items-center text-center lg:absolute lg:top-1/4 lg:mt-0">
        <h2 className="font-heading text-2xl font-semibold !leading-snug md:text-4xl lg:text-6xl">
          Social Media Integration
        </h2>
      </div>
      <div className="inset-x-0 z-20 mx-auto mt-8 flex max-w-3xl flex-col items-center text-center lg:absolute lg:bottom-1/4 lg:mt-0">
        <Link to="#">
          <Button size="lg">
            See all Integrations
            <ArrowRightIcon className="size-4" />
          </Button>
        </Link>
      </div>

      <Container delay={0.3}>
        <div className="relative hidden items-center justify-center overflow-visible lg:flex">
          <div className="absolute right-1/4 top-1/2 -z-10 h-14 w-3/5 -translate-y-1/2 -rotate-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 blur-[6.5rem] lg:h-20"></div>

          <div className="relative flex h-dvh w-full flex-col items-center justify-center overflow-visible">
            <Ripple />
          </div>

          <div className="group absolute z-20 flex items-center justify-center">
            <Images.logo className="size-24 transition-all duration-500 group-hover:scale-110" />
          </div>

          {SOCIAL_PLATFORMS.map((platform, index) => (
            <div
              key={index}
              className={cn(
                "absolute z-20 flex size-16 items-center justify-center rounded-full bg-gradient-to-b from-foreground/5 to-transparent p-3 shadow-xl shadow-black/10 backdrop-blur-lg transition-all duration-300 hover:scale-110",
                getPositionClasses(platform.position),
                getSizeClasses(platform.size),
                platform.className
              )}
            >
              <platform.icon className={cn("size-auto text-foreground", getIconSizeClasses(platform.iconSize))} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Integration;
