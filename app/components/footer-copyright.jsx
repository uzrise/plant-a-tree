"use client";

import { useTranslations } from "next-intl";

export default function FooterCopyright() {
  const t = useTranslations("footer");
  return (
    <>
      <p className="text-xs sm:text-sm md:text-base text-center sm:text-left">{t("copyright")}</p>
      <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4">
        <p className="text-xs sm:text-sm md:text-base">{t("terms")}</p>
        <p className="text-xs sm:text-sm md:text-base">{t("privacy")}</p>
        <p className="text-xs sm:text-sm md:text-base">{t("cookies")}</p>
      </div>
    </>
  );
}
