import axios from "axios";
import { getLocalStorage } from "../utils/local-storage";

const API = axios.create({
  method: "get",
  baseURL: "http://localhost:5000",
  responseType: "json",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

API.interceptors.request.use((request) => {
  const accessToken = getLocalStorage("access-token") as string;
  const accessHeader = `Bearer ${accessToken}`;
  if (request.headers != null) {
    request.headers.Authorization = accessHeader;
  }
  return request;
});

export default API;
