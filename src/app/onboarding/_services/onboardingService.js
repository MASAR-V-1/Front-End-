// دالة إرسال البيانات إلى الـ Backend الخاص بـ Laravel
export async function submitOnboardingData(formData) {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    throw new Error("لم يتم العثور على رمز التحقق، يرجى تسجيل الدخول مجدداً.");
  }

  const response = await fetch(
    "https://api.masar.org/v1/organization/onboarding",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "حدث خطأ أثناء إرسال البيانات.");
  }

  return await response.json();
}
