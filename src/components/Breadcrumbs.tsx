import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const routeElements = useMemo(() => {
    // Define the breadcrumb structure based on the current path
    const segments = [];
    const pathParts = pathname.split("/").filter(Boolean);

    // Only add segments for dashboard paths
    if (pathParts.includes("dashboard")) {
      // Always add dashboard
      segments.push({
        name: "dashboard",
        link: "/dashboard",
      });

      // Check for interview-workspace
      if (pathParts.includes("interview-workspace")) {
        segments.push({
          name: "interview workspace",
          link: "/dashboard/interview-workspace",
        });

        // Check if we're in a specific workspace (with ID)
        if (pathParts.length > 2 && pathParts[2] !== "setup") {
          const workspaceId = pathParts[2];

          // If we're in the interviews list page
          if (pathParts.length === 3) {
            segments.push({
              name: "interviews",
              link: "#",
            });
          } else if (pathParts.includes("interview")) {
            // Add link back to the interviews list
            segments.push({
              name: "interviews",
              link: `/dashboard/interview-workspace/${workspaceId}`,
            });

            // Now add appropriate sections based on the current path
            if (pathParts.includes("setup")) {
              // Add setup as the final non-clickable segment
              segments.push({
                name: "setup",
                link: "#",
              });
            } else if (pathParts.includes("chat") && pathParts.length > 5) {
              segments.push({
                name: "chat",
                link: "#",
              });
            } else if (pathParts.includes("report") && pathParts.length > 5) {
              segments.push({
                name: "report",
                link: "#",
              });
            }
          }
        } else if (pathParts.includes("setup")) {
          segments.push({
            name: "setup",
            link: "#",
          });
        }
      } else if (pathParts.includes("application-enhancer")) {
        segments.push({
          name: "application enhancer",
          link: "/dashboard/application-enhancer",
        });

        if (pathParts.includes("setup")) {
          segments.push({
            name: "setup",
            link: "#",
          });
        } else if (pathParts.includes("report")) {
          segments.push({
            name: "report",
            link: "#",
          });
        }
      } else if (pathParts.includes("cover-letter")) {
        segments.push({
          name: "cover letter",
          link: "/dashboard/cover-letter",
        });

        if (pathParts.includes("setup")) {
          segments.push({
            name: "setup",
            link: "#",
          });
        } else if (pathParts.includes("report")) {
          segments.push({
            name: "report",
            link: "#",
          });
        }
      } else if (pathParts.includes("account")) {
        segments.push({
          name: "account",
          link: "/dashboard/account",
        });
      }
    }

    return segments;
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {routeElements.map((item, idx) => (
          <React.Fragment key={`${item.name}-${idx}`}>
            <BreadcrumbItem className={cn(idx < routeElements.length - 1 && "hidden md:block")}>
              <BreadcrumbLink to={item.link} className="capitalize">
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
