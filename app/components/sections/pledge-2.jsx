"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

function Pledge2() {
  const t = useTranslations("pledge2");
  return (
    <section className="py-[96px] bg-[#F5F6F7] bg-no-repeat bg-right w-full">
      <div className="container items-center mx-auto flex gap-[64px] h-[576px] px-[32px]  bg-[url('/images/pledge-2.png')]  bg-cover">
        <div className="flex flex-col gap-4 max-w-[576px]">
          <h1 className="text-[#202225] font-semibold text-4xl">
            {t("title")}
          </h1>
          <p className="text-[#787F84] text-[22px] font-medium">
            {t("description")}
          </p>
          <button className="mt-7 font-semibold text-sm w-fit rounded-[48px] text-white p-[12px_24px_12px_24px] bg-[#37A16C] border-[#36BD79] border">
            {t("button")}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Pledge2;
