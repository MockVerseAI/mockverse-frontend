import { BackgroundBeamsWithCollision } from "@/components/Landing/background-beams-with-collision";
import { FloatingNavbar } from "@/components/Landing/FloatingNavbar";
import ShinyButton from "@/components/Landing/shiny-button";

const Home = () => {
  return (
    <>
      <FloatingNavbar />
      <BackgroundBeamsWithCollision>
        <div className="flex flex-col items-center ">
          <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
            What's better than mock interviews?
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span className=""> Mock interviews that talk back.</span>
              </div>
              <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
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
