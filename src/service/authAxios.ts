import instance from "./config";

const getTokenFromLS = () => {
  const access = localStorage.getItem("accessToken") as string;
  return access;
};

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
