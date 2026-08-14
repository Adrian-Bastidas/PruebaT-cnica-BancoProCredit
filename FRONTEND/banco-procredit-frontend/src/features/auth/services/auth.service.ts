import { api } from "../../../shared/services/api";
import type { LoginRequest, LoginResponse, User } from "../types/auth.types";

const TOKEN_KEY = "procredit_token";
const USER_KEY = "procredit_user";
const EXPIRES_AT_KEY = "procredit_expires_at";

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);
    this.saveSession(credentials.Email, data);
    return data;
  },

  saveSession(username: string, response: LoginResponse) {
    const user: User = {
      username,
      name: username,
    };

    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(EXPIRES_AT_KEY, response.expiresAt);
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXPIRES_AT_KEY);
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },
};
