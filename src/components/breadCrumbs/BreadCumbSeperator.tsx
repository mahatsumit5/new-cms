import { ChevronRightIcon } from "@radix-ui/react-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export function CustomBreadCrumb() {
  const location = useLocation();
  const path = location.pathname;
  const pathnameArray = path.split("/");
  return (
    <Breadcrumb className="px-5">
      <BreadcrumbList>
        {pathnameArray.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={item === "" ? "/" : `/${item}`}
                className="uppercase"
              >
                {item === "" ? "Home" : item}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathnameArray.length - index !== 1 && (
              <BreadcrumbSeparator>
                <ChevronRightIcon />
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
