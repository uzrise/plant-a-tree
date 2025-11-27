"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

function Plant() {
  const t = useTranslations("plant");
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[96px] bg-[#F5F6F7] bg-no-repeat bg-center sm:bg-right w-full">
      <div className="container items-center mx-auto flex gap-[64px] min-h-[300px] sm:h-[400px] md:h-[480px] lg:h-[576px] px-4 sm:px-6 md:px-8 lg:px-[32px] bg-[url('/images/plant.png')] bg-cover bg-center">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 w-full max-w-full sm:max-w-[480px] md:max-w-[540px] lg:max-w-[576px]">
          <h1 className="text-[#202225] font-semibold text-2xl sm:text-3xl md:text-4xl">
            {t("title")}
          </h1>
          <p className="text-[#787F84] text-base sm:text-lg md:text-xl lg:text-[22px] font-medium">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Plant;
