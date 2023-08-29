import axios from "axios";
const BASE_URL = "https://forkedrecipebackend.onrender.com/";

const nativeApi = axios.create({
  baseURL: BASE_URL,
});

export const nativeApiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default nativeApi;
