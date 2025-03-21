import { useUserLoginMutation } from "@/app/api/auth";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



export function capitalizeFirstLetter(str) {
  if (!str) return ""; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


export const convertToLocalTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString(); // Converts to local time based on the user's system
};