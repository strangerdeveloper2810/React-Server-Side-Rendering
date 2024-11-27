/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import history from "../history";
import { DataSettings } from "../types/settings";

export const DOMAIN: string = "https://movieapi.cyberlearn.vn";

export const SESSION_ID: string = "session_id";
export const OTP_REQUIRED: string = "otp_required";

// Cấu hình các hàm get set storage cũng như cookie

// export const settings = {
//   setStorageJson: (name: string, data: DataSettings): void => {
//     data = JSON.stringify(data);
//     localStorage.setItem(name, data);
//   },
//   setStorage: (name: string, data: DataSettings, ttl?: number): void => {
//     const item: { value: DataSettings; expiry?: number } = { value: data };

//     if (ttl) {
//       const now = new Date().getTime();
//       item.expiry = now + ttl; // Chỉ thêm expiry khi ttl có giá trị
//     }

//     localStorage.setItem(name, JSON.stringify(item));
//   },

//   getStorage: (name: string): string | null => {
//     const itemStr = localStorage.getItem(name);
//     if (!itemStr) {
//       return null;
//     }

//     const item = JSON.parse(itemStr);
//     const now = new Date().getTime();

//     // Check if the item has expired
//     if (now > item.expiry) {
//       localStorage.removeItem(name);
//       return null;
//     }
//     return item.value;
//   },
//   getStorageJson: (name: string): any | undefined => {
//     if (localStorage.getItem(name)) {
//       const dataStore: string | undefined | null = localStorage.getItem(name);
//       if (typeof dataStore == "string") {
//         const data = JSON.parse(dataStore);
//         return data;
//       }
//       return undefined;
//     }
//     return; // undefined
//   },
//   getStore: (name: string): string | null | undefined | boolean | any => {
//     if (localStorage.getItem(name)) {
//       const data: string | null | undefined = localStorage.getItem(name);
//       return data;
//     }
//     return; // undefined
//   },
//   setCookieJson: (name: string, value: DataSettings, hours: number): void => {
//     const date = new Date();
//     date.setTime(date.getTime() + hours * 60 * 60 * 1000); // Thời hạn 8 giờ
//     const expires = "; expires=" + date.toUTCString();
//     document.cookie = `${name}=${JSON.stringify(
//       value
//     )}; path=/; SameSite=None; Secure${expires}`;
//   },
//   getCookieJson: (name: string): any => {
//     const nameEQ = name + "=";
//     const ca = document.cookie.split(";");
//     for (let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == " ") c = c.substring(1, c.length);
//       if (c.indexOf(nameEQ) == 0)
//         return JSON.parse(c.substring(nameEQ.length, c.length));
//     }
//     return null;
//   },
//   setCookie: (name: string, value: DataSettings, hours: number): void => {
//     const date = new Date();
//     date.setTime(date.getTime() + hours * 60 * 60 * 1000); // Thời hạn 8 giờ
//     const expires = "; expires=" + date.toUTCString();
//     document.cookie = `${name}=${value}; path=/; SameSite=None; Secure${expires}`;
//   },
//   getCookie: (name: string): string | null => {
//     const nameEQ = name + "=";
//     const ca = document.cookie.split(";");
//     for (let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == " ") c = c.substring(1, c.length);
//       if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//     }
//     return null;
//   },
//   eraseCookie: (name: string): void => {
//     document.cookie =
//       name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
//   },
//   clearStorage: (): void => {
//     localStorage.clear();
//   },
//   clearCookies: (): void => {
//     const cookies = document.cookie.split("; ");
//     for (const cookie of cookies) {
//       const eqPos = cookie.indexOf("=");
//       const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
//       settings.eraseCookie(name);
//     }
//   },
// };

export const httpClient = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

// // Cấu hình cho tất cả request gửi đi
// httpClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     // config.baseURL = getBaseURL(config.url || '');
//     const sessionId = settings.getStorage(SESSION_ID);
//     if (sessionId) {
//       const url = new URL(config.url || "", DOMAIN);
//       url.searchParams.set("session_id", sessionId);
//       config.url = url.toString();
//     }

//     config.headers = config.headers || new axios.AxiosHeaders();
//     config.headers.set("Accept", "application/json");

//     return config;
//   },
//   (error) => Promise.reject(error)
// );
// // Cấu hình cho tất cả kết quả trả về (cấu hình cho response)
// httpClient.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   (error) => {
//     // Hàm cấu hình cho tất cả lỗi nhận về
//     if (error.response?.status === 400 || error.response?.status === 404) {
//       // Chuyển hướng trang về trang chủ
//       history.push("/");
//     }

//     if (error.response?.status === 401 || error.response?.status === 403) {
//       history.push("/login");
//     }

//     return Promise.reject(error);
//   }
// );
