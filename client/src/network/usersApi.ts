import { fetchData } from "../utils/fetchData";
import { User, SignUpCredentials, LoginCredentials } from "../types";

export async function getLoggedUser(): Promise<User> {
  const response = await fetchData("http://api:3000/api/users", {
    method: "GET",
  });
  return response.json();
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("/api/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function logout(): Promise<void> {
  await fetchData("/api/users/logout", { method: "POST" });
}
