"use client";

import React, { useState, useEffect, Suspense } from "react"; // استيراد الـ Suspense لحماية الـ Build
import { useSearchParams } from "next/navigation";
import SuccessHeader from "./_components/SuccessHeader/SuccessHeader";
import SuccessCard from "./_components/SuccessCard/SuccessCard";

// 1. المكون الفرعي: يحتوي على منطق جلب البيانات والتصميم ليعمل بأمان من طرف العميل فقط
function ActivationSuccessContent() {
  const searchParams = useSearchParams();
  const [orgName, setOrgName] = useState("مؤسسة مَسَار الإنسانية");

  useEffect(() => {
    // جلب اسم المؤسسة ديناميكياً من الرابط إن وُجد، مثل: ?org=مؤسسة الأمل
    const org = searchParams.get("org");
    if (org) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrgName(decodeURIComponent(org));
    }
  }, [searchParams]);

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        width: "100%",
        direction: "rtl",
        fontFamily: "var(--font-cairo), Arial, sans-serif", // يعمل بشكل متناسق مع خط كايرو العام
      }}
    >
      {/* المكون الأول: الهيدر المتدرج العلوي مع الـ Stepper */}
      <SuccessHeader />

      {/* المكون الثاني: الكرت الأبيض الشامل وبداخله كرت حالة النظام والأزرار */}
      <SuccessCard organizationName={orgName} />
    </div>
  );
}

// 2. المكون الرئيسي (Default Export): يقوم بالتغليف فقط لمنع انهيار الـ SSR أثناء الـ Build
export default function ActivationSuccessPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f8fafc",
            direction: "rtl",
            fontFamily: "sans-serif",
          }}
        >
          جاري تحميل بيانات التفعيل...
        </div>
      }
    >
      <ActivationSuccessContent />
    </Suspense>
  );
}
