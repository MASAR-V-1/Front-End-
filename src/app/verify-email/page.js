"use client";

import React from "react";
import StepperHeader from "./components/StepperHeader/StepperHeader";
import styles from "./verify.module.css"; // الستايل الخارجي الكلي للشاشة (فاضي حالياً)
import VerifyCard from "./components/VerifyCard/VerifyCard";

export default function VerifyEmailPage() {
  return (
    <div
      style={{
        backgroundColor: "#f4f6fa",
        minHeight: "100vh",
        direction: "rtl",
      }}
    >
      {/* استدعاء مكون الهيدر الذي صممناه */}
      <StepperHeader />

      {/* هنا بكون مكان الكرت الأبيض السفلي بس نجهزه */}
      <VerifyCard />
    </div>
  );
}
