import { httpClient } from "./httpClient";

export class AuthAPI {
  static async login(credentials) {
    return await httpClient.post("/auth/login", credentials);
  }

  static async register(userData) {
    return await httpClient.post("/auth/register", userData);
  }

  static async refreshToken() {
    return await httpClient.post("/auth/refresh");
  }

  static async logout() {
    return await httpClient.post("/auth/logout");
  }
}
