import Container from "../global/container";
import Images from "../global/images";

const Companies = () => {
  return (
    <div className="companies relative mt-16 flex w-full flex-col items-center justify-center overflow-hidden py-20">
      <Container>
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-2xl font-medium lg:text-4xl">
            Helping candidates prepare for <span className="font-subheading italic">top</span> companies
          </h4>
          <p className="text-accent-foreground/80 mt-4 text-center text-base md:text-lg">
            Our users have successfully landed roles at leading tech companies and organizations
          </p>
        </div>
      </Container>

      <Container delay={0.1}>
        <div className="text-muted-foreground mx-auto flex max-w-xl flex-row flex-wrap items-center justify-center gap-8 pt-16 transition-all">
          <Images.company1 className="hover:text-foreground h-7 w-auto" />
          <Images.company2 className="hover:text-foreground h-7 w-auto" />
          <Images.company3 className="hover:text-foreground h-7 w-auto" />
          <Images.company6 className="hover:text-foreground h-7 w-auto" />
          <Images.company7 className="hover:text-foreground h-7 w-auto" />
          <Images.company9 className="hover:text-foreground h-7 w-auto" />
          <Images.company10 className="hover:text-foreground h-7 w-auto" />
        </div>
      </Container>
    </div>
  );
};

export default Companies;
