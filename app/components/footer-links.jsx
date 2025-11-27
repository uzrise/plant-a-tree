"use client";

import { useTranslations } from "next-intl";

export default function FooterLinks() {
  const t = useTranslations("footer.links");
  return (
    <ul className="flex gap-[32px] text-base">
      <li>{t("project")}</li>
      <li>{t("plantNow")}</li>
      <li>{t("plantPartners")}</li>
      <li>{t("bePartner")}</li>
      <li>{t("contact")}</li>
    </ul>
  );
}
