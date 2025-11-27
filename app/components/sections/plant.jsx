"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

function Plant() {
  const t = useTranslations("plant");
  return (
    <section className="py-[96px] bg-[#F5F6F7] bg-no-repeat bg-right w-full">
      <div className="container items-center mx-auto flex gap-[64px] h-[576px] px-[32px]  bg-[url('/images/plant.png')]  bg-cover">
        <div className="flex flex-col gap-4 max-w-[576px]">
          <h1 className="text-[#202225] font-semibold text-4xl">
            {t("title")}
          </h1>
          <p className="text-[#787F84] text-[22px] font-medium">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Plant;
