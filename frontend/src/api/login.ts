import { Axios } from "../utils/axiosInstance";
import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const loginUser = async (payload: z.infer<typeof loginSchema>) => {
  try {
    const res = await Axios.post("/auth/login", payload, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      msg: error?.response?.data?.msg || "Login failed",
    };
  }
};
