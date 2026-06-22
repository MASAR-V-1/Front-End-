"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./register.module.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // 🌟 استيراد مكتبة الأنيميشن لحركة الدخول السلسة
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

  // المفكرة الشاملة لتخزين بيانات كل الحقول
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

  // دالة تحديث البيانات عند الكتابة في الحقول
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // الكشافات الإلكترونية (الفحص الديناميكي لمتطلبات كلمة المرور ثانية بثانية)
  const isLengthValid = formData.password.length >= 8;
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(formData.password);

  // دالة الإرسال (حارس البوابة + الانتقال الديناميكي بعد نجاح الفحص)
  const handleSubmit = (e) => {
    e.preventDefault();

    // فحص تطابق كلمات المرور
    if (formData.password !== formData.confirmPassword) {
      alert("كلمات المرور غير متطابقة!");
      return; // إيقاف الكود فوراً ومنع الإرسال للـ Back-End
    }

    console.log("البيانات الجاهزة للإرسال وبأمان إلى الـ Back-End:", formData);

    // 🚀 الحركة الديناميكية: انتقال سلس للوحة التحكم بعد نجاح العملية
    router.push("/dashboard");
  };

  return (
    // 🌟 تحويل الـ section لـ motion.section لإضافة تأثير الدخول السينمائي
    <motion.section
      className={styles.formSection}
      initial={{ opacity: 0, y: 30 }} // يبدأ الشاش شفاف ونازل لأسفل بـ 30 بكسل
      animate={{ opacity: 1, y: 0 }} // يرتفع لمكانه الطبيعي وتكتمل الشفافية
      transition={{ duration: 0.6, ease: "easeOut" }} // الحركة تستغرق 0.6 ثانية بنعومة فائقة
    >
      <form className={styles.workspaceForm} onSubmit={handleSubmit}>
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
          <button type="submit" className={styles.submitBtn}>
            <span>إنشاء مساحة العمل</span>
            <ArrowLeft size={18} />
          </button>
        </div>
      </form>
    </motion.section>
  );
}
