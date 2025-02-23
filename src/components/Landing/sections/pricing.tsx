import { PLANS } from "@/lib/constants";
import { PLAN } from "@/lib/types";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import Container from "../global/container";
import { Button } from "@/components/ui/button1";

type Plan = "monthly" | "annually";

const Pricing = () => {
  const [billPlan, setBillPlan] = useState<Plan>("monthly");

  const handleSwitch = () => {
    setBillPlan((prev) => (prev === "monthly" ? "annually" : "monthly"));
  };

  return (
    <div id="pricing" className="relative mx-auto flex max-w-5xl flex-col items-center justify-center py-20">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="font-heading mt-6 text-2xl leading-snug! font-medium md:text-4xl lg:text-5xl">
              Find the right plan that suits <br className="hidden lg:block" />{" "}
              <span className="font-subheading italic">your needs</span>
            </h2>
            <p className="text-accent-foreground/80 mt-6 text-center text-base md:text-lg">
              Transform your marketing with AI-powered automation. Create campaigns faster, generate better content, and
              make smarter decisions in minutes.
            </p>
          </div>
        </Container>

        <Container delay={0.2}>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <span className="text-base font-medium">Monthly</span>
            <button onClick={handleSwitch} className="relative rounded-full focus:outline-hidden">
              <div className="h-6 w-12 rounded-full bg-blue-500 shadow-md outline-hidden transition"></div>
              <div
                className={cn(
                  "absolute top-1 left-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white transition-all duration-500 ease-in-out",
                  billPlan === "annually" ? "translate-x-6" : "translate-x-0"
                )}
              />
            </button>
            <span className="text-base font-medium">Annually</span>
          </div>
        </Container>
      </div>

      <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 pt-8 lg:grid-cols-2 lg:gap-6 lg:pt-12">
        {PLANS.map((plan, idx) => (
          <Container key={idx} delay={0.1 * idx + 0.2}>
            <Plan key={plan.id} plan={plan} billPlan={billPlan} />
          </Container>
        ))}
      </div>
    </div>
  );
};

const Plan = ({ plan, billPlan }: { plan: PLAN; billPlan: Plan }) => {
  return (
    <div
      className={cn(
        "bg-background/ border-foreground/10 relative flex w-full flex-col items-start overflow-hidden rounded-2xl border transition-all lg:rounded-3xl",
        plan.title === "Mastermind" && "border-blue-500"
      )}
    >
      {plan.title === "Mastermind" && (
        <div className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-12 w-full -rotate-45 rounded-2xl bg-blue-600 blur-[8rem] lg:rounded-3xl"></div>
      )}

      <div className="relative flex w-full flex-col items-start rounded-t-2xl p-4 md:p-8 lg:rounded-t-3xl">
        <h2 className="text-foreground pt-5 text-xl font-medium">{plan.title}</h2>
        <h3 className="mt-3 text-3xl font-medium md:text-5xl">
          <NumberFlow
            value={billPlan === "monthly" ? plan.monthlyPrice : plan.annuallyPrice}
            suffix={billPlan === "monthly" ? "/mo" : "/yr"}
            format={{
              currency: "USD",
              style: "currency",
              currencySign: "standard",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              currencyDisplay: "narrowSymbol",
            }}
          />
        </h3>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">{plan.desc}</p>
      </div>
      <div className="flex w-full flex-col items-start px-4 py-2 md:px-8">
        <Button size="lg" variant={plan.title === "Mastermind" ? "blue" : "white"} className="w-full">
          {plan.buttonText}
        </Button>
        <div className="mx-auto h-8 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={billPlan}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-muted-foreground mx-auto mt-3 block text-center text-sm"
            >
              {billPlan === "monthly" ? "Billed monthly" : "Billed in one annual payment"}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <div className="mb-4 ml-1 flex w-full flex-col items-start gap-y-2 p-5">
        <span className="mb-2 text-left text-base">Includes:</span>
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center justify-start gap-2">
            <div className="flex items-center justify-center">
              <CheckIcon className="size-5" />
            </div>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
