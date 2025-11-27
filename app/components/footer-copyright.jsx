"use client";

import { useTranslations } from "next-intl";

export default function FooterCopyright() {
  const t = useTranslations("footer");
  return (
    <>
      <p>{t("copyright")}</p>
      <div className="flex gap-4">
        <p>{t("terms")}</p>
        <p>{t("privacy")}</p>
        <p>{t("cookies")}</p>
      </div>
    </>
  );
}
