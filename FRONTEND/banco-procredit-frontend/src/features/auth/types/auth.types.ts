export interface User {
  username: string;
  name: string;
}

export interface LoginRequest {
  Email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
  user: User;
}
