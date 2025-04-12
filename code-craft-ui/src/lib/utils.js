import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const pick = (obj, keys) => {
  return keys.reduce((acc, key) => {
    if (obj[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

export const serviceReducer = (state, action) => {
  const { type, payload = {} } = action;
  const { data, message = "" } = payload;

  switch (type) {
    case "FETCH_START":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      return { ...state, data, message, isLoading: false };
    case "FETCH_ERROR":
      return { ...state, isError: true, isLoading: false, message };
    default:
      return state;
  }
};
