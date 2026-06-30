import { NextResponse } from "next/server";

export function middleware(request) {
  // 1. جلب التوكن وحالة الحساب (يفضل حفظ حالة الـ onboarding في الكوكيز عند الـ login والـ submit)
  const token = request.cookies.get("auth_token")?.value;
  const onboardingStatus = request.cookies.get("onboarding_status")?.value; // قيم محتملة: 'completed', 'pending_approval'

  const { pathname } = request.nextUrl;

  // الحماية أ: إذا حاول دخول لوحة التحكم وهو قيد الانتظار، ارجعه لصفحة الانتظار فوراً
  if (token && onboardingStatus === "pending_approval") {
    if (pathname.startsWith("/dashboard") || pathname === "/onboarding") {
      return NextResponse.redirect(
        new URL("/onboarding/waiting-approval", request.url),
      );
    }
  }

  // الحماية ب: إذا وافق الإدارة وأصبح 'completed'، واجهته حاول دخول صفحة الانتظار، وجهه للوحة التحكم
  if (
    token &&
    onboardingStatus === "completed" &&
    pathname.startsWith("/onboarding")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// تشغيل الفحص على المسارات الحساسة فقط
export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*"],
};
