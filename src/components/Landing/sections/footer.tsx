import { BrainCircuit } from "lucide-react";
import { Link } from "react-router";
import Container from "../global/container";

const Footer = () => {
  return (
    <footer className="border-foreground/5 relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center border-t px-6 pt-16 pb-8 lg:px-8 lg:pt-32">
      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <Container>
          <div className="flex flex-col items-start justify-start md:max-w-[200px]">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-auto" />
              <span className="text-foreground text-base font-medium md:text-lg">MockVerse</span>
            </div>
            <p className="text-muted-foreground mt-4 text-start text-sm text-pretty">
              AI-powered Mock interviews, personalized feedback, and job-ready tools to land your dream role.
            </p>
          </div>
        </Container>

        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <Container delay={0.1} className="h-auto">
              <h3 className="text-foreground text-base font-medium">Product</h3>
              <ul className="text-muted-foreground mt-4 space-y-4 text-sm">
                <li className="mt-2">
                  <Link to="#" className="link hover:text-foreground transition-all duration-300">
                    Features
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="#" className="link hover:text-foreground transition-all duration-300">
                    Pricing
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="#" className="link hover:text-foreground transition-all duration-300">
                    Testimonials
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="#" className="link hover:text-foreground transition-all duration-300">
                    Supported Languages
                  </Link>
                </li>
              </ul>
            </Container>
            <Container delay={0.2} className="h-auto">
              <div className="mt-10 flex flex-col md:mt-0">
                <h3 className="text-foreground text-base font-medium">Solutions</h3>
                <ul className="text-muted-foreground mt-4 space-y-4 text-sm">
                  <li>
                    <Link to="#" className="link hover:text-foreground transition-all duration-300">
                      Content Creators
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link to="#" className="link hover:text-foreground transition-all duration-300">
                      Businesses
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link to="#" className="link hover:text-foreground transition-all duration-300">
                      Education
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link to="#" className="link hover:text-foreground transition-all duration-300">
                      Enterprise
                    </Link>
                  </li>
                </ul>
              </div>
            </Container>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <Container delay={0.3} className="h-auto">
              <h3 className="text-foreground text-base font-medium">Resources</h3>
              <ul className="text-muted-foreground mt-4 space-y-4 text-sm">
                <li className="mt-2">
                  <Link to="#" className="link hover:text-foreground transition-all duration-300">
                    Blog
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="#" className="link hover:text-foreground transition-all duration-300">
                    Translation Guides
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="#" className="link hover:text-foreground transition-all duration-300">
                    Support
                  </Link>
                </li>
              </ul>
            </Container>
            <Container delay={0.4} className="h-auto">
              <div className="mt-10 flex flex-col md:mt-0">
                <h3 className="text-foreground text-base font-medium">Company</h3>
                <ul className="text-muted-foreground mt-4 space-y-4 text-sm">
                  <li>
                    <Link to="#" className="link hover:text-foreground transition-all duration-300">
                      About Us
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link to="#" className="link hover:text-foreground transition-all duration-300">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link to="#" className="link hover:text-foreground transition-all duration-300">
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </Container>
          </div>
        </div>
      </div>

      <Container delay={0.5} className="relative mt-12 w-full lg:mt-20">
        <div className="footer mt-8 w-full justify-center md:flex md:items-center">
          <p className="text-muted-foreground mt-8 text-sm md:mt-0">
            &copy; {new Date().getFullYear()} MockVerse. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
