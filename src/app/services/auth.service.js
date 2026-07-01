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
    const errorMessages = data.errors
      ? Object.values(data.errors).flat().join(" | ")
      : data.message;
    throw new Error(errorMessages || "Registration failed");
  }

  return data;
}

export async function resendVerificationEmail(email) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/email/resend-verification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to resend verification email");
  }

  return data;
}

export async function checkEmailVerification(email) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/email/resend-verification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    },
  );

  const data = await response.json();

  // إذا الـ API أرجع أن البريد مفعّل بالفعل (status 200 مع رسالة التفعيل أو 400/409 مع رسالة "already verified")
  if (
    data.verified === true ||
    data.email_verified === true ||
    (data.message &&
      (data.message.includes("already verified") ||
        data.message.includes("مفعّل") ||
        data.message.includes("مفعل") ||
        data.message.includes("تم التحقق") ||
        data.message.includes("already been verified")))
  ) {
    return { verified: true, message: data.message };
  }

  // إذا أعاد إرسال رابط التفعيل بنجاح → يعني البريد غير مفعّل بعد
  if (response.ok) {
    return {
      verified: false,
      message: "البريد الإلكتروني غير مفعّل بعد. تم إعادة إرسال رابط التفعيل إلى بريدك.",
    };
  }

  // أي حالة خطأ أخرى
  throw new Error(data.message || "تعذر التحقق من حالة التفعيل.");
}
