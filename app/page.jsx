"use client";
import Image from "next/image";
import Clouds from "./components/clouds";
import Mountains from "./components/mountains";
import { useState } from "react";
import Tree from "./components/tree";
import BirdAnimation from "./components/bird-animation";
import FlockOfBirds from "./components/flock-of-birds";
import Pledge from "./components/sections/pledge";
import Mission from "./components/sections/mission";
import Pledge2 from "./components/sections/pledge-2";
import Gallery from "./components/sections/gallery";
import Plant from "./components/sections/plant";
import ContactUs from "./components/sections/contact-us";

export default function Home() {
  const [treeCount, setTreeCount] = useState(1);

  function onClick() {
    if (treeCount < 10) {
      setTreeCount((prev) => Number(prev) + 1);
    }
  }

  const handleSliderChange = (e) => {
    setTreeCount(e.target.value);
  };

  return (
    <main className="flex flex-col  items-center justify-center w-full mt-6">
      <Image
        src={"/logo.png"}
        width={412}
        height={90}
        alt="logo"
        className="mb-5"
      />
      <p className="text-[#787F84] text-center font-medium text-[22px] max-w-[520px]">
        Help save the ecosystem by planting a tree, contribute through your
        donation!
      </p>
      <div className="bg-[#FFFFFF99] relative z-20 mt-[64px] w-[453px] rounded-[20px]  border-white border-2 shadow-[0px_32px_28px_0px_#E4E4E433]">
        <div className="h-[172px] px-10 py-9 border-b-2 flex-col border-b-white flex items-center justify-between">
          <h3 className="text-[#202225] text-center font-medium text-[28px] ">
            Choose
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
        <div className="h-[134px] px-10 py-9 flex items-center justify-between">
          <div className="flex text-[#202225] leading-10 font-semibold text-[32px] gap-2">
            <div className="flex items-center justify-center gap-1">
              {treeCount}
              <Tree />
            </div>
            <span className="font-semibold text-[32px] leading-10 text-[#BCBEC2]">
              =
            </span>
            <div>${treeCount * 10}</div>
          </div>
          <button
            onClick={onClick}
            className="rounded-[15px_15px_13px_13px] h-[68px] w-[165px] text-white active:text-[#ffffffcc ] active:p-[1px] p-[1px_2px_5px_2px] bg-[#08743E] border-2 border-white shadow-[0px_1px_1px_0px_#00000040] "
          >
            <div className="flex items-center justify-center font-bold text-base bg-[#37A16C] border-t border-b rounded-xl border-[#36BD79] w-full px-5 py-4 h-full ">
              Save the world
            </div>
          </button>
        </div>
      </div>
      <section className="-mt-[150px] relative">
        <Clouds />
        <BirdAnimation />
        {treeCount > 1 && <FlockOfBirds />}
        <Mountains treeCount={treeCount} />
      </section>
      <Pledge />
      <Mission />
      <Pledge2 />
      <Gallery />
      <Plant />
      <ContactUs />
    </main>
  );
}
