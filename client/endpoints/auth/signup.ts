import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const SIGNUP_KEY = 'signup';

export type TSignup = {
  fullname: string;
  email: string;
  password: string;
  is_agreed: boolean;
};

export const SignupRequest = async (payload: TSignup) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post('/admin/signup', payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};
