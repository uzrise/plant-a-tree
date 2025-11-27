"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

function Pledge() {
  const t = useTranslations("pledge");
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[96px] bg-[#F5F6F7] w-full">
      <div className="container items-center mx-auto flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-[64px] px-4 sm:px-6 md:px-8 lg:px-[32px]">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 w-full lg:w-auto lg:flex-1">
          <h1 className="text-[#202225] font-semibold text-2xl sm:text-3xl md:text-4xl">
            {t("title")}
          </h1>
          <p className="text-[#787F84] text-base sm:text-lg md:text-xl lg:text-[22px] font-medium">
            {t("description")}
          </p>
          <button className="mt-4 sm:mt-5 md:mt-7 font-semibold text-xs sm:text-sm w-fit rounded-[48px] text-white p-2 sm:p-[10px_20px_10px_20px] md:p-[12px_24px_12px_24px] bg-[#37A16C] border-[#36BD79] border">
            {t("button")}
          </button>
        </div>
        <div className="w-full lg:w-auto lg:flex-1 flex justify-center">
          <Image
            src="/images/trees.png"
            alt="tree image"
            width={576}
            height={480}
            className="w-full max-w-full sm:max-w-[480px] md:max-w-[540px] lg:max-w-[576px] h-auto object-contain lg:min-w-[576px]"
          />
        </div>
      </div>
    </section>
  );
}

export default Pledge;
