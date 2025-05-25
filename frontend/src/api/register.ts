import { Axios } from "../utils/axiosInstance";

export type RegisterRequest = {
  username: string;
  password: string;
};

export type RegisterResponse = {
  success: boolean;
  data: { id: number } | null;
  msg: string;
};

export const registerUser = async (
  payload: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const res = await Axios.post("/auth/register", payload, {
      withCredentials: true,
    });
    return {
      success: true,
      data: res.data.data,
      msg: res.data.msg,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      msg: error?.response?.data?.msg || "Cannot connect to server",
    };
  }
};
