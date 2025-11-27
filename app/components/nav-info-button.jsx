"use client";

import { useTranslations } from "next-intl";

export default function NavInfoButton() {
  const t = useTranslations("nav");
  return (
    <button className="border border-[#FFFFFF] bg-[#EEEEEE] p-[12px_24px_12px_24px] rounded-[48px]">
      <span className="text-[#202225] font-semibold text-sm">
        {t("info")}
      </span>
    </button>
  );
}
