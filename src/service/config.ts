import axios from "axios";

const getTokenFromLS = () => {
  const access = localStorage.getItem("accessToken") as string;
  return access;
};

const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
});

instance.interceptors.request.use(
  async (config) => {
    var accessToken = getTokenFromLS();

    if (accessToken) {
      config.headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
