"use client";
import Image from "next/image";

function Pledge2() {
  return (
    <section className="py-[96px] bg-[#F5F6F7] bg-no-repeat bg-right w-full">
      <div className="container items-center mx-auto flex gap-[64px] h-[576px] px-[32px]  bg-[url('/images/pledge-2.png')]  bg-cover">
        <div className="flex flex-col gap-4 max-w-[576px]">
          <h1 className="text-[#202225] font-semibold text-4xl">
            Our Pledge Planting Trees for the Future, With Expert Care{" "}
          </h1>
          <p className="text-[#787F84] text-[22px] font-medium">
            We make a firm pledge to each of our patrons and the planet – the
            trees you help plant will not be cut down. We’re planting for the
            future, establishing living legacies that contribute to long-term
            environmental sustainability and biodiversity. Working closely with
            forestry professionals, we ensure that every tree is planted and
            nurtured according to their expert guidance. Our commitment to
            professional, careful stewardship ensures the best possible start
            for each sapling we plant.
          </p>
          <button className="mt-7 font-semibold text-sm w-fit rounded-[48px] text-white p-[12px_24px_12px_24px] bg-[#37A16C] border-[#36BD79] border">
            Plant now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Pledge2;
