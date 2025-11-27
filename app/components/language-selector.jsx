"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: "uz", label: "UZ" },
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
  ];

  const switchLanguage = (newLocale) => {
    // Remove the current locale from pathname
    const locales = ["uz", "ru", "en"];
    const pathSegments = pathname.split("/").filter(Boolean);
    
    // Remove locale if it exists
    if (pathSegments.length > 0 && locales.includes(pathSegments[0])) {
      pathSegments.shift();
    }
    
    // Reconstruct path without locale
    const pathWithoutLocale = pathSegments.length > 0 
      ? "/" + pathSegments.join("/") 
      : "";
    
    // Navigate to new locale with the same path
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    router.refresh();
  };

  return (
    <div className="flex gap-2 items-center">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLanguage(lang.code)}
          className={`px-3 py-1 rounded-[48px] text-sm font-semibold transition-colors ${
            locale === lang.code
              ? "bg-[#37A16C] text-white border border-[#36BD79]"
              : "bg-[#EEEEEE] text-[#202225] border border-[#FFFFFF] hover:bg-[#E0E0E0]"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
