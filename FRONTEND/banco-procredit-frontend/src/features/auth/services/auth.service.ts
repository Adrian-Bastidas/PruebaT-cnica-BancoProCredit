import { api } from "../../../shared/services/api";
import { cookieUtils } from "../../../shared/utils/cookieUtils";
import type { LoginRequest, LoginResponse, User } from "../types/auth.types";

const TOKEN_KEY = "procredit_token";
const USER_KEY = "procredit_user";
const EXPIRES_AT_KEY = "procredit_expires_at";

// Opciones para las cookies (1 hora de expiración)
const COOKIE_OPTIONS = {
  maxAge: 60 * 60, // 1 hora en segundos
};

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

    // Guardar en cookies
    cookieUtils.set(TOKEN_KEY, response.token, COOKIE_OPTIONS);
    cookieUtils.set(USER_KEY, JSON.stringify(user), COOKIE_OPTIONS);
    cookieUtils.set(EXPIRES_AT_KEY, response.expiresAt, COOKIE_OPTIONS);
  },

  logout() {
    // Eliminar cookies
    cookieUtils.remove(TOKEN_KEY);
    cookieUtils.remove(USER_KEY);
    cookieUtils.remove(EXPIRES_AT_KEY);
  },

  isAuthenticated() {
    return Boolean(cookieUtils.get(TOKEN_KEY));
  },

  getToken() {
    return cookieUtils.get(TOKEN_KEY);
  },

  getUser() {
    const raw = cookieUtils.get(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },
};
