"use client";

import { useTranslations } from "next-intl";

export default function FooterLinks() {
  const t = useTranslations("footer.links");

  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] text-sm sm:text-base">
      <li>
        <a
          href="#project"
          onClick={(e) => handleScroll(e, "project")}
          className="hover:text-[#37A16C] transition-colors cursor-pointer"
        >
          {t("project")}
        </a>
      </li>
      <li>
        <a
          href="#plant-now"
          onClick={(e) => handleScroll(e, "plant-now")}
          className="hover:text-[#37A16C] transition-colors cursor-pointer"
        >
          {t("plantNow")}
        </a>
      </li>
      <li>
        <a
          href="#plant-partners"
          onClick={(e) => handleScroll(e, "plant-partners")}
          className="hover:text-[#37A16C] transition-colors cursor-pointer"
        >
          {t("plantPartners")}
        </a>
      </li>
      <li>
        <a
          href="#project"
          onClick={(e) => handleScroll(e, "project")}
          className="hover:text-[#37A16C] transition-colors cursor-pointer"
        >
          {t("bePartner")}
        </a>
      </li>
      <li>
        <a
          href="#contact"
          onClick={(e) => handleScroll(e, "contact")}
          className="hover:text-[#37A16C] transition-colors cursor-pointer"
        >
          {t("contact")}
        </a>
      </li>
    </ul>
  );
}
