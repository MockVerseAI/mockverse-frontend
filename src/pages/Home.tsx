import { BackgroundBeamsWithCollision } from "@/components/Landing/background-beams-with-collision";
import { FloatingNavbar } from "@/components/Landing/FloatingNavbar";
import ShinyButton from "@/components/Landing/shiny-button";

const Home = () => {
  return (
    <>
      <FloatingNavbar />
      <BackgroundBeamsWithCollision>
        <div className="flex flex-col items-center">
          <h2 className="relative z-20 text-center font-sans text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl lg:text-7xl">
            What's better than mock interviews?
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="absolute left-0 top-[1px] bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span className=""> Mock interviews that talk back.</span>
              </div>
              <div className="relative bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 text-transparent">
                <span className=""> Mock interviews that talk back.</span>
              </div>
            </div>
          </h2>
          <ShinyButton className="mt-5">Get Started</ShinyButton>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
};

export default Home;
