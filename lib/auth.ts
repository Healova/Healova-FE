"use server";

import { cookies } from "next/headers";
import { User } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

async function apiRequest(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}

export async function signIn(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (result.success && result.user) {
      const cookieStore = await cookies();
      cookieStore.set("user_id", result.user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      if (result.token) {
        // Store token in non-httpOnly cookie so it can be accessed by client-side JavaScript for API calls
        cookieStore.set("auth_token", result.token, {
          httpOnly: false, // Must be false for client-side API calls
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
      }
    }

    return result;
  } catch (error) {
    console.error("Sign in error:", error);
    return { success: false, message: "An error occurred during sign in" };
  }
}

export async function signUp(
  email: string,
  password: string,
  name: string,
  role: "patient" | "doctor",
  phone?: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, role, phone }),
    });

    const result = await response.json();

    if (result.success && result.user) {
      const cookieStore = await cookies();
      cookieStore.set("user_id", result.user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      if (result.token) {
        // Store token in non-httpOnly cookie so it can be accessed by client-side JavaScript for API calls
        cookieStore.set("auth_token", result.token, {
          httpOnly: false, // Must be false for client-side API calls
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
      }
    }

    return result;
  } catch (error) {
    console.error("Sign up error:", error);
    return { success: false, message: "An error occurred during sign up" };
  }
}

export async function signOut(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("user_id");
  cookieStore.delete("auth_token");
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    const response = await apiRequest("/auth/me");

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success ? data.user : null;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}
