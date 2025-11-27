"use client";

import { useTranslations } from "next-intl";

export default function NavInfoButton() {
  const t = useTranslations("nav");
  return (
    <button className="border border-[#FFFFFF] bg-[#EEEEEE] px-3 py-1.5 sm:px-4 sm:py-2 md:p-[12px_24px_12px_24px] rounded-[48px]">
      <span className="text-[#202225] font-semibold text-xs sm:text-sm">
        {t("info")}
      </span>
    </button>
  );
}
