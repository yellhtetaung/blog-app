import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.100.29:3000",
});
