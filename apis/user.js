import { axiosInstance } from "../utils/axiosInstance";

export const loginUser = async ({ email, password }) => {
  try {
    const res = await axiosInstance.post("/user/login", {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const registerUser = async ({ username, email, password }) => {
  try {
    const res = await axiosInstance.post("/user", {
      username,
      email,
      password,
    });

    return res.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
