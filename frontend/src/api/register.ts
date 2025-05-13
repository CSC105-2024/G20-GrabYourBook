import { Axios } from "../utils/axiosInstance";
import { RegisterRequest, RegisterResponse } from "../types/user";

export const registerUser = async (
  payload: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const res = await Axios.post("/user/register", payload);
    return res.data;
  } catch (error) {
    console.error("Register API error:", error);
    return {
      success: false,
      data: null,
      msg: "Cannot connect to server",
    };
  }
};
