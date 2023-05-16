import axios from "axios";

export const Api = axios.create({
  baseURL: "https://api-instapet.vercel.app",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, PUT, PATCH, GET, DELETE, OPTIONS",
    "Access-Control-Allow-Credentials": true,
  },
});
