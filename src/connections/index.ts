/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

import { ErrorData, handlerError, makeRequest } from "@/utils/request";

export const getCompanies = async (): Promise<Record<string, unknown>> => {
  try {
    const response = await makeRequest(`api/company/Huatulco`, "GET");
    return response.data as Record<string, unknown>;
  } catch (error) {
    return handlerError(error as AxiosError<ErrorData>);
  }
};

export const createCompanyApi = async (
  data: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  try {
    const response = await makeRequest(`api/company`, "POST", data);
    return response.data as Record<string, unknown>;
  } catch (error) {
    return handlerError(error as AxiosError<ErrorData>);
  }
};

export const updateCompanyApi = async (
  data: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  try {
    const response = await makeRequest(`api/company/${data.id}`, "PUT", data);
    return response.data as Record<string, unknown>;
  } catch (error) {
    return handlerError(error as AxiosError<ErrorData>);
  }
};

export const deleteCompanyApi = async (
  data: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  try {
    const response = await makeRequest(`api/company`, "DELETE", data);
    return response.data as Record<string, unknown>;
  } catch (error) {
    return handlerError(error as AxiosError<ErrorData>);
  }
};

export const uploadLogoApi = async (
  data: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const file = data.file as Record<string, unknown>;
  try {
    const response = await makeRequest(
      `api/company/logo/${data.companyId}`,
      "POST",
      file,
      true
    );
    return response.data as Record<string, unknown>;
  } catch (error) {
    return handlerError(error as AxiosError<ErrorData>);
  }
};

export const uploadBannerApi = async (
  data: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const file = data.file as Record<string, unknown>;
  try {
    const response = await makeRequest(
      `api/company/banner/${data.companyId}`,
      "POST",
      file,
      true
    );
    return response.data as Record<string, unknown>;
  } catch (error) {
    return handlerError(error as AxiosError<ErrorData>);
  }
};
