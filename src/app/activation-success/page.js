"use client";

import React from "react";
import SuccessHeader from "./_components/SuccessHeader/SuccessHeader";

export default function ActivationSuccessPage() {
  return (
    <div
      style={{
        backgroundColor: "#f4f6fa",
        minHeight: "100vh",
        direction: "rtl",
      }}
    >
      {/* استدعاء المكون لرؤيته فوراً */}
      <SuccessHeader />

      {/* مكان البطاقة البيضاء القادمة */}
      <div style={{ textAlign: "center", marginTop: "50px", color: "#64748b" }}>
        [جاري تجهيز بطاقة النجاح وحالة النظام...]
      </div>
    </div>
  );
}
