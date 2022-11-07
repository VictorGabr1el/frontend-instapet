import axios from "axios";

export const api = axios.create({
  baseURL: "https://insta-tera.herokuapp.com",
  headers: { "Content-Type": "application/json" },
});
