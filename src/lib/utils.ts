import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

export const isUserAuthenticated = () => {
  return !!getAuthToken();
};
