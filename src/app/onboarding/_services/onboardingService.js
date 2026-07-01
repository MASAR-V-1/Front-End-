// دالة إرسال البيانات إلى الـ Backend الخاص بـ Laravel
export async function submitOnboardingData(formData) {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    throw new Error("لم يتم العثور على رمز التحقق، يرجى تسجيل الدخول مجدداً.");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/organization/o`,
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

  const data = await response.json();

  if (!response.ok) {
    // إرجاع الأخطاء التفصيلية من الباك-إند إذا وجدت
    const error = new Error(data.message || "حدث خطأ أثناء إرسال البيانات.");
    error.validationErrors = data.errors || null;
    throw error;
  }

  return data;
}
