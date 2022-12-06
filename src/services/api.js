import axios from "axios";

export const api = axios.create({
  // baseURL: "https://insta-tera.herokuapp.com",
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});
