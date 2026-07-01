"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./register.module.css";
import { useRouter } from "next/navigation";
import { registerOrganization } from "../services/auth.service";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  X,
  Loader2,
} from "lucide-react";

const FIELD_MAP = {
  organization_name: "organizationName",
  organization_email: "organizationEmail",
  admin_email: "personalEmail",
  region: "region",
  phone: "phone",
  admin_password: "password",
  admin_password_confirmation: "confirmPassword",
  organization_type: "organizationType",
  agreed_to_terms: "agreedToTerms",
};

const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "yandex.com",
  "protonmail.com",
  "zoho.com",
  "gmx.com",
  "msn.com",
  "me.com",
  "mac.com",
  "proton.me",
  "ymail.com",
  "yahoo.co.uk",
  "hotmail.co.uk",
];

const FieldError = ({ fieldErrors, fieldName }) => {
  if (!fieldErrors[fieldName]) return null;
  return (
    <div className={styles.fieldError}>
      <AlertTriangle size={13} />
      <span>{fieldErrors[fieldName]}</span>
    </div>
  );
};

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

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

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    const savedData = sessionStorage.getItem("registerFormData");
    if (savedData) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error("Error loading saved data", e);
      }
    }

    if (sessionStorage.getItem("registrationCompleted") === "true") {
      setHasRegistered(true);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      sessionStorage.setItem("registerFormData", JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const isLengthValid = formData.password.length >= 8;
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(formData.password);

  const clearErrors = () => {
    setGeneralError("");
    setFieldErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    const localErrors = {};

    if (!formData.organizationName.trim()) {
      localErrors.organizationName = "اسم المؤسسة مطلوب";
    }

    if (!formData.phone.trim()) {
      localErrors.phone = "رقم الجوال مطلوب";
    } else if (!/^\+970 5[0-9] [0-9]{3} [0-9]{4}$/.test(formData.phone)) {
      localErrors.phone = "رقم الجوال يجب أن يكون بصيغة +970 5X XXX XXXX";
    }

    if (!formData.organizationEmail.trim()) {
      localErrors.organizationEmail = "البريد الإلكتروني للمؤسسة مطلوب";
    } else {
      const emailDomain = formData.organizationEmail
        .split("@")[1]
        ?.toLowerCase();
      if (FREE_EMAIL_DOMAINS.includes(emailDomain)) {
        localErrors.organizationEmail =
          "يرجى استخدام بريد مؤسسة رسمي (غير مسموح ببريد مجاني مثل Gmail/Yahoo)";
      }
    }

    if (!formData.personalEmail.trim()) {
      localErrors.personalEmail = "البريد الإلكتروني الشخصي مطلوب";
    }
    if (!formData.password) {
      localErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 8) {
      localErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    }
    if (formData.password !== formData.confirmPassword) {
      localErrors.confirmPassword = "كلمات المرور غير متطابقة";
    }
    if (!formData.agreedToTerms) {
      localErrors.agreedToTerms = "يجب الموافقة على الشروط والأحكام للاستمرار";
    }

    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      setGeneralError(
        `يوجد ${Object.keys(localErrors).length} ${Object.keys(localErrors).length === 1 ? "خطأ" : "أخطاء"} في النموذج، يرجى تصحيحها.`,
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsLoading(true);

    const payload = {
      organization_name: formData.organizationName,
      organization_email: formData.organizationEmail,
      admin_email: formData.personalEmail,
      region: formData.region,
      phone: formData.phone,
      admin_password: formData.password,
      admin_password_confirmation: formData.confirmPassword,
      organization_type: formData.organizationType,
      agreed_to_terms: formData.agreedToTerms,
    };

    try {
      const data = await registerOrganization(payload);
      console.log("رد السيرفر بنجاح (Response):", data);

      sessionStorage.setItem("registrationCompleted", "true");

      router.push(
        `/verify-email?email=${encodeURIComponent(formData.personalEmail)}`,
      );
    } catch (err) {
      console.error("خطأ أثناء الاتصال بالـ API:", err);
      parseBackendErrors(err);
    } finally {
      setIsLoading(false);
    }
  };

  const parseBackendErrors = (err) => {
    const errorMessage = err.message || "";

    if (errorMessage.includes(" | ")) {
      const errorParts = errorMessage.split(" | ");
      const mappedErrors = {};
      let unmappedErrors = [];

      errorParts.forEach((errMsg) => {
        let matched = false;
        for (const [backendKey, frontendKey] of Object.entries(FIELD_MAP)) {
          const arabicFieldNames = getArabicFieldKeywords(backendKey);
          if (arabicFieldNames.some((keyword) => errMsg.includes(keyword))) {
            mappedErrors[frontendKey] = errMsg;
            matched = true;
            break;
          }
        }
        if (!matched) {
          unmappedErrors.push(errMsg);
        }
      });

      if (Object.keys(mappedErrors).length > 0) {
        setFieldErrors(mappedErrors);
      }

      const totalErrors =
        Object.keys(mappedErrors).length + unmappedErrors.length;
      if (unmappedErrors.length > 0) {
        setGeneralError(unmappedErrors.join(" • "));
      } else {
        setGeneralError(
          `يوجد ${totalErrors} ${totalErrors === 1 ? "خطأ" : "أخطاء"} في النموذج، يرجى تصحيحها.`,
        );
      }
    } else {
      setGeneralError(
        errorMessage || "تعذر الاتصال بالسيرفر، تأكد من تشغيل الباك إند.",
      );
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getArabicFieldKeywords = (backendKey) => {
    const keywordMap = {
      organization_name: [
        "اسم المنظمة",
        "اسم المؤسسة",
        "organization_name",
        "organization name",
      ],
      organization_email: [
        "البريد الإلكتروني للمنظمة",
        "البريد الإلكتروني للمؤسسة",
        "بريد المنظمة",
        "بريد المؤسسة",
        "organization_email",
        "organization email",
      ],
      admin_email: [
        "البريد الإلكتروني للمدير",
        "بريد المدير",
        "admin_email",
        "admin email",
      ],
      admin_password: [
        "كلمة المرور",
        "كلمة السر",
        "admin_password",
        "admin password",
      ],
      admin_password_confirmation: [
        "تأكيد كلمة المرور",
        "تأكيد كلمة السر",
        "admin_password_confirmation",
      ],
      region: ["المنطقة", "region"],
      phone: ["الجوال", "الهاتف", "phone"],
      organization_type: ["نوع المنظمة", "نوع المؤسسة", "organization_type"],
      agreed_to_terms: ["الشروط", "الموافقة", "agreed_to_terms"],
    };
    return keywordMap[backendKey] || [backendKey];
  };

  return (
    <section className={styles.formSection}>
      <form className={styles.workspaceForm} onSubmit={handleSubmit}>
        {generalError && (
          <div className={styles.errorBanner}>
            <div className={styles.errorBannerContent}>
              <div className={styles.errorBannerIcon}>
                <AlertTriangle size={20} />
              </div>
              <div className={styles.errorBannerText}>
                <p className={styles.errorBannerTitle}>تنبيه</p>
                <p className={styles.errorBannerMessage}>{generalError}</p>
              </div>
            </div>
            <button
              type="button"
              className={styles.errorBannerClose}
              onClick={clearErrors}
              aria-label="إغلاق"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>اسم المؤسسة</label>
            <div
              className={`${styles.inputWrapper} ${fieldErrors.organizationName ? styles.inputError : ""}`}
            >
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="مثال: مؤسسة الأمل"
              />
              <Building2 className={styles.fieldIcon} size={18} />
            </div>
            <FieldError
              fieldErrors={fieldErrors}
              fieldName="organizationName"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>البريد الإلكتروني للمؤسسة</label>
            <div
              className={`${styles.inputWrapper} ${fieldErrors.organizationEmail ? styles.inputError : ""}`}
            >
              <input
                type="email"
                name="organizationEmail"
                value={formData.organizationEmail}
                onChange={handleChange}
                placeholder="contact@organization.org"
              />
              <Mail className={styles.fieldIcon} size={18} />
            </div>
            <FieldError
              fieldErrors={fieldErrors}
              fieldName="organizationEmail"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>المنطقة</label>
            <div
              className={`${styles.inputWrapper} ${fieldErrors.region ? styles.inputError : ""}`}
            >
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
            <FieldError fieldErrors={fieldErrors} fieldName="region" />
          </div>
          <div className={styles.inputGroup}>
            <label>رقم الجوال</label>
            <div
              className={`${styles.inputWrapper} ${fieldErrors.phone ? styles.inputError : ""}`}
            >
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
            <FieldError fieldErrors={fieldErrors} fieldName="phone" />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>كلمة المرور</label>
            <div
              className={`${styles.inputWrapper} ${fieldErrors.password ? styles.inputError : ""}`}
            >
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
            <FieldError fieldErrors={fieldErrors} fieldName="password" />
          </div>
          <div className={styles.inputGroup}>
            <label>تأكيد كلمة المرور</label>
            <div
              className={`${styles.inputWrapper} ${fieldErrors.confirmPassword ? styles.inputError : ""}`}
            >
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
            <FieldError fieldErrors={fieldErrors} fieldName="confirmPassword" />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>البريد الإلكتروني الشخصي</label>
            <div
              className={`${styles.inputWrapper} ${fieldErrors.personalEmail ? styles.inputError : ""}`}
            >
              <input
                type="email"
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleChange}
                placeholder="person@gmail.com"
              />
              <Mail className={styles.fieldIcon} size={18} />
            </div>
            <FieldError fieldErrors={fieldErrors} fieldName="personalEmail" />
          </div>
          <div className={styles.inputGroup}>
            <label>نوع المنظمة</label>
            <div
              className={`${styles.inputWrapper} ${fieldErrors.organizationType ? styles.inputError : ""}`}
            >
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
            <FieldError
              fieldErrors={fieldErrors}
              fieldName="organizationType"
            />
          </div>
        </div>

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

        <div
          className={`${styles.termsAgreement} ${fieldErrors.agreedToTerms ? styles.termsError : ""}`}
        >
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
        <FieldError fieldErrors={fieldErrors} fieldName="agreedToTerms" />

        <div className={styles.submitContainer}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            <span>
              {isLoading ? "جاري إنشاء مساحة العمل..." : "إنشاء مساحة العمل"}
            </span>
            {isLoading ? (
              <Loader2 size={18} className={styles.spinnerIcon} />
            ) : (
              <ArrowLeft size={18} />
            )}
          </button>

          {hasRegistered && formData.personalEmail && isLoaded && (
            <Link
              href={`/verify-email?email=${encodeURIComponent(
                formData.personalEmail,
              )}`}
              className={styles.backToVerifyLink}
            >
              <ArrowRight size={18} />
              <span>العودة لصفحة التفعيل</span>
            </Link>
          )}
        </div>
      </form>
    </section>
  );
}
