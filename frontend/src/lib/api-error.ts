import axios from "axios";

export interface ApiValidationError {
  message: string;
  errors?: Record<string, string[]>;
}

export function extractErrorMessage(error: unknown, fallback: string = "Something went wrong"): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.response?.data?.errors) {
      const firstKey = Object.keys(error.response.data.errors)[0];
      if (firstKey && error.response.data.errors[firstKey]?.length) {
        return error.response.data.errors[firstKey][0];
      }
    }
    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
