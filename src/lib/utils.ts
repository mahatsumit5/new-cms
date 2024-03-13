import { ICategory, IitemsByCat } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatPriceToAud(price: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(price);
}

export function changeCategoryIdToName(
  catalogue: ICategory[],
  itemsByCategory: IitemsByCat[]
): string[] {
  const result = itemsByCategory.map((item) => {
    const data = catalogue.find((i) => i._id === item._id);
    return data?.title;
  });
  return result as [];
}
