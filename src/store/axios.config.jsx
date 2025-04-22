import axios from "axios";

export const apiAuth = axios.create({
  baseURL: "http://localhost:3333/api/auth",
  timeout: 10000,
});
export const apiUser = axios.create({
  baseURL: "http://localhost:3333/api/user",
  timeout: 10000,
});
