export interface User {
  id?: number | string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'Admin' | 'User' | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  expiresAt?: string;
  expiresAtUtc?: string;
  refreshToken?: string;
  refreshTokenExpiresAtUtc?: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChangePasswordRequest {
  oldPassword?: string;
  newPassword: string;
  confirmPassword: string;
  token?: string | null;
}

