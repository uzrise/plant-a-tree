"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { donationsAPI } from "../../../lib/api";

export default function Contributors() {
  const t = useTranslations("contributors");
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContributors();
  }, []);

  const loadContributors = async () => {
    try {
      const response = await donationsAPI.getTopContributors();
      setContributors(response.data);
    } catch (err) {
      console.error("Failed to load contributors:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("uz-UZ").format(amount);
  };

  const getMaxAmount = () => {
    if (contributors.length === 0) return 1000000;
    return Math.max(...contributors.map((c) => c.totalAmount));
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[96px] w-full px-4 sm:px-6 md:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#08743E] mx-auto"></div>
        </div>
      </section>
    );
  }

  if (contributors.length === 0) {
    return null;
  }

  const maxAmount = getMaxAmount();

  return (
    <section id="plant-partners" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[96px] w-full px-4 sm:px-6 md:px-8 bg-white">
      <h1 className="text-[#202225] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
        {t("title")}
      </h1>
      <p className="text-center text-[#787F84] font-medium text-sm sm:text-base md:text-lg mt-2 mb-8 sm:mb-12">
        {t("subtitle")}
      </p>

      <div className="container mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
        <div className="space-y-4">
          {contributors.map((contributor, index) => {
            const percentage = (contributor.totalAmount / maxAmount) * 100;
            const isTop = index === 0;

            return (
              <div
                key={contributor.userId || index}
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="64" height="64" rx="32" fill="#E2E4E9" />
                      <g filter="url(#filter0_i_6003_17558)">
                        <g clip-path="url(#clip0_6003_17558)">
                          <rect width="64" height="64" rx="32" fill="#E2E4E9" />
                          <g filter="url(#filter1_di_6003_17558)">
                            <ellipse
                              cx="31.9999"
                              cy="60.8001"
                              rx="25.6"
                              ry="19.2"
                              fill="url(#paint0_radial_6003_17558)"
                              shape-rendering="crispEdges"
                            />
                            <path
                              d="M31.9995 42.1001C38.971 42.1001 45.2641 44.2199 49.8022 47.6235C54.3401 51.027 57.1001 55.6911 57.1001 60.8003C57.1 65.9093 54.3399 70.5727 49.8022 73.9761C45.2641 77.3797 38.971 79.5005 31.9995 79.5005C25.0281 79.5004 18.7358 77.3796 14.1978 73.9761C9.66005 70.5727 6.89997 65.9094 6.8999 60.8003C6.8999 55.6911 9.65983 51.027 14.1978 47.6235C18.7358 44.22 25.0281 42.1002 31.9995 42.1001Z"
                              stroke="url(#paint1_radial_6003_17558)"
                              shape-rendering="crispEdges"
                            />
                          </g>
                          <g filter="url(#filter2_di_6003_17558)">
                            <circle
                              cx="32.0002"
                              cy="25.5998"
                              r="12.8"
                              fill="url(#paint2_radial_6003_17558)"
                              shape-rendering="crispEdges"
                            />
                            <circle
                              cx="32.0002"
                              cy="25.5998"
                              r="12.3"
                              stroke="url(#paint3_radial_6003_17558)"
                              shape-rendering="crispEdges"
                            />
                          </g>
                        </g>
                      </g>
                      <defs>
                        <filter
                          id="filter0_i_6003_17558"
                          x="0"
                          y="-8"
                          width="64"
                          height="72"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="-8" />
                          <feGaussianBlur stdDeviation="8" />
                          <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                          />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.7712 0 0 0 0 0.78 0 0 0 0 0.7888 0 0 0 0.48 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect1_innerShadow_6003_17558"
                          />
                        </filter>
                        <filter
                          id="filter1_di_6003_17558"
                          x="2.3999"
                          y="33.6001"
                          width="59.2002"
                          height="54.3999"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.541176 0 0 0 0 0.560784 0 0 0 0 0.576471 0 0 0 0.16 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_6003_17558"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_6003_17558"
                            result="shape"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="-8" />
                          <feGaussianBlur stdDeviation="4" />
                          <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                          />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect2_innerShadow_6003_17558"
                          />
                        </filter>
                        <filter
                          id="filter2_di_6003_17558"
                          x="15.2002"
                          y="4.7998"
                          width="33.6001"
                          height="41.6001"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.541176 0 0 0 0 0.560784 0 0 0 0 0.576471 0 0 0 0.16 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_6003_17558"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_6003_17558"
                            result="shape"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="-8" />
                          <feGaussianBlur stdDeviation="4" />
                          <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                          />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect2_innerShadow_6003_17558"
                          />
                        </filter>
                        <radialGradient
                          id="paint0_radial_6003_17558"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(31.9999 41.6001) rotate(90) scale(38.4 51.2)"
                        >
                          <stop stop-color="white" />
                          <stop
                            offset="1"
                            stop-color="white"
                            stop-opacity="0"
                          />
                        </radialGradient>
                        <radialGradient
                          id="paint1_radial_6003_17558"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(31.9999 41.6001) rotate(90) scale(38.4 51.2)"
                        >
                          <stop stop-color="white" />
                          <stop
                            offset="1"
                            stop-color="white"
                            stop-opacity="0"
                          />
                        </radialGradient>
                        <radialGradient
                          id="paint2_radial_6003_17558"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(32.0002 12.7998) rotate(90) scale(25.6)"
                        >
                          <stop stop-color="white" />
                          <stop
                            offset="1"
                            stop-color="white"
                            stop-opacity="0"
                          />
                        </radialGradient>
                        <radialGradient
                          id="paint3_radial_6003_17558"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(32.0002 12.7998) rotate(90) scale(25.6)"
                        >
                          <stop stop-color="white" />
                          <stop
                            offset="1"
                            stop-color="white"
                            stop-opacity="0"
                          />
                        </radialGradient>
                        <clipPath id="clip0_6003_17558">
                          <rect width="64" height="64" rx="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-[#202225] font-semibold text-base sm:text-lg md:text-[22px] truncate">
                    {contributor.name}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                 
                  <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isTop ? "bg-[#37A16C]" : "bg-gray-400"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-[#202225] font-semibold text-sm sm:text-base md:text-lg ml-4 whitespace-nowrap">
                      {formatAmount(contributor.totalAmount)} UZS
                    </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
