import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Link } from "react-router";

const Breadcrumb = ({
  ...props
}: React.ComponentProps<"nav"> & {
  separator?: React.ReactNode;
}) => <nav data-slot="breadcrumb" aria-label="breadcrumb" {...props} />;
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = ({ className, ...props }: React.ComponentProps<"ol">) => (
  <ol
    data-slot="breadcrumb-list"
    className={cn(
      "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
      className
    )}
    {...props}
  />
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1.5", className)} {...props} />
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = ({
  asChild,
  className,
  ...props
}: React.ComponentProps<typeof Link> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : Link;

  return (
    <Comp data-slot="breadcrumb-link" className={cn("hover:text-foreground transition-colors", className)} {...props} />
  );
};
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    data-slot="breadcrumb-page"
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("text-foreground font-normal", className)}
    {...props}
  />
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:h-3.5 [&>svg]:w-3.5", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
