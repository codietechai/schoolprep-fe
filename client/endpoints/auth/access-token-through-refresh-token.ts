import axios from 'axios';

export const GET_ACCESS_TOKEN = 'get-access-token';

export const getAccessTokenThroughRefreshToken = async (token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/get-access-token`,
      { token: token },
    );
    return response;
  } catch (error) {
    throw error;
  } finally {
    // setLoader(false); // Stop the loader
  }
};
