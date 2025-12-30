"use server";

import { cookies } from "next/headers";
import { getUserByEmail } from "./utils/helpers";
import { User } from "./types";
interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
}

export async function signIn(
  email: string,
  password: string
): Promise<AuthResponse> {
  const user = getUserByEmail(email);

  if (!user) {
    return { success: false, message: "User not found" };
  }

  if (user.password !== password) {
    return { success: false, message: "Invalid password" };
  }

  // Set session cookie
  const cookieStore = await cookies();
  cookieStore.set("user_id", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return { success: true, user };
}

export async function signUp(
  email: string,
  password: string,
  name: string,
  role: "patient" | "doctor"
): Promise<AuthResponse> {
  const existingUser = getUserByEmail(email);

  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  // In a real app, you would create the user in the database
  // For now, we'll just return success
  return { success: true, message: "User created successfully" };
}

export async function signOut(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("user_id");
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    return null;
  }

  const { getUserById } = await import("./utils/helpers");
  const user = getUserById(userId);

  return user || null;
}
