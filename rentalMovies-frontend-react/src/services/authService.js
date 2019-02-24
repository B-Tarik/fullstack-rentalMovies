import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/auth";
const tokeynKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokeynKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokeynKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokeynKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokeynKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokeynKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
