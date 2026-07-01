"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Upload, X, FileText, Loader2 } from "lucide-react";
import { submitOnboardingData } from "../_services/onboardingService";
import styles from "./OrganizationForm.module.css";

// قائمة مجالات العمل المتاحة
const AVAILABLE_SECTORS = [
  { id: "relief", label: "الإغاثة العاجلة" },
  { id: "education", label: "التعليم" },
  { id: "health", label: "الرعاية الصحية" },
  { id: "housing", label: "الإسكان" },
  { id: "water", label: "المياه والصرف الصحي" },
  { id: "protection", label: "الحماية" },
  { id: "food", label: "الأمن الغذائي" },
  { id: "livelihood", label: "سبل العيش" },
];

// الحقول المطلوبة وأسماؤها بالعربي
const REQUIRED_FIELDS = {
  orgName: "اسم المنظمة",
  orgType: "نوع المنظمة",
  regNumber: "رقم التسجيل / الترخيص",
  country: "الدولة",
  phone: "رقم الهاتف",
  email: "البريد الإلكتروني الرسمي",
  managerName: "اسم مسؤول التواصل",
  managerRole: "المسمى الوظيفي",
  managerEmail: "البريد الإلكتروني لمسؤول التواصل",
  managerPhone: "رقم جوال مسؤول التواصل",
};

const DRAFT_STORAGE_KEY = "onboardingDraft";

