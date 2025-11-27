"use client";

import { useTranslations } from "next-intl";

export default function FooterLinks() {
  const t = useTranslations("footer.links");
  return (
    <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] text-sm sm:text-base">
      <li>{t("project")}</li>
      <li>{t("plantNow")}</li>
      <li>{t("plantPartners")}</li>
      <li>{t("bePartner")}</li>
      <li>{t("contact")}</li>
    </ul>
  );
}
