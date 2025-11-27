"use client";
import Image from "next/image";
import Tree from "./tree";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usersAPI, donationsAPI, authAPI } from "../../lib/api";
import DonationModal from "./donation-modal";

export default function HeroController({ treeCount, setTreeCount }) {
  const t = useTranslations("welcome");
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await authAPI.refresh();
      setIsAuthenticated(true);
      const response = await usersAPI.getMe();
      setHasProfile(!!(response.data.name && response.data.surname));
    } catch (err) {
      setIsAuthenticated(false);
      setHasProfile(false);
    }
  };

  function onClick() {
    if (treeCount < 10) {
      setTreeCount((prev) => Number(prev) + 1);
    }
  }

  const handleSliderChange = (e) => {
    setTreeCount(e.target.value);
  };

  const handleSaveWorld = async () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }

    if (!hasProfile) {
      router.push('/auth/register');
      return;
    }

    // Show donation modal
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-4 sm:mt-6 px-4 sm:px-6 md:px-8">
      <Image
        src={"/logo.png"}
        width={412}
        height={90}
        alt="logo"
        className="mb-4 sm:mb-5 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[412px] h-auto"
      />
      <p className="text-[#787F84] text-center font-medium text-base sm:text-lg md:text-xl lg:text-[22px] max-w-full sm:max-w-[480px] md:max-w-[520px] px-4">
        {t("description")}
      </p>
      <div className="bg-[#FFFFFF99] relative z-20 mt-8 sm:mt-12 md:mt-16 lg:mt-[64px] w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[453px] rounded-[20px] border-white border-2 shadow-[0px_32px_28px_0px_#E4E4E433]">
        <div className="min-h-[140px] sm:h-[160px] md:h-[172px] px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-7 md:py-8 lg:py-9 border-b-2 flex-col border-b-white flex items-center justify-between">
          <h3 className="text-[#202225] text-center font-medium text-xl sm:text-2xl md:text-[26px] lg:text-[28px]">
            {t("choose")}
          </h3>
          <div className="relative w-full">
            <input
              type="range"
              min="1"
              max="10"
              value={treeCount}
              onChange={handleSliderChange}
              className="w-full h-[24px] rounded-[12px] appearance-none cursor-pointer shadow-[0px_0px_6px_0px_#0000001F_inset]"
              style={{
                background: `linear-gradient(to right, #36BD79 0%, #36BD79 ${
                  (treeCount - 1) * 11.11
                }%, #F5F6F7 ${(treeCount - 1) * 11.11}%, #F5F6F7 100%)`,
                WebkitAppearance: "none",
                MozAppearance: "none",
                outline: "none",
              }}
            />

            {/* Tick Marks */}
            <div className="absolute top-1/2 left-[19px] w-[calc(100%-38px)] h-0 -mt-[3px] flex justify-between items-center transform -translate-y-[72%] z-0">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="relative w-[2px] h-[12px]">
                  <div
                    className={`w-[2px] h-full rounded-[1px] ${
                      treeCount > index + 1
                        ? "bg-gradient-to-t from-[#36BD79] to-[#37A16C]"
                        : "bg-[#BCBEC2]"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="min-h-[100px] sm:h-[110px] md:h-[134px] px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-7 md:py-8 lg:py-9 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex text-[#202225] leading-8 sm:leading-9 md:leading-10 font-semibold text-2xl sm:text-[26px] md:text-[28px] lg:text-[32px] gap-2">
            <div className="flex items-center justify-center gap-1">
              {treeCount}
              <Tree />
            </div>
            <span className="font-semibold text-2xl sm:text-[26px] md:text-[28px] lg:text-[32px] leading-8 sm:leading-9 md:leading-10 text-[#BCBEC2]">
              =
            </span>
            <div>{treeCount * 12000} UZS</div>
          </div>
          <button
            onClick={handleSaveWorld}
            className="rounded-[15px_15px_13px_13px] h-[56px] sm:h-[60px] md:h-[64px] lg:h-[68px] w-full sm:w-[140px] md:w-[150px] lg:w-[165px] text-white active:text-[#ffffffcc] active:p-[1px] p-[1px_2px_5px_2px] bg-[#08743E] border-2 border-white shadow-[0px_1px_1px_0px_#00000040]"
          >
            <div className="flex items-center justify-center font-bold text-sm sm:text-base bg-[#37A16C] border-t border-b rounded-xl border-[#36BD79] w-full px-4 sm:px-5 py-3 sm:py-4 h-full">
              {t("saveWorld")}
            </div>
          </button>
        </div>
      </div>
      {showModal && (
        <DonationModal
          treeCount={treeCount}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            setTreeCount(1);
          }}
        />
      )}
    </div>
  );
}

