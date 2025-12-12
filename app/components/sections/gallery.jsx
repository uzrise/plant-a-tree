"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import DonationModal from "../donation-modal";

function Gallery() {
  const t = useTranslations("gallery");
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[96px] flex flex-col w-full px-4 sm:px-6 md:px-8">
      <h1 className="text-[#202225] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
        {t("title")}
      </h1>
      <div className="container mt-8 sm:mt-12 md:mt-16 lg:mt-[64px] mx-auto gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-start">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[32px]">
          <Image
            alt="tree-1"
            src={"/images/tree-1.png"}
            width={400}
            height={320}
            className="w-full h-auto object-cover rounded-lg"
          />
          <Image
            alt="tree-4"
            src={"/images/tree-4.png"}
            width={400}
            height={320}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[32px]">
          <Image
            alt="tree-2"
            src={"/images/tree-2.png"}
            width={400}
            height={460}
            className="w-full h-auto object-cover rounded-lg"
          />
          <Image
            alt="tree-5"
            src={"/images/tree-5.png"}
            width={400}
            height={180}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[32px]">
          <Image
            alt="tree-3"
            src={"/images/tree-3.png"}
            width={400}
            height={180}
            className="w-full h-auto object-cover rounded-lg"
          />
          <Image
            alt="tree-6"
            src={"/images/tree-6.png"}
            width={400}
            height={460}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
      <button 
        onClick={() => setShowModal(true)}
        className="mt-8 sm:mt-12 md:mt-16 lg:mt-[64px] font-semibold mx-auto text-xs sm:text-sm w-fit rounded-[48px] text-white p-2 sm:p-[10px_20px_10px_20px] md:p-[12px_24px_12px_24px] bg-[#37A16C] border-[#36BD79] border"
      >
        {t("button")}
      </button>
      {showModal && (
        <DonationModal
          treeCount={1}
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}
    </section>
  );
}

export default Gallery;
