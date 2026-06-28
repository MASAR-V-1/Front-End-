"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SuccessHeader from "./_components/SuccessHeader/SuccessHeader";
import SuccessCard from "./_components/SuccessCard/SuccessCard";

export default function ActivationSuccessPage() {
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
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* 1. المكون الأول: الهيدر المتدرج العلوي مع الـ Stepper */}
      <SuccessHeader />

      {/* 2. المكون الثاني: الكرت الأبيض الشامل وبداخله كرت حالة النظام والأزرار */}
      <SuccessCard organizationName={orgName} />
    </div>
  );
}
