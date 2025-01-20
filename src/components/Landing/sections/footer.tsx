import { BrainCircuit } from "lucide-react";
import { Link } from "react-router";
import Container from "../global/container";

const Footer = () => {
  return (
    <footer className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center border-t border-foreground/5 px-6 pb-8 pt-16 lg:px-8 lg:pt-32">
      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <Container>
          <div className="flex flex-col items-start justify-start md:max-w-[200px]">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-auto" />
              <span className="text-base font-medium text-foreground md:text-lg">MockVerse</span>
            </div>
            <p className="mt-4 text-start text-sm text-muted-foreground">
              AI-powered platform that transforms your marketing workflow in seconds.
            </p>
          </div>
        </Container>

        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <Container delay={0.1} className="h-auto">
              <h3 className="text-base font-medium text-foreground">Product</h3>
              <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
                <li className="mt-2">
                  <Link to="#" className="link transition-all duration-300 hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="#" className="link transition-all duration-300 hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="#" className="link transition-all duration-300 hover:text-foreground">
                    Testimonials
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="#" className="link transition-all duration-300 hover:text-foreground">
                    Supported Languages
                  </Link>
                </li>
              </ul>
            </Container>
            <Container delay={0.2} className="h-auto">
              <div className="mt-10 flex flex-col md:mt-0">
                <h3 className="text-base font-medium text-foreground">Solutions</h3>
                <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
                  <li>
                    <Link to="#" className="link transition-all duration-300 hover:text-foreground">
                      Content Creators
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link to="#" className="link transition-all duration-300 hover:text-foreground">
                      Businesses
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link to="#" className="link transition-all duration-300 hover:text-foreground">
                      Education
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link to="#" className="link transition-all duration-300 hover:text-foreground">
                      Enterprise
                    </Link>
                  </li>
                </ul>
              </div>
            </Container>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <Container delay={0.3} className="h-auto">
              <h3 className="text-base font-medium text-foreground">Resources</h3>
              <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
                <li className="mt-2">
                  <Link to="#" className="link transition-all duration-300 hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="#" className="link transition-all duration-300 hover:text-foreground">
                    Translation Guides
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="#" className="link transition-all duration-300 hover:text-foreground">
                    Support
                  </Link>
                </li>
              </ul>
            </Container>
            <Container delay={0.4} className="h-auto">
              <div className="mt-10 flex flex-col md:mt-0">
                <h3 className="text-base font-medium text-foreground">Company</h3>
                <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
                  <li>
                    <Link to="#" className="link transition-all duration-300 hover:text-foreground">
                      About Us
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link to="#" className="link transition-all duration-300 hover:text-foreground">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link to="#" className="link transition-all duration-300 hover:text-foreground">
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
          <p className="mt-8 text-sm text-muted-foreground md:mt-0">
            &copy; {new Date().getFullYear()} MockVerse. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
