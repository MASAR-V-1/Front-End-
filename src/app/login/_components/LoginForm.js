"use client";

import React, { useState } from "react";
import { Eye, EyeOff, LogIn, Info } from "lucide-react";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا سيتم ربط السيستم مع الـ API الخاص بـ Laravel لاحقاً يا هندسة
    console.log("Logging in with:", { email, password, rememberMe });
  };

  return (
    <div className={styles.formWrapper}>
      {/* العناوين التوضيحية */}
      <h2 className={styles.formTitle}>تسجيل الدخول</h2>
      <p className={styles.formSubtitle}>
        أدخل بيانات حسابك للوصول إلى مساحة عمل مؤسستك.
      </p>

      <form onSubmit={handleSubmit} className={styles.mainForm}>
        {/* حقل البريد الإلكتروني */}
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>البريد الإلكتروني</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@organization.org"
            className={styles.textInput}
            required
          />
        </div>

        {/* حقل كلمة المرور */}
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>كلمة المرور</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              className={styles.passwordInput}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.eyeButton}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* سطر التحكم الخيارات التفاعلية */}
        <div className={styles.controlsRow}>
          {/* نسيت كلمة المرور */}
          <a href="/forgot-password" className={styles.forgotLink}>
            نسيت كلمة المرور؟
          </a>

          {/* تذكرني Checkbox */}
          <label className={styles.rememberLabel}>
            <span>تذكرني</span>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className={styles.checkboxInput}
            />
          </label>
        </div>

        {/* زر تسجيل الدخول الرئيسي */}
        <button type="submit" className={styles.submitBtn}>
          <span>تسجيل الدخول</span>
          <LogIn size={18} />
        </button>
      </form>

      {/* الملاحظة التوجيهية السفلية */}
      <p className={styles.footerNote}>
        ليس لديك صلاحية دخول؟ تواصل مع مدير المؤسسة لإضافتك إلى مساحة العمل.
      </p>

      {/* صندوق التنبيه البنفسجي اللافندر الصغير */}
      <div className={styles.alertBox}>
        <div className={styles.alertText}>
          يتم منح الصلاحيات وإدارة الحسابات من خلال مدير المؤسسة.
        </div>
        <Info size={16} className={styles.alertIcon} />
      </div>
    </div>
  );
}
