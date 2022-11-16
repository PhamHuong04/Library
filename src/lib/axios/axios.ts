import axios from "axios";

const API = axios.create({
  method: "get",
  baseURL: "http://localhost:5000",
  responseType: "json",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export default API;
