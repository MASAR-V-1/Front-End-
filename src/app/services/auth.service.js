// src/services/auth.service.js

export async function registerOrganization(payload) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/register-organization`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}
