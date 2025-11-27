"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

function Gallery() {
  const t = useTranslations("gallery");
  return (
    <section className="py-[96px] flex flex-col  w-full">
      <h1 className="text-[#202225] font-semibold text-5xl text-center">
        {t("title")}
      </h1>
      <div className="container mt-[64px] mx-auto gap-[32px] flex justify-center  ">
        <div className="flex flex-col gap-[32px]">
          <Image
            alt="tree-1"
            src={"/images/tree-1.png"}
            width={400}
            height={320}
            className=""
          />
          <Image
            alt="tree-4"
            src={"/images/tree-4.png"}
            width={400}
            height={320}
            className=""
          />
        </div>{" "}
        <div className="flex flex-col gap-[32px]">
          <Image
            alt="tree-2"
            src={"/images/tree-2.png"}
            width={400}
            height={460}
            className=""
          />
          <Image
            alt="tree-5"
            src={"/images/tree-5.png"}
            width={400}
            height={180}
            className=""
          />
        </div>
        <div className="flex flex-col gap-[32px]">
          <Image
            alt="tree-3"
            src={"/images/tree-3.png"}
            width={400}
            height={180}
            className=""
          />
          <Image
            alt="tree-6"
            src={"/images/tree-6.png"}
            width={400}
            height={460}
            className=""
          />
        </div>
      </div>
      <button className="mt-[64px] font-semibold mx-auto text-sm w-fit rounded-[48px] text-white p-[12px_24px_12px_24px] bg-[#37A16C] border-[#36BD79] border">
        {t("button")}
      </button>
    </section>
  );
}

export default Gallery;
