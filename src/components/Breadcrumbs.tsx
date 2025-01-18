import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const routeElements = useMemo(() => {
    let url = "";
    const segments = pathname
      .split("/")
      .slice(1)
      .filter((segment) => segment.length < 15)
      .map((segment) => {
        url += `/${segment}`;
        return {
          link: url,
          name: segment,
        };
      });

    return segments;
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {routeElements.map((item, idx) => (
          <React.Fragment key={item.name}>
            <BreadcrumbItem className={cn(idx < routeElements.length - 1 && "hidden md:block")}>
              <BreadcrumbLink to={idx < routeElements.length - 1 ? item.link : "#"} className="capitalize">
                {item.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {idx < routeElements.length - 1 ? <BreadcrumbSeparator className="hidden md:block" /> : null}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
