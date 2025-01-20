import { motion } from "framer-motion";
import Container from "../global/container";
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import { Link } from "react-router";

const CTA = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center py-20">
      <Container className="mx-auto max-w-6xl py-20">
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-foreground/20 bg-background/20 px-0 py-12 text-center lg:rounded-3xl lg:py-20">
          <Particles refresh ease={80} quantity={80} color="#d4d4d4" className="absolute inset-0 z-0 hidden lg:block" />
          <Particles refresh ease={80} quantity={35} color="#d4d4d4" className="absolute inset-0 z-0 block lg:hidden" />

          <motion.div
            className="absolute -bottom-1/8 left-1/3 -z-10 h-32 w-44 -translate-x-1/2 rounded-full blur-[5rem] lg:h-52 lg:w-1/3 lg:blur-[10rem]"
            style={{
              background: "conic-gradient(from 0deg at 50% 50%, #a855f7 0deg, #3b82f6 180deg, #06b6d4 360deg)",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <h2 className="font-heading text-3xl font-medium !leading-snug md:text-5xl lg:text-6xl">
            Ready to boost your <br /> <span className="font-subheading italic">marketing</span> ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-accent-foreground/80 md:text-lg">
            Transform your marketing with AI-powered automation. Create campaigns faster, generate better content{" "}
            <span className="hidden lg:inline">and make smarter decisions in minutes.</span>
          </p>
          <Link to="#pricing" className="mt-8">
            <Button size="lg">Let&apos;s get started</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default CTA;
