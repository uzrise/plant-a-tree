"use client";

import { useTranslations } from "next-intl";

export default function FooterCopyright() {
  const t = useTranslations("footer");
  
  const getPublicOfferUrl = () => {
    if (typeof window !== 'undefined') {
      const fileUrl = `${window.location.origin}/Публичная_оферта.docx`;
      return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`;
    }
    return '/Публичная_оферта.docx';
  };

  const getPrivacyPolicyUrl = () => {
    if (typeof window !== 'undefined') {
      const fileUrl = `${window.location.origin}/Политика_конфиденциальности.docx`;
      return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`;
    }
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
