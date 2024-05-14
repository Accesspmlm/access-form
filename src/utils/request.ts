import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

import { getCookieTokenName } from "@/config";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface ErrorDataResponse {
  response: {
    data: {
      details: {
        businessMeaning: string;
      };
    };
  };
}

export interface ErrorData {
  details: {
    businessMeaning: string;
  };
}

const getHeaders = (
  requireToken: boolean,
  isFormData: boolean
): Record<string, string> => {
  const token = Cookies.get(getCookieTokenName());
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": isFormData ? "multipart/form-data" : "application/json",
  };
  if (requireToken) {
    headers["Authorization"] = `Bearer ${token}` || "";
  }
  return headers;
};
//http://143.198.231.7/server/
//http://localhost:8080/
export const makeRequest = async <T>(
  url: string,
  method: Method,
  data?: Record<string, unknown> | FormData,
  isFormData = false,
  requireToken = true,
  responseType: ResponseType = "json"
): Promise<AxiosResponse<T>> => {
  const baseUrl = process.env.API + url;

  const config: AxiosRequestConfig = {
    baseURL: baseUrl,
    method,
    data: isFormData ? data : JSON.stringify(data),
    headers: getHeaders(requireToken, isFormData),
    responseType,
  };

  const response: AxiosResponse<T> = await axios(config);
  return response;
};

export const handlerError = (
  error: AxiosError<ErrorData>
): Promise<Record<string, unknown>> => {
  if (error.response) {
    const errorMessage = error.response.data.details.businessMeaning;
    const errorObject = {
      statusCode: error.response.status,
      message: errorMessage,
    };
    throw errorObject;
  } else {
    const genericErrorMessage =
      (error as Error).message || "Unknown error occurred";
    const errorObject = {
      message: genericErrorMessage,
    };
    throw errorObject;
  }
};
