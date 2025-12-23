import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const LOGIN_KEY = 'login';

export type TLogin = {
  email: string;
  password: string;
};

export const loginRequest = async (payload: TLogin) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post('/admin/login', payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const logoutRequest = async () => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post('/admin/logout');
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const twoFaLoginRequest = async (payload: {
  user_id: string;
  code: string;
}) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post('/admin/2fa-login', payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};

export const resendCodeRequest = async (user_id: string) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(`/admin/resend-code/${user_id}`);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};
