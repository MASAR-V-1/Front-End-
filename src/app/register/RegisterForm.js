"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./register.module.css";
import { useRouter } from "next/navigation";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

export default function RegisterForm() {
  const router = useRouter(); // تجهيز محرك الانتقال الديناميكي
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    organizationName: "",
    organizationEmail: "",
    region: "",
    phone: "",
    password: "",
    confirmPassword: "",
    personalEmail: "",
    organizationType: "",
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const isLengthValid = formData.password.length >= 8;
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(formData.password);

  // 🚀 دالة الإرسال المحدثة لربط واختبار الـ API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // تصفير أي خطأ سابق

    // 1. الفحص المحلي (Frontend Validation)
    if (formData.password !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة!");
      return;
    }

    if (!formData.agreedToTerms) {
      setError("يجب الموافقة على الشروط والأحكام للاستمرار.");
      return;
    }

    setIsLoading(true); // تشغيل مؤشر التحميل وقفل الزر

    // 2. تجميع البيانات بالصيغة القياسية (Snake_case) لتتوافق مع الـ Back-End
    const payload = {
      organization_name: formData.organizationName,
      organization_email: formData.organizationEmail,
      region: formData.region,
      phone: formData.phone,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      personal_email: formData.personalEmail,
      organization_type: formData.organizationType,
    };

    try {
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

      // 4. فحص استجابة السيرفر
      if (!response.ok) {
        // التقاط أخطاء الفاليديشين من الباك إند (مثل: الإيميل مكرر)
        throw new Error(
          data.message || "فشلت عملية التسجيل، تحقق من الحقول الكلية.",
        );
      }

      console.log("رد السيرفر بنجاح (Response):", data);

      // التوجيه المؤقت للوحة التحكم بعد نجاح العملية
      router.push("/dashboard");
    } catch (err) {
      console.error("خطأ أثناء الاتصال بالـ API:", err);
      setError(
        err.message || "تعذر الاتصال بالسيرفر، تأكد من تشغيل الباك إند.",
      );
    } finally {
      setIsLoading(false); // فك قفل الزر بعد انتهاء المحاولة
    }
  };

  return (
    <section className={styles.formSection}>
      <form className={styles.workspaceForm} onSubmit={handleSubmit}>
        {/* 🌟 عرض رسالة الخطأ للمستخدم فوق الحقول إن وجدت */}
        {error && (
          <div
            style={{
              color: "#ff4d4d",
              marginBottom: "20px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* الصف الأول: اسم المؤسسة + البريد الإلكتروني للمؤسسة */}
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>اسم المؤسسة</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="مثال: مؤسسة الأمل"
              />
              <Building2 className={styles.fieldIcon} size={18} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>البريد الإلكتروني للمؤسسة</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="organizationEmail"
                value={formData.organizationEmail}
                onChange={handleChange}
                placeholder="contact@organization.org"
              />
              <Mail className={styles.fieldIcon} size={18} />
            </div>
          </div>
        </div>

        {/* الصف الثاني: المنطقة + رقم الجوال */}
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>المنطقة</label>
            <div className={styles.inputWrapper}>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
              >
                <option value="" disabled>
                  اختر المنطقة
                </option>
                <option value="gaza">غزة</option>
                <option value="westbank">الضفة الغربية</option>
                <option value="jerusalem">القدس</option>
              </select>
              <MapPin className={styles.fieldIcon} size={18} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>رقم الجوال</label>
            <div className={styles.inputWrapper}>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+970 5X XXX XXXX"
                style={{ direction: "ltr", textAlign: "right" }}
              />
              <Phone className={styles.fieldIcon} size={18} />
            </div>
          </div>
        </div>

        {/* الصف الثالث: كلمة المرور + تأكيد كلمة المرور */}
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>كلمة المرور</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="ادخل كلمة المرور"
              />
              <Lock className={styles.fieldIcon} size={18} />
              <button
                type="button"
                className={styles.toggleVisibility}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>تأكيد كلمة المرور</label>
            <div className={styles.inputWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="أعد إدخال كلمة المرور"
              />
              <Lock className={styles.fieldIcon} size={18} />
              <button
                type="button"
                className={styles.toggleVisibility}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* الصف الرابع: البريد الإلكتروني الشخصي + نوع المنظمة */}
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>البريد الإلكتروني الشخصي</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleChange}
                placeholder="person@gmail.com"
              />
              <Mail className={styles.fieldIcon} size={18} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>نوع المنظمة</label>
            <div className={styles.inputWrapper}>
              <select
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
              >
                <option value="" disabled>
                  اختر نوع المنظمة
                </option>
                <option value="ngo">منظمة غير حكومية (NGO)</option>
                <option value="company">شركة خاصة</option>
                <option value="gov">مؤسسة حكومية</option>
              </select>
              <MapPin className={styles.fieldIcon} size={18} />
            </div>
          </div>
        </div>

        {/* كرت متطلبات كلمة المرور المربوط ديناميكياً بالحالة */}
        <div className={styles.passwordRequirements}>
          <p className={styles.reqTitle}>متطلبات كلمة المرور:</p>
          <div className={styles.reqList}>
            <span
              className={`${styles.reqItem} ${isLengthValid ? styles.valid : ""}`}
            >
              {isLengthValid ? "✓" : "○"} 8 أحرف على الأقل
            </span>
            <span
              className={`${styles.reqItem} ${hasNumber ? styles.valid : ""}`}
            >
              {hasNumber ? "✓" : "○"} رقم واحد على الأقل
            </span>
            <span
              className={`${styles.reqItem} ${hasSpecialChar ? styles.valid : ""}`}
            >
              {hasSpecialChar ? "✓" : "○"} حرف/رمز خاص
            </span>
          </div>
        </div>

        {/* خيار الموافقة على الشروط */}
        <div className={styles.termsAgreement}>
          <input
            type="checkbox"
            id="terms"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className={styles.checkboxInput}
          />
          <label htmlFor="terms">
            أوافق على <Link href="/terms">الشروط والأحكام</Link> و{" "}
            <Link href="/privacy">سياسة الخصوصية</Link>.
          </label>
        </div>

        {/* زر الإرسال الرئيسي */}
        <div className={styles.submitContainer}>
          {/* 🌟 تعطيل الزر وتغيير النص ديناميكياً لحماية الطلبات */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            <span>
              {isLoading ? "جاري إنشاء مساحة العمل..." : "إنشاء مساحة العمل"}
            </span>
            {!isLoading && <ArrowLeft size={18} />}
          </button>
        </div>
      </form>
    </section>
  );
}
