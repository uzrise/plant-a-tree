"use client";
import Image from "next/image";
import { useState } from "react";

function ContactUs() {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <section className="py-[96px] w-full">
      <h1 className="text-[#202225] font-semibold text-5xl text-center">
        Contact us{" "}
      </h1>
      <div className="container items-center mx-auto flex gap-[64px] px-[32px] mt-[64px]">
        <div className="flex flex-col gap-12">
          <div className="flex flex-wrap gap-x-[32px] gap-y-[32px] mt-[52px]">
            <div className="max-w-[272px] w-full">
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
              <h3 className="mt-4 text-[#202225] font-semibold text-[22px]">
                Email
              </h3>
              <p className="text-[#787F84] font-medium text-base">
                Our friendly team is here to help.
              </p>
              <a
                href="mailto:hi@plantatreeten.com"
                className="mt-4 text-[#37A16C] inline-block text-sm font-semibold"
              >
                hi@plantatreeten.com
              </a>
            </div>
            <div className="max-w-[272px] w-full">
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

              <h3 className="mt-4 text-[#202225] font-semibold text-[22px]">
                Our team
              </h3>
              <p className="text-[#787F84] font-medium text-base">
                Our friendly team is here to help.
              </p>
              <a
                // href="mailto:hi@plantatreeten.com"
                className="mt-4 text-[#37A16C] inline-block text-sm font-semibold"
              >
                Plantatree Nonprofit Ltd.
              </a>
            </div>{" "}
            <div className="max-w-[272px] w-full">
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

              <h3 className="mt-4 text-[#202225] font-semibold text-[22px]">
                Office
              </h3>
              <p className="text-[#787F84] font-medium text-base">
                Come say hello at our office HQ.{" "}
              </p>
              <a
                // href="mailto:hi@plantatreeten.com"
                className="mt-4 text-[#37A16C] inline-block text-sm font-semibold"
              >
                Tashkent, Uzbekistan{" "}
              </a>
            </div>{" "}
            <div className="max-w-[272px] w-full">
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

              <h3 className="mt-4 text-[#202225] font-semibold text-[22px]">
                Phone
              </h3>
              <p className="text-[#787F84] font-medium text-base">
                Mon-Fri from 8am to 5pm.{" "}
              </p>
              <a
                href="tel:+1(000)000-00-00"
                className="mt-4 text-[#37A16C] inline-block text-sm font-semibold"
              >
                +1 (000) 000-00-00{" "}
              </a>
            </div>
          </div>
          <div className=" flex gap-6">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="56" height="56" rx="28" fill="#37A16C" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23 18C20.2386 18 18 20.2386 18 23V33C18 35.7614 20.2386 38 23 38H33C35.7614 38 38 35.7614 38 33V23C38 20.2386 35.7614 18 33 18H23ZM34 23C34.5523 23 35 22.5523 35 22C35 21.4477 34.5523 21 34 21C33.4477 21 33 21.4477 33 22C33 22.5523 33.4477 23 34 23ZM33 28C33 30.7614 30.7614 33 28 33C25.2386 33 23 30.7614 23 28C23 25.2386 25.2386 23 28 23C30.7614 23 33 25.2386 33 28ZM28 31C29.6569 31 31 29.6569 31 28C31 26.3431 29.6569 25 28 25C26.3431 25 25 26.3431 25 28C25 29.6569 26.3431 31 28 31Z"
                fill="white"
              />
            </svg>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="56" height="56" rx="28" fill="#37A16C" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23 18C20.2386 18 18 20.2386 18 23V33C18 35.7614 20.2386 38 23 38H33C35.7614 38 38 35.7614 38 33V23C38 20.2386 35.7614 18 33 18H23ZM34 23C34.5523 23 35 22.5523 35 22C35 21.4477 34.5523 21 34 21C33.4477 21 33 21.4477 33 22C33 22.5523 33.4477 23 34 23ZM33 28C33 30.7614 30.7614 33 28 33C25.2386 33 23 30.7614 23 28C23 25.2386 25.2386 23 28 23C30.7614 23 33 25.2386 33 28ZM28 31C29.6569 31 31 29.6569 31 28C31 26.3431 29.6569 25 28 25C26.3431 25 25 26.3431 25 28C25 29.6569 26.3431 31 28 31Z"
                fill="white"
              />
            </svg>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="56" height="56" rx="28" fill="#37A16C" />
              <path
                d="M18.8965 26.7964L34.2851 20.1458C35.0088 19.833 35.7929 20.4416 35.6695 21.2202L33.5655 34.4962C33.4355 35.3162 32.4206 35.6299 31.8506 35.0262L28.3977 31.3686C27.7206 30.6514 27.6675 29.5475 28.2727 28.7686L30.7107 25.6308C30.8501 25.4515 30.63 25.2155 30.4414 25.342L25.5941 28.5939C24.7715 29.1457 23.7734 29.3727 22.7931 29.2309L19.15 28.704C18.152 28.5597 17.9708 27.1964 18.8965 26.7964Z"
                fill="white"
              />
            </svg>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="56" height="56" rx="28" fill="#37A16C" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M38 28C38 33.5228 33.5229 38 28 38C26.4724 38 25.0248 37.6575 23.7298 37.045L19.3745 37.7709C18.6995 37.8834 18.1135 37.3 18.223 36.6245L18.9356 32.229C18.3353 30.9446 18 29.5114 18 28C18 22.4772 22.4772 18 28 18C33.5229 18 38 22.4772 38 28ZM32 30.6749V31.1111C32 31.602 31.602 32 31.1111 32C27.1838 32 24 28.8162 24 24.8889C24 24.398 24.398 24 24.8889 24H25.3251C25.8669 24 26.3542 24.3299 26.5554 24.833L26.742 25.2995C26.9506 25.821 26.7247 26.4155 26.2222 26.6667C26.2222 26.6667 26.4444 27.7778 27.3333 28.6667C28.2222 29.5556 29.3333 29.7778 29.3333 29.7778C29.5845 29.2753 30.1789 29.0494 30.7005 29.258L31.167 29.4446C31.6701 29.6458 32 30.1331 32 30.6749Z"
                fill="white"
              />
            </svg>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="56" height="56" rx="28" fill="#37A16C" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M38 28C38 33.5228 33.5229 38 28 38C26.4724 38 25.0248 37.6575 23.7298 37.045L19.3745 37.7709C18.6995 37.8834 18.1135 37.3 18.223 36.6245L18.9356 32.229C18.3353 30.9446 18 29.5114 18 28C18 22.4772 22.4772 18 28 18C33.5229 18 38 22.4772 38 28ZM32 30.6749V31.1111C32 31.602 31.602 32 31.1111 32C27.1838 32 24 28.8162 24 24.8889C24 24.398 24.398 24 24.8889 24H25.3251C25.8669 24 26.3542 24.3299 26.5554 24.833L26.742 25.2995C26.9506 25.821 26.7247 26.4155 26.2222 26.6667C26.2222 26.6667 26.4444 27.7778 27.3333 28.6667C28.2222 29.5556 29.3333 29.7778 29.3333 29.7778C29.5845 29.2753 30.1789 29.0494 30.7005 29.258L31.167 29.4446C31.6701 29.6458 32 30.1331 32 30.6749Z"
                fill="white"
              />
            </svg>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="56" height="56" rx="28" fill="#37A16C" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.1401 19C18.931 19 17.1401 20.7909 17.1401 23V33C17.1401 35.2091 18.931 37 21.1401 37H34.86C37.0691 37 38.86 35.2091 38.86 33V23C38.86 20.7909 37.0691 19 34.86 19H21.1401ZM31.2112 27.1056L26.4473 24.7236C25.7824 24.3912 25.0001 24.8747 25.0001 25.618V30.382C25.0001 31.1253 25.7824 31.6088 26.4473 31.2764L31.2112 28.8944C31.9483 28.5259 31.9483 27.4741 31.2112 27.1056Z"
                fill="white"
              />
            </svg>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="56" height="56" rx="28" fill="#37A16C" />
              <path
                d="M26 37C29.3137 37 32 34.3137 32 31V24.1973C32.8825 24.7078 33.9071 25 35 25H36V22H35C33.3431 22 32 20.6569 32 19H29V31C29 32.6569 27.6569 34 26 34C24.3431 34 23 32.6569 23 31C23 29.3431 24.3431 28 26 28V25C22.6863 25 20 27.6863 20 31C20 34.3137 22.6863 37 26 37Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div className="bg-[#F5F6F7] py-[40px] px-[32px] max-w-[576px] w-full max-h-[536px] h-full rounded-[24px]">
          <div className="flex gap-[32px]">
            <input
              type="text"
              placeholder="First name"
              className="placeholder:text-[#BCBEC2] h-[52px] py-5 px-3 w-full rounded-[26px] shadow-[0px_1px_2px_0px_#1018280D] border border-solid border-[#EEEEEE]"
            />
            <input
              type="text"
              placeholder="Last name"
              className="placeholder:text-[#BCBEC2] h-[52px] py-5 px-3 w-full rounded-[26px] shadow-[0px_1px_2px_0px_#1018280D] border border-solid border-[#EEEEEE]"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="placeholder:text-[#BCBEC2] mt-6 h-[52px] py-5 px-3 w-full rounded-[26px] shadow-[0px_1px_2px_0px_#1018280D] border border-solid border-[#EEEEEE]"
          />
          <textarea
            type="text"
            placeholder="Leave us a message..."
            className="placeholder:text-[#BCBEC2] mt-6 mb-8 h-[164px] py-5 px-3 w-full rounded-[26px] shadow-[0px_1px_2px_0px_#1018280D] border border-solid border-[#EEEEEE]"
          />
          <div className="flex gap-3 items-center">
            <input
              type="checkbox"
              id="custom-checkbox"
              checked={checked}
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <label
              htmlFor="custom-checkbox"
              className={`size-5 inline-block border bg-white rounded-md flex items-center justify-center cursor-pointer 
          ${checked ? "border-[#37A16C]" : "border-[#EEEEEE]"}`}
            >
              {checked && <span className="text-green-500 text-sm">✓</span>}
            </label>
            <p className="text-[#787F84] text-base font-medium">
              You agree to our friendly privacy policy.
            </p>
          </div>
          <button className="mt-[32px] font-semibold w-full text-sm rounded-[48px] text-white p-[12px_24px_12px_24px] bg-[#37A16C] border-[#36BD79] border">
            Send message
          </button>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
