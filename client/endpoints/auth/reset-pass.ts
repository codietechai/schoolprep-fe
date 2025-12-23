import { backendClient } from '@/client/backendClient';
import { useContainerLoader } from '@/hooks';

export const RESET_KEY = 'reset';

export type TReset = {
  token: string;
  password: string;
};

export const ResetpassRequest = async (payload: TReset) => {
  useContainerLoader.getState().setShowLoader(true);
  try {
    const response = await backendClient.post('/admin/reset-password', payload);
    return response;
  } catch (error) {
    throw error;
  } finally {
    useContainerLoader.getState().setShowLoader(false);
  }
};
