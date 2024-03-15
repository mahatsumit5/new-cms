import { ChevronRightIcon } from "@radix-ui/react-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export function CustomBreadCrumb() {
  const location = useLocation();
  const path = location.pathname;
  const pathnameArray = path.split("/");
  return (
    <Breadcrumb className="px-9 py-2">
      <BreadcrumbList>
        {pathnameArray.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <Link
                to={item === "" ? "/dashboard" : `/${item}`}
                className="uppercase"
              >
                {item === "" ? "Home" : item}
              </Link>
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
