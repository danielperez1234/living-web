// --- Storage Helper Functions ---

import { storageKeys } from "@/const/storage_keys";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// Replace these with your actual storage implementation (e.g., localStorage, AsyncStorage)
const getItem = (key: string): string | null => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  console.warn("localStorage is not available. Token operations will not persist.");
  return null;
};

const setItem = (key: string, value: string): void => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

const removeItem = (key: string): void => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(key);
  }
};
// --- End Storage Helper Functions ---

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * Options for making an HTTP request.
 * The 'token' parameter is removed as it's handled internally via storage.
 */
type RequestOptions = {
  method: HttpMethod;
  endpoint: string;
  headers?: Record<string, string>;
  body?: any;
  formData?: FormData;
};

/**
 * Interface for the structured response from the `request` function.
 */
export interface Response<T> {
  status: number;
  data?: T | undefined;
  message?: string;
  errors?: string;
}

/**
 * Response structure from the refresh token endpoint.
 */
interface RefreshTokenResponseData {
  userName: string;
  email: string;
  token: string;
  refreshToken: string;
}

const mainRoute = "https://livingpapeleria.com";
const refreshTokenEndpoint = "/api/Account/refresh-token";

// Axios instance specifically for token refresh calls to avoid interceptor loops.
const refreshAxiosInstance = axios.create();

// State and queue for managing concurrent token refresh attempts.
let isRefreshingToken = false;
let tokenRefreshSubscribers: ((newAccessToken: string | null) => void)[] = [];

const addRefreshSubscriber = (callback: (newAccessToken: string | null) => void) => {
  tokenRefreshSubscribers.push(callback);
};

const onTokenRefreshed = (newAccessToken: string | null) => {
  tokenRefreshSubscribers.forEach(callback => callback(newAccessToken));
  tokenRefreshSubscribers = [];
};

/**
 * Handles the token refresh logic.
 * @returns The new access token if refresh is successful, otherwise null.
 */
