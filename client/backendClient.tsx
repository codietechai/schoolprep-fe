import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { showMessage, MESSAGE_TYPE } from '@/utils';
import {
  GET_ACCESS_TOKEN,
  getAccessTokenThroughRefreshToken,
} from './endpoints/auth/access-token-through-refresh-token';

export type TErrorFromServer = {
  success: boolean;
  message: string;
  data: any;
};

export const backendClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  if (typeof window !== 'undefined') localStorage.setItem('token', token);
};

export const setRefreshToken = (token: string) => {
  backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  if (typeof window !== 'undefined')
    localStorage.setItem('refreshToken', token);
};

if (typeof window !== 'undefined' && localStorage.getItem('token')) {
  backendClient.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('token')}`;
}

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const msg = (error.response?.data as TErrorFromServer | undefined)?.message;

  if (msg && error.config?.method !== 'get') {
    showMessage(msg, MESSAGE_TYPE.ERROR);
  }
  try {
    if (error?.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        const accessTokenData = await getAccessTokenThroughRefreshToken(
          refreshToken,
        );

        if (accessTokenData?.data?.data?.accessToken) {
          localStorage.setItem(
            'token',
            accessTokenData?.data?.data.accessToken,
          );
          localStorage.setItem(
            'refreshToken',
            accessTokenData?.data?.data.refreshToken,
          );
          backendClient.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessTokenData?.data?.data.accessToken}`;
          error.config!.headers[
            'Authorization'
          ] = `Bearer ${accessTokenData?.data?.data.accessToken}`;

          return axios(error.config!);
        }
      }
    }
  } catch (error) {
    window.location.href = '/check-user-session';
  }

  return Promise.reject(error);
};

const onRequest = (requestConfig: InternalAxiosRequestConfig) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    requestConfig.headers['Authorization'] = `Bearer ${token}`;
  }
  return requestConfig;
};

backendClient.interceptors.response.use(onResponse, onResponseError);
backendClient.interceptors.request.use(onRequest);
