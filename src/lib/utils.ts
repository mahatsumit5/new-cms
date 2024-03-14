import { ICategory, IitemsByCat, serverReturnDataType } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
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

export function showToast(promise: Promise<serverReturnDataType>) {
  toast.promise(promise, {
    loading: "Loading...",
    success: ({ message }) => message,
    error: "UnExpected error occured",
  });
}
