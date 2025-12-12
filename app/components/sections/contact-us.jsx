"use client";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactsAPI, authAPI } from "../../../lib/api";
import { translateBackendError } from "../../../lib/errorTranslations";

function ContactUs() {
  const t = useTranslations("contact");
  const errorT = useTranslations("errors");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, t("form.nameRequired")),
        email: z.string().email(t("form.emailInvalid")),
        phone: z.string().optional(),
        message: z.string().min(10, t("form.messageMin")),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    authAPI
      .refresh()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const onSubmit = async (data) => {
    if (!checked) {
      setError(t("form.privacyRequired"));
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      if (isAuthenticated) {
        await contactsAPI.createAuthenticated(data);
      } else {
        await contactsAPI.create(data);
      }
      setSuccess(t("form.success"));
      reset();
      setChecked(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || t("form.error");
      setError(translateBackendError(errorMsg, errorT));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-[96px] w-full px-4 sm:px-6 md:px-8">
      <h1 className="text-[#202225] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
        {t("title")}
      </h1>
      <div className="container items-start mx-auto flex flex-col-reverse lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-[64px] px-4 sm:px-6 md:px-8 lg:px-[32px] mt-8 sm:mt-12 md:mt-16 lg:mt-[64px]">
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 w-full lg:w-auto lg:flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-[32px] mt-6 sm:mt-8 md:mt-12 lg:mt-[52px]">
            <div className="w-full max-w-full sm:max-w-[272px]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.02945 6.51219L10.2355 12.4802C11.2874 13.2453 12.7126 13.2453 13.7645 12.4802L21.9706 6.51219C21.7299 4.53314 20.044 3 18 3H6C3.95599 3 2.27007 4.53314 2.02945 6.51219ZM22 8.96377L14.9409 14.0977C13.1876 15.3728 10.8124 15.3728 9.05914 14.0977L2 8.96377V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V8.96377Z"
                  fill="#37A16C"
                />
              </svg>
              <h3 className="mt-3 sm:mt-4 text-[#202225] font-semibold text-lg sm:text-xl md:text-[22px]">
                {t("email.label")}
              </h3>
              <p className="text-[#787F84] font-medium text-sm sm:text-base">
                {t("email.description")}
              </p>
              <a
                href="mailto:yashilhamkor@gmail.com"
                className="mt-3 sm:mt-4 text-[#37A16C] inline-block text-xs sm:text-sm font-semibold break-all"
              >
                {t("email.value")}
              </a>
            </div>
            <div className="w-full max-w-full sm:max-w-[272px]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 3H11C6.02944 3 2 7.02944 2 12V17C2 19.2091 3.79086 21 6 21H13C17.9706 21 22 16.9706 22 12C22 7.02944 17.9706 3 13 3ZM14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10ZM8.142 15.0135C8.60661 13.5499 10.1579 13 12 13C13.8421 13 15.3934 13.5499 15.858 15.0135C16.0251 15.5399 15.5523 16 15 16H9C8.44772 16 7.9749 15.5399 8.142 15.0135Z"
                  fill="#37A16C"
                />
              </svg>

              <h3 className="mt-3 sm:mt-4 text-[#202225] font-semibold text-lg sm:text-xl md:text-[22px]">
                {t("team.label")}
              </h3>
              <p className="text-[#787F84] font-medium text-sm sm:text-base">
                {t("team.description")}
              </p>
              <a
                className="mt-3 sm:mt-4 text-[#37A16C] inline-block text-xs sm:text-sm font-semibold break-words"
              >
                {t("team.value")}
              </a>
            </div>
            <div className="w-full max-w-full sm:max-w-[272px]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 3H11C6.02944 3 2 7.02944 2 12V17C2 19.2091 3.79086 21 6 21H13C17.9706 21 22 16.9706 22 12C22 7.02944 17.9706 3 13 3ZM14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10ZM8.142 15.0135C8.60661 13.5499 10.1579 13 12 13C13.8421 13 15.3934 13.5499 15.858 15.0135C16.0251 15.5399 15.5523 16 15 16H9C8.44772 16 7.9749 15.5399 8.142 15.0135Z"
                  fill="#37A16C"
                />
              </svg>

              <h3 className="mt-3 sm:mt-4 text-[#202225] font-semibold text-lg sm:text-xl md:text-[22px]">
                {t("office.label")}
              </h3>
              <p className="text-[#787F84] font-medium text-sm sm:text-base">
                {t("office.description")}
              </p>
              <a
                className="mt-3 sm:mt-4 text-[#37A16C] inline-block text-xs sm:text-sm font-semibold break-words"
              >
                {t("office.value")}
              </a>
            </div>
            <div className="w-full max-w-full sm:max-w-[272px]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 19V17.3541C21 16.5363 20.5021 15.8008 19.7428 15.4971L17.7086 14.6835C16.7429 14.2971 15.6422 14.7156 15.177 15.646L15 16C15 16 12.5 15.5 10.5 13.5C8.5 11.5 8 9 8 9L8.35402 8.82299C9.28438 8.35781 9.70285 7.25714 9.31654 6.29136L8.50289 4.25722C8.19916 3.4979 7.46374 3 6.64593 3H5C3.89543 3 3 3.89543 3 5C3 13.8366 10.1634 21 19 21C20.1046 21 21 20.1046 21 19Z"
                  fill="#37A16C"
                />
              </svg>

              <h3 className="mt-3 sm:mt-4 text-[#202225] font-semibold text-lg sm:text-xl md:text-[22px]">
                {t("phone.label")}
              </h3>
              <p className="text-[#787F84] font-medium text-sm sm:text-base">
                {t("phone.description")}
              </p>
              <a
                href="tel:+998983609799"
                className="mt-3 sm:mt-4 text-[#37A16C] inline-block text-xs sm:text-sm font-semibold"
              >
                {t("phone.value")}
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-5 md:gap-6 justify-center sm:justify-start">
            <a
              href="https://www.instagram.com/yashilhamkor/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-[56px] md:h-[56px]"
              >
                <rect width="56" height="56" rx="28" fill="#37A16C" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23 18C20.2386 18 18 20.2386 18 23V33C18 35.7614 20.2386 38 23 38H33C35.7614 38 38 35.7614 38 33V23C38 20.2386 35.7614 18 33 18H23ZM34 23C34.5523 23 35 22.5523 35 22C35 21.4477 34.5523 21 34 21C33.4477 21 33 21.4477 33 22C33 22.5523 33.4477 23 34 23ZM33 28C33 30.7614 30.7614 33 28 33C25.2386 33 23 30.7614 23 28C23 25.2386 25.2386 23 28 23C30.7614 23 33 25.2386 33 28ZM28 31C29.6569 31 31 29.6569 31 28C31 26.3431 29.6569 25 28 25C26.3431 25 25 26.3431 25 28C25 29.6569 26.3431 31 28 31Z"
                  fill="white"
                />
              </svg>
            </a>
            <a
              href="https://t.me/Yashil_Hamkor"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-[56px] md:h-[56px]"
              >
                <rect width="56" height="56" rx="28" fill="#37A16C" />
                <path
                  d="M18.8965 26.7964L34.2851 20.1458C35.0088 19.833 35.7929 20.4416 35.6695 21.2202L33.5655 34.4962C33.4355 35.3162 32.4206 35.6299 31.8506 35.0262L28.3977 31.3686C27.7206 30.6514 27.6675 29.5475 28.2727 28.7686L30.7107 25.6308C30.8501 25.4515 30.63 25.2155 30.4414 25.342L25.5941 28.5939C24.7715 29.1457 23.7734 29.3727 22.7931 29.2309L19.15 28.704C18.152 28.5597 17.9708 27.1964 18.8965 26.7964Z"
                  fill="white"
                />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61584347535339"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-[56px] md:h-[56px]"
              >
                <rect width="56" height="56" rx="28" fill="#37A16C" />
                <path
                  d="M28 18C22.4772 18 18 22.4772 18 28C18 32.9706 21.7893 37.1047 26.625 37.875V28.625H24.125V25.375H26.625V22.875C26.625 19.9375 28.3125 18.375 30.9375 18.375C32.1875 18.375 33.5 18.625 33.5 18.625V21.375H32.0625C30.625 21.375 30.125 22.125 30.125 22.9375V25.375H33.375L32.875 28.625H30.125V37.875C34.9607 37.1047 38.75 32.9706 38.75 28C38.75 22.4772 34.2728 18 28.75 18H28Z"
                  fill="white"
                />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCoQmWIxq0esvGdHRyn8e-Mw"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-[56px] md:h-[56px]"
              >
                <rect width="56" height="56" rx="28" fill="#37A16C" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.1401 19C18.931 19 17.1401 20.7909 17.1401 23V33C17.1401 35.2091 18.931 37 21.1401 37H34.86C37.0691 37 38.86 35.2091 38.86 33V23C38.86 20.7909 37.0691 19 34.86 19H21.1401ZM31.2112 27.1056L26.4473 24.7236C25.7824 24.3912 25.0001 24.8747 25.0001 25.618V30.382C25.0001 31.1253 25.7824 31.6088 26.4473 31.2764L31.2112 28.8944C31.9483 28.5259 31.9483 27.4741 31.2112 27.1056Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="bg-[#F5F6F7] py-6 sm:py-8 md:py-10 lg:py-[40px] px-4 sm:px-6 md:px-8 lg:px-[32px] max-w-full lg:max-w-[576px] w-full rounded-[24px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                {success}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-[32px]">
              <div className="flex-1">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder={t("form.firstName")}
                  className={`placeholder:text-[#BCBEC2] h-[48px] sm:h-[50px] md:h-[52px] py-3 sm:py-4 md:py-5 px-3 w-full rounded-[26px] shadow-[0px_1px_2px_0px_#1018280D] border border-solid text-sm sm:text-base ${
                    errors.name ? "border-red-500" : "border-[#EEEEEE]"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder={t("form.email")}
              className={`placeholder:text-[#BCBEC2] mt-4 sm:mt-5 md:mt-6 h-[48px] sm:h-[50px] md:h-[52px] py-3 sm:py-4 md:py-5 px-3 w-full rounded-[26px] shadow-[0px_1px_2px_0px_#1018280D] border border-solid text-sm sm:text-base ${
                errors.email ? "border-red-500" : "border-[#EEEEEE]"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
            <input
              type="tel"
              {...register("phone")}
              placeholder={t("form.phone")}
              className="placeholder:text-[#BCBEC2] mt-4 sm:mt-5 md:mt-6 h-[48px] sm:h-[50px] md:h-[52px] py-3 sm:py-4 md:py-5 px-3 w-full rounded-[26px] shadow-[0px_1px_2px_0px_#1018280D] border border-solid border-[#EEEEEE] text-sm sm:text-base"
            />
            <textarea
              {...register("message", { required: true })}
              placeholder={t("form.message")}
              className={`placeholder:text-[#BCBEC2] mt-4 sm:mt-5 md:mt-6 mb-6 sm:mb-7 md:mb-8 min-h-[120px] sm:h-[140px] md:h-[164px] py-3 sm:py-4 md:py-5 px-3 w-full rounded-[26px] shadow-[0px_1px_2px_0px_#1018280D] border border-solid text-sm sm:text-base resize-none ${
                errors.message ? "border-red-500" : "border-[#EEEEEE]"
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-600 -mt-4 mb-4">{errors.message.message}</p>
            )}
            <div className="flex gap-3 items-start sm:items-center">
              <input
                type="checkbox"
                id="custom-checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
                className="hidden"
              />
              <label
                htmlFor="custom-checkbox"
                className={`size-5 flex-shrink-0 border bg-white rounded-md flex items-center justify-center cursor-pointer mt-0.5
          ${checked ? "border-[#37A16C]" : "border-[#EEEEEE]"}`}
              >
                {checked && <span className="text-green-500 text-sm">✓</span>}
              </label>
              <p className="text-[#787F84] text-xs sm:text-sm md:text-base font-medium leading-relaxed">
                {t("form.privacy")}
              </p>
            </div>
            <button
              type="submit"
              disabled={loading || !checked}
              className="mt-6 sm:mt-8 md:mt-[32px] font-semibold w-full text-xs sm:text-sm rounded-[48px] text-white p-2 sm:p-[10px_20px_10px_20px] md:p-[12px_24px_12px_24px] bg-[#37A16C] border-[#36BD79] border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t("form.sending") : t("form.send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
