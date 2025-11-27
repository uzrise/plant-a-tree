"use client";

import { useTranslations } from "next-intl";

function Mission() {
  const t = useTranslations("mission");
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[96px] w-full px-4 sm:px-6 md:px-8">
      <div className="max-w-full sm:max-w-[640px] md:max-w-[720px] lg:max-w-[768px] mx-auto space-y-4 sm:space-y-5">
        <h1 className="text-[#202225] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
          {t("title")}
        </h1>
        <p className="text-[#787F84] text-center text-base sm:text-lg md:text-xl lg:text-[22px] font-medium px-2">
          {t("subtitle")}
        </p>
      </div>
      <div className="container mt-8 sm:mt-12 md:mt-16 lg:mt-[64px] mx-auto flex flex-col lg:flex-row justify-center items-center px-4 sm:px-6 md:px-8 lg:px-[32px] gap-6 sm:gap-8 md:gap-[32px]">
        <div className="bg-[#08743E] w-full max-w-full sm:max-w-[500px] md:max-w-[560px] lg:max-w-[592px] rounded-[24px] min-h-[320px] sm:h-[340px] md:h-[360px] lg:h-[372px] p-6 sm:p-8 md:p-[32px] lg:p-[36px] text-white border-[#36BD79] flex flex-col border-solid border-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            {t("personalPlanting.title")}
          </h2>
          <p className="font-medium text-sm sm:text-base mt-auto mb-6 sm:mb-8">
            {t("personalPlanting.description")}
          </p>
          <button className="font-semibold text-xs sm:text-sm rounded-[48px] w-fit p-2 sm:p-[10px_20px_10px_20px] md:p-[12px_24px_12px_24px] border border-white border-solid">
            {t("personalPlanting.button")}
          </button>
        </div>
        <div className="bg-[#08743E] w-full max-w-full sm:max-w-[500px] md:max-w-[560px] lg:max-w-[592px] rounded-[24px] min-h-[320px] sm:h-[340px] md:h-[360px] lg:h-[372px] p-6 sm:p-8 md:p-[32px] lg:p-[36px] text-white flex flex-col border-[#36BD79] border-solid border-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            {t("corporatePlanting.title")}
          </h2>
          <p className="font-medium text-sm sm:text-base mt-auto mb-6 sm:mb-8">
            {t("corporatePlanting.description")}
          </p>
          <button className="font-semibold text-xs sm:text-sm rounded-[48px] w-fit p-2 sm:p-[10px_20px_10px_20px] md:p-[12px_24px_12px_24px] border border-white border-solid">
            {t("corporatePlanting.button")}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Mission;
