import Wrapper from "@/components/Landing/global/wrapper";
import Analysis from "@/components/Landing/sections/analysis";
import Companies from "@/components/Landing/sections/companies";
import CTA from "@/components/Landing/sections/cta";
import Features from "@/components/Landing/sections/features";
import Footer from "@/components/Landing/sections/footer";
import Hero from "@/components/Landing/sections/hero";
import Integration from "@/components/Landing/sections/integration";
import Navbar from "@/components/Landing/sections/navbar";
import Pricing from "@/components/Landing/sections/pricing";
import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";

const Home = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return (
    <div className="dark bg-background font-heading text-foreground min-h-screen overflow-x-hidden antialiased">
      <Navbar />
      <main className="relative z-40 mx-auto w-full">
        <Wrapper className="relative py-20">
          <Hero />
          <Companies />
          <Features />
          <Analysis />
          <Integration />
          <Pricing />
          <CTA />
        </Wrapper>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
