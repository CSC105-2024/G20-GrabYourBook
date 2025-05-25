import { Axios } from "../utils/axiosInstance";

export const logoutUser = async () => {
  try {
    const res = await Axios.get("/auth/logout", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return {
      success: false,
      msg: "Logout failed",
    };
  }
};