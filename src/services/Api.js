import axios from "axios";

export const Api = axios.create({
  baseURL: "https://api-instapet.vercel.app",
  headers: { "Content-Type": "application/json" },
});
