import axios from "axios";

export type UserProgress = {
  xp: number;
  score: number;
  completedLessons: number;
  hasChallengeDone: boolean;
  hasQuizDone: boolean;
};

type User = {
  id: number;
  fullName: string;
  username: string;
};

type AuthResponse = {
  token: string;
  user: User;
  progress: UserProgress;
};

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080/api").replace(/\/$/, "");
const TOKEN_KEY = "flowplay_token";

const Api = axios.create({ baseURL: API_URL });
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error || "Server tidak dapat memproses permintaan.");
  }
  return body as T;
}

export const flowPlayApi = {
  register(fullName: string, username: string, password: string) {
    return request<{ message: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullName, username, password }),
    });
  },

  async login(username: string, password: string) {
    const result = await request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    localStorage.setItem(TOKEN_KEY, result.token);
    localStorage.setItem("flowplay_user", JSON.stringify(result.user));
    return result;
  },

  updateProgress(progress: UserProgress) {
    return request<{ progress: UserProgress }>("/progress", {
      method: "PUT",
      body: JSON.stringify(progress),
    });
  },

  updateUsername(username: string) {
    return request<{ user: User }>("/profile", {
      method: "PATCH",
      body: JSON.stringify({ username }),
    });
  },

  hasSession() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },
};

export default Api;
