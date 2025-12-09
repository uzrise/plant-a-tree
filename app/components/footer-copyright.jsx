"use client";

import { useTranslations } from "next-intl";

export default function FooterCopyright() {
  const t = useTranslations("footer");
  
  // Productionda doim ishlashi uchun to'g'ridan-to'g'ri fayl pathlarini ishlatamiz
  const getPublicOfferUrl = () => {
    if (typeof window !== 'undefined') {
      // Client-side: to'liq URL yaratamiz
      const baseUrl = window.location.origin;
      return `${baseUrl}/Публичная_оферта.docx`;
    }
    // Server-side: relative path qaytaramiz (Next.js avtomatik to'ldiradi)
    return '/Публичная_оферта.docx';
  };

  const getPrivacyPolicyUrl = () => {
    if (typeof window !== 'undefined') {
      // Client-side: to'liq URL yaratamiz
      const baseUrl = window.location.origin;
      return `${baseUrl}/Политика_конфиденциальности.docx`;
    }
    // Server-side: relative path qaytaramiz (Next.js avtomatik to'ldiradi)
    return '/Политика_конфиденциальности.docx';
  };

  return (
    <>
      <p className="text-xs sm:text-sm md:text-base text-center sm:text-left">{t("copyright")}</p>
      <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4">
        <a
          href={getPublicOfferUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm md:text-base hover:underline cursor-pointer"
        >
          {t("terms")}
        </a>
        <a
          href={getPrivacyPolicyUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm md:text-base hover:underline cursor-pointer"
        >
          {t("privacy")}
        </a>
        <p className="text-xs sm:text-sm md:text-base">{t("cookies")}</p>
      </div>
    </>
  );
}
