"use client";

import { useState } from "react";
import styles from "./register.module.css";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section className={styles.formSection}>
      <form
        className={styles.workspaceForm}
        onSubmit={(e) => e.preventDefault()}
      >
        {/* الصف الأول: اسم المؤسسة + البريد الإلكتروني للمؤسسة */}
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>اسم المؤسسة</label>
            <div className={styles.inputWrapper}>
              <input type="text" placeholder="مثال: مؤسسة الأمل" />
              <Building2 className={styles.fieldIcon} size={18} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>البريد الإلكتروني للمؤسسة</label>
            <div className={styles.inputWrapper}>
              <input type="email" placeholder="contact@organization.org" />
              <Mail className={styles.fieldIcon} size={18} />
            </div>
          </div>
        </div>

        {/* الصف الثاني: المنطقة + رقم الجوال */}
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>المنطقة</label>
            <div className={styles.inputWrapper}>
              <select defaultValue="">
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
              <input type="email" placeholder="person@gmail.com" />
              <Mail className={styles.fieldIcon} size={18} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>نوع المنظمة</label>
            <div className={styles.inputWrapper}>
              <select defaultValue="">
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

        {/* كرت متطلبات كلمة المرور الفنية */}
        <div className={styles.passwordRequirements}>
          <p className={styles.reqTitle}>متطلبات كلمة المرور:</p>
          <div className={styles.reqList}>
            <span className={`${styles.reqItem} ${styles.valid}`}>
              ✓ 8 أحرف على الأقل
            </span>
            <span className={styles.reqItem}>○ رقم واحد على الأقل</span>
            <span className={styles.reqItem}>○ حرف/رمز خاص</span>
          </div>
        </div>

        {/* خيار الموافقة على الشروط */}
        <div className={styles.termsAgreement}>
          <input type="checkbox" id="terms" className={styles.checkboxInput} />
          <label htmlFor="terms">
            {/* أوافق على <Link href="/terms">الشروط والأحكام</Link> و{" "} */}
            {/* <Link href="/privacy">سياسة الخصوصية</Link>. */}
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
    </section>
  );
}
