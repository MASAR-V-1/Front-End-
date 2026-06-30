"use client";
import { useState } from "react";
import styles from "./OrganizationForm.module.css";

export default function OrganizationForm() {
  const [formData, setFormData] = useState({
    orgName: "مؤسسة الإغاثة للتنمية",
    orgType: "NGO",
    regNumber: "REG-2023-9844",
    country: "SA",
    phone: "+966 50 123 4567",
    email: "info@reliefdev.org",
    address: "الرياض، حي الياسمين، شارع العليا",
    sectors: ["relief", "education"],
    size: "medium",
    volunteers: "150",
    experience: "12",
    managerName: "",
    managerRole: "",
    managerEmail: "",
    managerPhone: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending data to Laravel API...", formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
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
              value={formData.orgName}
              onChange={(e) =>
                setFormData({ ...formData, orgName: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.field}>
            <label>
              نوع المنظمة <span className={styles.required}>*</span>
            </label>
            <select
              value={formData.orgType}
              onChange={(e) =>
                setFormData({ ...formData, orgType: e.target.value })
              }
            >
              <option value="NGO">مؤسسة غير ربحية (NGO)</option>
              <option value="Gov">جهة حكومية</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              رقم التسجيل / الترخيص <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={formData.regNumber}
              onChange={(e) =>
                setFormData({ ...formData, regNumber: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.field}>
            <label>
              الدولة <span className={styles.required}>*</span>
            </label>
            <select
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            >
              <option value="SA">المملكة العربية السعودية</option>
              <option value="PS">فلسطين</option>
            </select>
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
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.field}>
            <label>
              رقم الهاتف <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className={styles.field}>
          <label>العنوان الرئيسي</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
      </section>

      {/* 2. مجالات العمل وحجم المنظمة */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>مجالات العمل</h3>
        <p className={styles.subLabel}>مجالات العمل الرئيسية (اختر ما ينطبق)</p>
        <div className={styles.tagsContainer}>
          <span className={`${styles.tag} ${styles.activeTag}`}>
            ✓ الإغاثة العاجلة
          </span>
          <span className={`${styles.tag} ${styles.activeTag}`}>✓ التعليم</span>
          <span className={styles.tag}>الرعاية الصحية</span>
          <span className={styles.tag}>الإسكان</span>
          <span className={styles.addTag}>+ إضافة مجال</span>
        </div>

        <div className={styles.row} style={{ marginTop: "20px" }}>
          <div className={styles.field}>
            <label>حجم المنظمة</label>
            <select
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
            >
              <option value="medium">متوسطة (50-200 موظف)</option>
              <option value="small">صغيرة</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>عدد المتطوعين النشطين</label>
            <input
              type="number"
              value={formData.volunteers}
              onChange={(e) =>
                setFormData({ ...formData, volunteers: e.target.value })
              }
            />
          </div>
          <div className={styles.field}>
            <label>سنوات الخبرة</label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
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
            <input type="text" placeholder="اسم المسؤول" required />
          </div>
          <div className={styles.field}>
            <label>
              المسمى الوظيفي <span className={styles.required}>*</span>
            </label>
            <input type="text" placeholder="مثال: مدير العمليات" required />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>
              البريد الإلكتروني <span className={styles.required}>*</span>
            </label>
            <input type="email" placeholder="contact@org.com" required />
          </div>
          <div className={styles.field}>
            <label>
              رقم الجوال <span className={styles.required}>*</span>
            </label>
            <input type="text" placeholder="+966 5x xxx xxxx" required />
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
            placeholder="ملاحظات إضافية حول التسجيل..."
            rows={3}
          ></textarea>
        </div>

        {/* منطقة رفع الملفات المتقطعة */}
        <div className={styles.uploadZone}>
          <div className={styles.uploadIcon}>☁</div>
          <p className={styles.uploadText}>اسحب الملفات هنا أو اضغط للرفع</p>
          <span className={styles.uploadHint}>
            يمكن رفع الترخيص أو أي وثيقة رسمية (PDF, JPG, PNG)
          </span>
        </div>
      </section>

      {/* أزرار التحكم السفلية */}
      <div className={styles.formActions}>
        <button type="submit" className={styles.btnSubmit}>
          إرسال للموافقة ↗
        </button>
        <button type="button" className={styles.btnDraft}>
          حفظ كمسودة
        </button>
      </div>
    </form>
  );
}
