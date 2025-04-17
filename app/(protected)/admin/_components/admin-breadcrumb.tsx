"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { capitalize } from "@/lib/utils/strings";

type BreadcrumbItem = { title: string; url: string };

function getBreadcrumbItems(pathname: string) {
  const segments = pathname.split("/").filter(Boolean); // Split the pathname and filter out empty segments

  const breadcrumbItems: BreadcrumbItem[] = [];

  segments.forEach((segment, index) => {
    if (index === 0 && segment === "admin") return; // Skip 'admin' from the breadcrumb

    const url = `/${segments.slice(0, index + 1).join("/")}`;
    const title = capitalize(segment);

    breadcrumbItems.push({
      title,
      url,
    });
  });

  return breadcrumbItems;
}

export function AdminBreadcrumb() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbItems(pathname);
  return (
    <Breadcrumb className="hidden lg:block">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.url}>
            <BreadcrumbItem>
              <BreadcrumbLink href={breadcrumb.url}>
                {breadcrumb.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
