"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StepperHeader from "./_components/StepperHeader/StepperHeader";
import VerifyCard from "./_components/VerifyCard/VerifyCard";
import { resendVerificationEmail, checkEmailVerification } from "../services/auth.service";

const RESEND_COOLDOWN = 60;

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [timer, setTimer] = useState(RESEND_COOLDOWN);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [verifyError, setVerifyError] = useState("");

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = useCallback(async () => {
    if (timer > 0 || isLoading || !email) return;

    setIsLoading(true);
    setError("");
    setMessage("");
    setVerifyError("");

    try {
      const data = await resendVerificationEmail(email);
      setMessage(data.message || "تم إعادة إرسال رابط التفعيل بنجاح ✅");
      setTimer(RESEND_COOLDOWN);
    } catch (err) {
      setError(err.message || "تعذر إعادة إرسال رابط التفعيل.");
    } finally {
      setIsLoading(false);
    }
  }, [timer, isLoading, email]);

  const handleVerifyClick = useCallback(async () => {
    if (isVerifying || !email) return;

    setIsVerifying(true);
    setVerifyError("");
    setError("");
    setMessage("");

    try {
      const result = await checkEmailVerification(email);

      if (result.verified) {
        // البريد مفعّل → ننقله لصفحة النجاح
        router.push(`/activation-success?email=${encodeURIComponent(email)}`);
      } else {
        // البريد غير مفعّل بعد → نظهر رسالة خطأ بالأحمر
        setVerifyError(result.message || "البريد الإلكتروني غير مفعّل بعد. يُرجى فتح بريدك والضغط على رابط التفعيل أولاً.");
      }
    } catch (err) {
      setVerifyError(err.message || "تعذر التحقق من حالة التفعيل. حاول مرة أخرى.");
    } finally {
      setIsVerifying(false);
    }
  }, [isVerifying, email, router]);

  return (
    <div
      style={{
        backgroundColor: "#f4f6fa",
        minHeight: "100vh",
        direction: "rtl",
      }}
    >
      <StepperHeader />
      <VerifyCard
        email={email}
        timer={timer}
        isLoading={isLoading}
        isVerifying={isVerifying}
        onResend={handleResend}
        onVerifyClick={handleVerifyClick}
        error={error}
        message={message}
        verifyError={verifyError}
      />
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f4f6fa",
            direction: "rtl",
            fontFamily: "sans-serif",
          }}
        >
          جاري التحميل...
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
