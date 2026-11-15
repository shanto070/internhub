
const API_BASE_URL =
  process.env.NEXT_PUBLIC_FASTAPI_URL || "http://127.0.0.1:8000";

export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  is_active: boolean;
  role: string;
};

export async function registerUser(userData: {
  name: string;
  email: string;
  age: number;
  password: string;
}): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof data.detail === "string"
        ? data.detail
        : "Registration failed. Please check your information."
    );
  }

  return data;
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<string> {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Invalid email or password.");
  }

  return data.access_token;
}

export async function getUsers(token: string): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch users.");
  }

  return data;
}
