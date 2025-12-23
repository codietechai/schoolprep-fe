import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const FORGET_KEY = 'forget-pass';

export type TForgotPass = {
  email: string;
};

export const ForgotRequest = async (payload: TForgotPass) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post(
      '/admin/forgot-password',
      payload,
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};
