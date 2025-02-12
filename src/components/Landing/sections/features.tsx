import { FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Container from "../global/container";
import { MagicCard } from "@/components/ui/magic-card";

const Features = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center py-20">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="font-heading mt-6 text-2xl leading-snug! font-medium md:text-4xl lg:text-5xl">
            AI-Powered marketing <br /> made <span className="font-subheading italic">simple</span>
          </h2>
          <p className="text-accent-foreground/80 mt-6 text-center text-base md:text-lg">
            Transform your marketing with AI-powered automation. Create campaigns faster, generate better content, and
            make smarter decisions in minutes.
          </p>
        </div>
      </Container>

      <div className="relative mt-8 grid grid-cols-1 gap-6 overflow-visible md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => (
          <Container
            key={feature.title}
            delay={0.1 + index * 0.1}
            className={cn(
              "border-border/50 bg-card hover:border-border/100 relative flex flex-col rounded-2xl border transition-colors lg:rounded-3xl",
              index === 3 && "lg:col-span-2",
              index === 2 && "md:col-span-2 lg:col-span-1"
            )}
          >
            <MagicCard
              gradientFrom="#38bdf8"
              gradientTo="#3b82f6"
              className="p-4 lg:rounded-3xl lg:p-6"
              gradientColor="rgba(59,130,246,0.1)"
            >
              <div className="mb-4 flex items-center space-x-4">
                <h3 className="flex items-center gap-2 text-xl font-semibold">
                  <feature.icon className="size-5 text-white" />
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm">{feature.description}</p>

              <div className="bg-card/50 mt-6 w-full overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            </MagicCard>
          </Container>
        ))}
      </div>
    </div>
  );
};

export default Features;
