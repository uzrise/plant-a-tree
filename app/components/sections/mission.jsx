"use client";

import { useTranslations } from "next-intl";

function Mission() {
  const t = useTranslations("mission");
  return (
    <section className="py-[96px]  w-full">
      <div className="max-w-[768px] mx-auto space-y-5">
        <h1 className="text-[#202225] font-semibold text-5xl text-center">
          {t("title")}
        </h1>
        <p className="text-[#787F84] text-center text-[22px] font-medium">
          {t("subtitle")}
        </p>
      </div>
      <div className="container mt-[64px] mx-auto flex justify-center px-[32px] gap-[32px] ">
        <div className="bg-[#08743E] max-w-[592px] rounded-[24px] h-[372px] p-[36px] text-white border-[#36BD79] flex flex-col border-solid border-2">
          <h2 className="text-4xl font-semibold mb-16">
            {t("personalPlanting.title")}
          </h2>
          <p className="font-medium text-base mt-auto mb-8">
            {t("personalPlanting.description")}
          </p>
          <button className="font-semibold text-sm rounded-[48px] w-fit p-[12px_24px_12px_24px] border border-white border-solid">
            {t("personalPlanting.button")}
          </button>
        </div>
        <div className="bg-[#08743E]  max-w-[592px] rounded-[24px] h-[372px] p-[36px] text-white  flex flex-col border-[#36BD79] border-solid border-2">
          <h2 className="text-4xl font-semibold mb-16">
            {t("corporatePlanting.title")}
          </h2>
          <p className="font-medium text-base mt-auto mb-8">
            {t("corporatePlanting.description")}
          </p>
          <button className="font-semibold text-sm rounded-[48px] w-fit p-[12px_24px_12px_24px] border border-white border-solid">
            {t("corporatePlanting.button")}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Mission;
