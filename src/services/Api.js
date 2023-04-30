import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://instapet-t3rs.onrender.com",
  headers: { "Content-Type": "application/json" },
});
