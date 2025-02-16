import { ArrowRightIcon } from "lucide-react";
import Container from "../global/container";
import Icons from "../global/icons";
import { Button } from "@/components/ui/button";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center py-20">
      <div className="absolute top-0 left-1/2 -z-10 flex size-40 -translate-x-1/2 rounded-full bg-blue-500 blur-[10rem] lg:hidden"></div>

      <div className="relative flex flex-col items-center justify-center gap-y-8">
        <Container className="absolute inset-0 top-0 -z-10 mb-auto hidden min-h-screen w-full flex-col items-center justify-center lg:flex">
          <OrbitingCircles speed={0.5} radius={300}>
            <Icons.circle1 className="text-foreground/70 size-4" />
            <Icons.circle2 className="text-foreground/80 size-1" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.25} radius={400}>
            <Icons.circle2 className="text-foreground/50 size-1" />
            <Icons.circle1 className="text-foreground/60 size-4" />
            <Icons.circle2 className="text-foreground/90 size-1" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.1} radius={500}>
            <Icons.circle2 className="text-foreground/50 size-1" />
            <Icons.circle2 className="text-foreground/90 size-1" />
            <Icons.circle1 className="text-foreground/60 size-4" />
            <Icons.circle2 className="text-foreground/90 size-1" />
          </OrbitingCircles>
        </Container>

        <div className="bg-background/0 flex flex-col items-center justify-center gap-y-4 text-center">
          <Container className="relative hidden overflow-hidden lg:block">
            <button className="group relative mx-auto grid overflow-hidden rounded-full px-2 py-1 shadow-[0_1000px_0_0_hsl(0_0%_15%)_inset] transition-colors duration-200">
              <span>
                <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:[inset:0_auto_auto_50%] before:aspect-square before:w-[200%] before:[translate:-50%_-15%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-['']" />
              </span>
              <span className="backdrop bg-background absolute inset-[1px] rounded-full transition-colors duration-200 group-hover:bg-neutral-800" />
              <span className="z-10 flex items-center py-0.5 text-sm text-neutral-100">
                <span className="mr-2 flex h-[18px] items-center justify-center rounded-full bg-linear-to-r from-sky-400 to-blue-600 px-2 py-[0.5px] text-[9px] font-medium tracking-wide text-white">
                  NEW
                </span>
                Resume Enhancer
              </span>
            </button>
          </Container>
          <Container delay={0.15}>
            <h1 className="mx-auto max-w-4xl text-center text-4xl leading-tight! font-bold md:text-4xl lg:text-7xl">
              Ace Your Interviews with AI Precision
            </h1>
          </Container>
          <Container delay={0.2}>
            <p className="text-muted-foreground mx-auto mt-2 max-w-xl text-center text-base lg:text-lg">
              AI-powered Mock interviews, personalized feedback, and job-ready tools to land your dream role.
            </p>
          </Container>
          <Container delay={0.25} className="z-20">
            <div className="mt-6 flex items-center justify-center gap-x-4">
              <Link to="/login" className="group flex items-center gap-2">
                <Button size="lg" variant="white" className="cursor-pointer">
                  Start Free Trial
                  <ArrowRightIcon className="size-4 transition-all duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Container>
          <Container delay={0.3} className="relative">
            <div className="border-border relative mx-auto mt-10 max-w-6xl rounded-xl border p-2 backdrop-blur-lg lg:rounded-[32px]">
              <div className="animate-image-glow absolute inset-0 top-1/8 left-1/2 -z-10 h-1/4 w-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-sky-500 to-blue-600 blur-[4rem] lg:w-3/4 lg:blur-[10rem]"></div>
              <div className="animate-image-glow absolute inset-0 -top-1/8 left-1/2 -z-20 hidden h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2 bg-blue-600 blur-[10rem] lg:block"></div>

              <div className="border-border bg-background rounded-lg border lg:rounded-[22px]">
                <img
                  src="/images/dashboard.png"
                  alt="dashboard"
                  width={1920}
                  height={1080}
                  className="rounded-lg lg:rounded-[20px]"
                />
              </div>
            </div>
            <div className="from-background absolute inset-x-0 bottom-0 h-1/2 w-full bg-linear-to-t to-transparent"></div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Hero;