export default function OrganizationForm({ onProgressUpdate }) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    orgName: "",
    orgType: "",
    regNumber: "",
    country: "",
    phone: "",
    email: "",
    address: "",
    sectors: [],
    size: "",
    volunteers: "",
    experience: "",
    managerName: "",
    managerRole: "",
    managerEmail: "",
    managerPhone: "",
    notes: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- تحميل البيانات المحفوظة عند فتح الصفحة ---
  useEffect(() => {
    let initialData = { ...formData };

    // 1. محاولة تحميل المسودة المحفوظة أولاً
    try {
      const draftData = sessionStorage.getItem(DRAFT_STORAGE_KEY);
      if (draftData) {
        const parsed = JSON.parse(draftData);
        initialData = { ...initialData, ...parsed };
      }
    } catch (e) {
      console.error("Error loading draft", e);
    }

    // 2. تحميل بيانات التسجيل وتعبئة الحقول المتطابقة (إذا لم تكن المسودة تحتويها)
    try {
      const regData = sessionStorage.getItem("registerFormData");
      if (regData) {
        const parsed = JSON.parse(regData);
        // فقط نعبّئ الحقول الفارغة من بيانات التسجيل
        if (!initialData.orgName && parsed.organizationName) {
          initialData.orgName = parsed.organizationName;
        }
        if (!initialData.email && parsed.organizationEmail) {
          initialData.email = parsed.organizationEmail;
        }
        if (!initialData.phone && parsed.phone) {
          initialData.phone = parsed.phone;
        }
        if (!initialData.orgType && parsed.organizationType) {
          // تحويل قيمة نوع المنظمة من التسجيل للقيمة المتوافقة
          const typeMap = { ngo: "NGO", company: "Company", gov: "Gov" };
          initialData.orgType = typeMap[parsed.organizationType] || parsed.organizationType;
        }
        // تعبئة بيانات مسؤول التواصل من بيانات المسؤول
        if (!initialData.managerEmail && parsed.personalEmail) {
          initialData.managerEmail = parsed.personalEmail;
        }
      }
    } catch (e) {
      console.error("Error loading registration data", e);
    }

    setFormData(initialData);
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- تحديث نسبة الإكمال عند تغيير البيانات ---
  useEffect(() => {
    if (isLoaded && onProgressUpdate) {
      onProgressUpdate(formData);
    }
  }, [formData, isLoaded, onProgressUpdate]);

  // --- دالة تحديث الحقول ---
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // مسح الخطأ الخاص بالحقل عند الكتابة فيه
    setFieldErrors((prev) => {
      if (prev[name]) {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      }
      return prev;
    });
  }, []);

  // --- دالة تبديل مجال العمل (toggle) ---
  const handleToggleSector = useCallback((sectorId) => {
    setFormData((prev) => {
      const newSectors = prev.sectors.includes(sectorId)
        ? prev.sectors.filter((s) => s !== sectorId)
        : [...prev.sectors, sectorId];
      return { ...prev, sectors: newSectors };
    });
  }, []);

  // --- دالة التحقق (Validation) ---
  const validateForm = useCallback(() => {
    const errors = {};

    Object.entries(REQUIRED_FIELDS).forEach(([key, label]) => {
      const value = formData[key];
      if (!value || String(value).trim() === "") {
        errors[key] = `${label} مطلوب`;
      }
    });

    // تحقق من صيغة البريد الإلكتروني
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "يرجى إدخال بريد إلكتروني صالح";
    }
    if (formData.managerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.managerEmail)) {
      errors.managerEmail = "يرجى إدخال بريد إلكتروني صالح";
    }

    return errors;
  }, [formData]);

  // --- دالة رفع الملفات ---
  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const validFiles = [];
    const errors = [];

    files.forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: نوع الملف غير مدعوم`);
      } else if (file.size > maxSize) {
        errors.push(`${file.name}: حجم الملف يتجاوز 5MB`);
      } else {
        validFiles.push({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          size: (file.size / 1024).toFixed(1) + " KB",
          type: file.type,
        });
      }
    });

    if (errors.length > 0) {
      setGeneralError(errors.join(" • "));
      setTimeout(() => setGeneralError(""), 5000);
    }

    setUploadedFiles((prev) => [...prev, ...validFiles]);

    // مسح الـ input حتى يمكن رفع نفس الملف مرة أخرى
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // --- دالة حذف ملف ---
  const handleRemoveFile = useCallback((fileId) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, []);

  // --- دالة حفظ المسودة ---
  const handleSaveDraft = useCallback(() => {
    setIsSavingDraft(true);
    try {
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
      setSuccessMessage("تم حفظ المسودة بنجاح ✅");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (e) {
      setGeneralError("تعذر حفظ المسودة.");
    } finally {
      setTimeout(() => setIsSavingDraft(false), 500);
    }
  }, [formData]);

  // --- دالة الإرسال ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setSuccessMessage("");
    setFieldErrors({});

    // التحقق من الحقول
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setGeneralError(
        `يوجد ${Object.keys(errors).length} ${Object.keys(errors).length === 1 ? "حقل مطلوب" : "حقول مطلوبة"} لم يتم تعبئتها.`
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        organization_name: formData.orgName,
        organization_type: formData.orgType,
        registration_number: formData.regNumber,
        country: formData.country,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        sectors: formData.sectors,
        organization_size: formData.size,
        volunteers_count: formData.volunteers,
        years_of_experience: formData.experience,
        contact_person_name: formData.managerName,
        contact_person_role: formData.managerRole,
        contact_person_email: formData.managerEmail,
        contact_person_phone: formData.managerPhone,
        notes: formData.notes,
      };

      await submitOnboardingData(payload);

      // مسح المسودة بعد الإرسال الناجح
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);

      setSuccessMessage("تم إرسال بيانات المنظمة بنجاح! جاري التحويل...");

      setTimeout(() => {
        router.push("/onboarding/waiting-approval");
      }, 1500);
    } catch (err) {
      // معالجة أخطاء الـ validation من الباك-إند
      if (err.validationErrors) {
        const backendErrors = {};
        Object.entries(err.validationErrors).forEach(([key, messages]) => {
          const msg = Array.isArray(messages) ? messages[0] : messages;
          backendErrors[key] = msg;
        });
        setFieldErrors(backendErrors);
      }
      setGeneralError(err.message || "حدث خطأ أثناء إرسال البيانات.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsLoading(false);
    }
  };

  // --- مكون رسالة الخطأ لكل حقل ---
  const FieldError = ({ fieldName }) => {
    if (!fieldErrors[fieldName]) return null;
    return (
      <div className={styles.fieldError}>
        <AlertTriangle size={13} />
        <span>{fieldErrors[fieldName]}</span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {/* رسالة الخطأ العامة */}
      {generalError && (
        <div className={styles.errorAlert}>
          <div className={styles.errorAlertContent}>
            <AlertTriangle size={18} />
            <span>{generalError}</span>
          </div>
          <button
            type="button"
            className={styles.errorAlertClose}
            onClick={() => setGeneralError("")}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* رسالة النجاح */}
      {successMessage && (
        <div className={styles.successAlert}>
          <span>{successMessage}</span>
        </div>
      )}

      {/* 1. البيانات الأساسية */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>البيانات الأساسية</h3>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              اسم المنظمة (بالعربية) <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="orgName"
              value={formData.orgName}
              onChange={handleChange}
              placeholder="مثال: مؤسسة الأمل للتنمية"
              className={fieldErrors.orgName ? styles.inputError : ""}
            />
            <FieldError fieldName="orgName" />
          </div>
          <div className={styles.field}>
            <label>
              نوع المنظمة <span className={styles.required}>*</span>
            </label>
            <select
              name="orgType"
              value={formData.orgType}
              onChange={handleChange}
              className={fieldErrors.orgType ? styles.inputError : ""}
            >
              <option value="" disabled>اختر نوع المنظمة</option>
              <option value="NGO">مؤسسة غير ربحية (NGO)</option>
              <option value="Gov">جهة حكومية</option>
              <option value="Company">شركة خاصة</option>
              <option value="INGO">منظمة دولية (INGO)</option>
            </select>
            <FieldError fieldName="orgType" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              رقم التسجيل / الترخيص <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="regNumber"
              value={formData.regNumber}
              onChange={handleChange}
              placeholder="مثال: REG-2024-1234"
              className={fieldErrors.regNumber ? styles.inputError : ""}
            />
            <FieldError fieldName="regNumber" />
          </div>
          <div className={styles.field}>
            <label>
              الدولة <span className={styles.required}>*</span>
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={fieldErrors.country ? styles.inputError : ""}
            >
              <option value="" disabled>اختر الدولة</option>
              <option value="PS">فلسطين</option>
              <option value="SA">المملكة العربية السعودية</option>
              <option value="JO">الأردن</option>
              <option value="EG">مصر</option>
              <option value="LB">لبنان</option>
              <option value="IQ">العراق</option>
              <option value="SY">سوريا</option>
              <option value="YE">اليمن</option>
              <option value="AE">الإمارات</option>
              <option value="QA">قطر</option>
              <option value="KW">الكويت</option>
              <option value="OM">عمان</option>
              <option value="BH">البحرين</option>
              <option value="SD">السودان</option>
              <option value="LY">ليبيا</option>
              <option value="TN">تونس</option>
              <option value="DZ">الجزائر</option>
              <option value="MA">المغرب</option>
              <option value="TR">تركيا</option>
            </select>
            <FieldError fieldName="country" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              البريد الإلكتروني الرسمي{" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@organization.org"
              className={fieldErrors.email ? styles.inputError : ""}
            />
            <FieldError fieldName="email" />
          </div>
          <div className={styles.field}>
            <label>
              رقم الهاتف <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+970 5X XXX XXXX"
              style={{ direction: "ltr", textAlign: "right" }}
              className={fieldErrors.phone ? styles.inputError : ""}
            />
            <FieldError fieldName="phone" />
          </div>
        </div>

        <div className={styles.field}>
          <label>العنوان الرئيسي</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="مثال: غزة، حي الرمال، شارع الوحدة"
          />
        </div>
      </section>

      {/* 2. مجالات العمل وحجم المنظمة */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>مجالات العمل</h3>
        <p className={styles.subLabel}>مجالات العمل الرئيسية (اختر ما ينطبق)</p>
        <div className={styles.tagsContainer}>
          {AVAILABLE_SECTORS.map((sector) => (
            <span
              key={sector.id}
              className={`${styles.tag} ${
                formData.sectors.includes(sector.id) ? styles.activeTag : ""
              }`}
              onClick={() => handleToggleSector(sector.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleToggleSector(sector.id);
                }
              }}
            >
              {formData.sectors.includes(sector.id) ? "✓ " : ""}
              {sector.label}
            </span>
          ))}
        </div>

        <div className={styles.row} style={{ marginTop: "20px" }}>
          <div className={styles.field}>
            <label>حجم المنظمة</label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
            >
              <option value="" disabled>اختر حجم المنظمة</option>
              <option value="micro">صغيرة جداً (أقل من 10 موظفين)</option>
              <option value="small">صغيرة (10-50 موظف)</option>
              <option value="medium">متوسطة (50-200 موظف)</option>
              <option value="large">كبيرة (أكثر من 200 موظف)</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>عدد المتطوعين النشطين</label>
            <input
              type="number"
              name="volunteers"
              value={formData.volunteers}
              onChange={handleChange}
              placeholder="مثال: 50"
              min="0"
            />
          </div>
          <div className={styles.field}>
            <label>سنوات الخبرة</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="مثال: 5"
              min="0"
            />
          </div>
        </div>
      </section>

      {/* 3. مسؤول التواصل الرئيسي */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>مسؤول التواصل الرئيسي</h3>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              الاسم الكامل <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="managerName"
              value={formData.managerName}
              onChange={handleChange}
              placeholder="اسم المسؤول"
              className={fieldErrors.managerName ? styles.inputError : ""}
            />
            <FieldError fieldName="managerName" />
          </div>
          <div className={styles.field}>
            <label>
              المسمى الوظيفي <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="managerRole"
              value={formData.managerRole}
              onChange={handleChange}
              placeholder="مثال: مدير العمليات"
              className={fieldErrors.managerRole ? styles.inputError : ""}
            />
            <FieldError fieldName="managerRole" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              البريد الإلكتروني <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              name="managerEmail"
              value={formData.managerEmail}
              onChange={handleChange}
              placeholder="contact@org.com"
              className={fieldErrors.managerEmail ? styles.inputError : ""}
            />
            <FieldError fieldName="managerEmail" />
          </div>
          <div className={styles.field}>
            <label>
              رقم الجوال <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="managerPhone"
              value={formData.managerPhone}
              onChange={handleChange}
              placeholder="+970 5X XXX XXXX"
              style={{ direction: "ltr", textAlign: "right" }}
              className={fieldErrors.managerPhone ? styles.inputError : ""}
            />
            <FieldError fieldName="managerPhone" />
          </div>
        </div>
      </section>

      {/* 4. معلومات التحقق والوثائق */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          معلومات التحقق والوثائق{" "}
          <span className={styles.optional}>(اختياري في هذه المرحلة)</span>
        </h3>
        <div className={styles.field}>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="ملاحظات إضافية حول التسجيل..."
            rows={3}
          ></textarea>
        </div>

        {/* منطقة رفع الملفات الفعلية */}
        <div
          className={styles.uploadZone}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add(styles.uploadZoneDragOver);
          }}
          onDragLeave={(e) => {
            e.currentTarget.classList.remove(styles.uploadZoneDragOver);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove(styles.uploadZoneDragOver);
            const dt = e.dataTransfer;
            if (dt.files && dt.files.length > 0) {
              handleFileSelect({ target: { files: dt.files } });
            }
          }}
        >
          <Upload size={32} className={styles.uploadIconSvg} />
          <p className={styles.uploadText}>اسحب الملفات هنا أو اضغط للرفع</p>
          <span className={styles.uploadHint}>
            يمكن رفع الترخيص أو أي وثيقة رسمية (PDF, JPG, PNG) - الحد الأقصى 5MB
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </div>

        {/* عرض الملفات المرفوعة */}
        {uploadedFiles.length > 0 && (
          <div className={styles.uploadedFilesContainer}>
            {uploadedFiles.map((file) => (
              <div key={file.id} className={styles.uploadedFile}>
                <div className={styles.uploadedFileInfo}>
                  <FileText size={16} />
                  <span className={styles.uploadedFileName}>{file.name}</span>
                  <span className={styles.uploadedFileSize}>{file.size}</span>
                </div>
                <button
                  type="button"
                  className={styles.uploadedFileRemove}
                  onClick={() => handleRemoveFile(file.id)}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* أزرار التحكم السفلية */}
      <div className={styles.formActions}>
        <button
          type="submit"
          className={styles.btnSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className={styles.spinnerIcon} />
              <span>جاري الإرسال...</span>
            </>
          ) : (
            <span>إرسال للموافقة ↗</span>
          )}
        </button>
        <button
          type="button"
          className={styles.btnDraft}
          onClick={handleSaveDraft}
          disabled={isSavingDraft || isLoading}
        >
          {isSavingDraft ? "جاري الحفظ..." : "حفظ كمسودة"}
        </button>
      </div>
    </form>
  );
}