async function handleRefreshToken(): Promise<string | null> {
  const currentRefreshToken = getItem(storageKeys.refreshToken);
  const currentToken = getItem(storageKeys.token); // The current (possibly expired) token

  if (!currentRefreshToken) {
    console.error("No refresh token available. Cannot refresh session.");
    // Clear potentially stale tokens if refresh token is missing
    removeItem(storageKeys.token);
    removeItem(storageKeys.userName);
    removeItem(storageKeys.email);
    return null;
  }
  if(!currentToken){
    console.error("No current token available. Cannot authorize refresh request.");
    // This case might indicate a logged-out state or an issue.
    // Depending on app logic, might also clear refresh token or prompt login.
    removeItem(storageKeys.refreshToken); // If current token is gone, refresh token might be invalid too
    return null;
  }

  const refreshUrl = `${mainRoute}${refreshTokenEndpoint}?refreshToke=${encodeURIComponent(currentRefreshToken)}`;
  console.log(`Attempting to refresh token: POST ${refreshUrl}`);

  try {
    const response: AxiosResponse<RefreshTokenResponseData> = await refreshAxiosInstance.post(
      refreshUrl,
      {}, // Empty body for the POST request as per your cURL example
      {
        headers: {
          'accept': 'text/plain', // As specified in your cURL example
          'Authorization': `Bearer ${currentToken}`, // Requires the current token for authorization
        },
      }
    );

    const { token: newAccessToken, refreshToken: newRefreshToken, userName, email } = response.data;

    if (newAccessToken && newRefreshToken) {
      setItem(storageKeys.token, newAccessToken);
      setItem(storageKeys.refreshToken, newRefreshToken);
      setItem(storageKeys.userName, userName);
      setItem(storageKeys.email, email);
      console.log("Token refreshed successfully.");
      return newAccessToken;
    } else {
      console.error("Refresh token response did not contain new tokens. Data:", response.data);
      throw new Error("Invalid refresh token response structure.");
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Token refresh failed:", axiosError.response?.data || axiosError.message);
    // Critical failure: clear all tokens as the refresh token might be invalid/expired.
    removeItem(storageKeys.token);
    removeItem(storageKeys.refreshToken);
    removeItem(storageKeys.userName);
    removeItem(storageKeys.email);
    // Optionally, trigger a global logout event or redirect here.
    return null;
  }
}

/**
 * Makes an HTTP request with automatic token refresh handling.
 * @param options The request options.
 * @returns A promise that resolves to the structured response.
 */
export async function request<T>({
  method,
  endpoint,
  headers = {},
  body = null,
  formData,
}: RequestOptions): Promise<Response<T>> {
  const makeRequestUnderlying = async (tokenForRequest?: string | null): Promise<Response<T>> => {
    try {
      const activeToken = tokenForRequest || getItem(storageKeys.token);
      const requestHeaders: Record<string, string> = { ...headers };

      if (activeToken) {
        requestHeaders['Authorization'] = `Bearer ${activeToken}`;
      }

      const config: AxiosRequestConfig = {
        method,
        url: mainRoute + endpoint,
        headers: {
          "Content-Type": formData ? "multipart/form-data" : "application/json",
          ...requestHeaders
        },
        data: formData || body,
      };

      // Using the global axios instance for regular requests
      const response: AxiosResponse<T> = await axios(config);

      return {
        status: response.status,
        data: response.data, // Assuming T is the type of response.data
         // message: (response.data as any)?.message // If your successful responses include a message field
      };
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.error(`Request to ${endpoint} failed. Status: ${axiosError.response?.status}. Message: ${axiosError.message}`);

      // If 401 Unauthorized, and it's not a failed refresh token attempt itself
      if (axiosError.response?.status === 401 && endpoint !== refreshTokenEndpoint) {
        if (!isRefreshingToken) {
          isRefreshingToken = true;
          console.log("Initiating token refresh due to 401...");

          const newAccessToken = await handleRefreshToken();
          isRefreshingToken = false;
          onTokenRefreshed(newAccessToken); // Notify all subscribers about the outcome

          if (newAccessToken) {
            console.log("Token refreshed. Retrying original request...");
            return makeRequestUnderlying(newAccessToken); // Retry with the new token
          } else {
            console.error("Failed to refresh token. Original request cannot be retried.");
            return {
              status: 401,
              errors: "Session expired or token refresh failed. Please log in again.",
            };
          }
        } else {
          // Another request is already refreshing the token, queue this one
          console.log("Waiting for ongoing token refresh to complete...");
          return new Promise<Response<T>>((resolve) => {
            addRefreshSubscriber((newAccessToken: string | null) => {
              if (newAccessToken) {
                console.log("Token refresh completed by another call. Retrying queued request...");
                resolve(makeRequestUnderlying(newAccessToken));
              } else {
                console.error("Token refresh failed while waiting. Queued request cannot be retried.");
                resolve({
                  status: 401,
                  errors: "Session expired or token refresh failed. Please log in again.",
                });
              }
            });
          });
        }
      }

      // Handle other errors or errors from the refresh token endpoint
      const responseStatus = axiosError.response?.status || 500;
      let errorMessage = "An unknown error occurred during the request.";

      if (axiosError.response) {
          const errorData = axiosError.response.data as any;
          if (errorData?.errors) {
              errorMessage = typeof errorData.errors === 'string' ? errorData.errors : JSON.stringify(errorData.errors);
          } else if (errorData?.message) {
              errorMessage = typeof errorData.message === 'string' ? errorData.message : JSON.stringify(errorData.message);
          } else if (typeof errorData === 'string' && errorData.trim() !== '') {
              errorMessage = errorData;
          } else if (axiosError.message && responseStatus !== 401) { // Don't override specific 401 message from above
            // Use Axios error message if data is not informative and not a handled 401
            errorMessage = axiosError.message;
          }
      } else if (axiosError.request) {
          errorMessage = "No response received from server. Please check your network connection.";
      } else if (axiosError.message) {
          errorMessage = axiosError.message;
      }

      return {
        status: responseStatus,
        errors: errorMessage,
      };
    }
  };

  return makeRequestUnderlying();
}