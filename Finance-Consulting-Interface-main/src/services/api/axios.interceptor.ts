import axios from "axios";
import { store } from "@/services/store/index";
import { appConfig } from "@/config/app-config";
import { RouterConstantUtil } from "@/utils/constants/RouterConstantUtils";
import { resetAuthState, updateToken } from "@/services/store/slices/authSlice";

// export const baseURL = import.meta.env.PROD
//   ? appConfig.prod.baseURL
//   : appConfig.dev.baseURL;
export const baseURL = appConfig.dev.baseURL;

const ApiClient = (requiresToken?: boolean) => {
  const token = requiresToken
    ? store?.getState()?.auth?.u_data?.accessToken
    : "";
  const axiosInstance = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    function (config) {
      if (requiresToken) config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      throw error;
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.headers && response.headers.authorization) {
        const accessToken = response.headers.authorization.split(" ")[1];

        if (accessToken) store.dispatch(updateToken(accessToken));
      }
      return response;
    },
    (e) => {
      if (e?.response?.status == 403 && !location.pathname.includes("auth")) {
        if (e.response.headers && e.response.headers.authorization) {
          const newToken = e.response.headers.authorization.split(" ")[1];

          if (newToken) {
            store.dispatch(updateToken(newToken));
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;
            e.config.headers["Authorization"] = `Bearer ${newToken}`;
            return axios.request(e.config);
          }
        } else {
          store.dispatch(resetAuthState());
          window.location.replace(RouterConstantUtil.auth.login);
        }
      }

      throw e;
    }
  );

  return axiosInstance;
};

export const BaseService = {
  appClient: ApiClient,
};
