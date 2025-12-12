"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import DonationModal from "../donation-modal";

function Pledge2() {
  const t = useTranslations("pledge2");
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[96px] bg-[#F5F6F7] bg-no-repeat bg-center sm:bg-right w-full">
      <div className="container items-center mx-auto flex gap-[64px] min-h-[400px] sm:h-[480px] md:h-[540px] lg:h-[576px] px-4 sm:px-6 md:px-8 lg:px-[32px] bg-[url('/images/pledge-2.png')] bg-cover bg-center">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 w-full max-w-full sm:max-w-[480px] md:max-w-[540px] lg:max-w-[576px]">
          <h1 className="text-[#202225] font-semibold text-2xl sm:text-3xl md:text-4xl">
            {t("title")}
          </h1>
          <p className="text-[#787F84] text-base sm:text-lg md:text-xl lg:text-[22px] font-medium">
            {t("description")}
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="mt-4 sm:mt-5 md:mt-7 font-semibold text-xs sm:text-sm w-fit rounded-[48px] text-white p-2 sm:p-[10px_20px_10px_20px] md:p-[12px_24px_12px_24px] bg-[#37A16C] border-[#36BD79] border"
          >
            {t("button")}
          </button>
        </div>
      </div>
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

export default Pledge2;
