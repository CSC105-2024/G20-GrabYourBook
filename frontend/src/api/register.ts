import { Axios } from '../utils/axiosInstance';

type RegisterResponse = {
  success: boolean;
  data: string | null;
};

export const registerUser = async (
  username: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const response = await Axios.post<{ msg: string }>('/user/register', {
      username,
      password,
    });

    return {
      success: true,
      data: response.data.msg || 'Registered successfully',
    };
  } catch (e: any) {
    console.error('Register error:', e);
    const message =
      e?.response?.data?.msg || 'Server error. Please try again.';
    return {
      success: false,
      data: message,
    };
  }
};
