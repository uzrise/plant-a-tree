"use client";

import { useTranslations } from "next-intl";

export default function FooterCopyright() {
  const t = useTranslations("footer");
  
  const getPublicOfferUrl = () => {
    const fileUrl = `https://www.yashil-hamkor.uz/Публичная_оферта.docx`;
    return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`;
  };

  const getPrivacyPolicyUrl = () => {
    const fileUrl = `https://www.yashil-hamkor.uz/Политика_конфиденциальности.docx`;
    return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`;
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
