"use client";
import Image from "next/image";

function Pledge() {
  return (
    <section className="py-[96px] bg-[#F5F6F7] w-full">
      <div className="container items-center mx-auto flex gap-[64px] px-[32px]">
        <div className="flex flex-col gap-4">
          <h1 className="text-[#202225] font-semibold text-4xl">
            Our Pledge to Protect and Nurture the Environment
          </h1>
          <p className="text-[#787F84] text-[22px] font-medium">
            Here at our initiative, we’re driven by a deep-seated respect for
            our environment and the critical role each tree plays in our
            planet’s health. This is why we’ve dedicated ourselves to aid
            reforestation efforts, focusing primarily within the European Union.
            Our initiative is not just a simple tree planting project, it’s a
            testament to our commitment to the planet, a legacy we’re leaving
            for future generations.
          </p>
          <button className="mt-7 font-semibold text-sm w-fit rounded-[48px] text-white p-[12px_24px_12px_24px] bg-[#37A16C] border-[#36BD79] border">
            Plant now
          </button>
        </div>
        <Image
          src="/images/trees.png"
          alt="tree image"
          width={576}
          height={480}
          className="min-w-[576px]"
        />
      </div>
    </section>
  );
}

export default Pledge;
