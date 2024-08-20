import { PREPAID_CARD_API } from "@/config";
import { store } from "@/lib/redux/store";
import axios, { AxiosError } from "axios";
import { error } from "console";

export const prepaidCardsApi = axios.create({
  baseURL: PREPAID_CARD_API,
});


prepaidCardsApi.interceptors.request.use(
  config => {
    const token = store.getState().auth.user.token;
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

prepaidCardsApi.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 403 && error.response.data.message.includes("access to this application")) {
      console.log(error)
    }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
  },
);
