"use client";

function Mission() {
  return (
    <section className="py-[96px]  w-full">
      <div className="max-w-[768px] mx-auto space-y-5">
        <h1 className="text-[#202225] font-semibold text-5xl text-center">
          Our Pledge to Protect and Nurture the Environment
        </h1>
        <p className="text-[#787F84] text-center text-[22px] font-medium">
          Collect trees in your Plant a Tree account and be part of our
          community
        </p>
      </div>
      <div className="container mt-[64px] mx-auto flex justify-center px-[32px] gap-[32px] ">
        <div className="bg-[#08743E] max-w-[592px] rounded-[24px] h-[372px] p-[36px] text-white border-[#36BD79] flex flex-col border-solid border-2">
          <h2 className="text-4xl font-semibold mb-16"> Personal planting</h2>
          <p className="font-medium text-base mt-auto mb-8">
            Donate a tree with a tag for yourself or your loved ones as a unique
            gift, then download the certificate or virtually gift it! After we
            planted it, we’ll send you a photo of the sapling, complete with
            your personalized tag visible.
          </p>
          <button className="font-semibold text-sm rounded-[48px] w-fit p-[12px_24px_12px_24px] border border-white border-solid">
            Donate now
          </button>
        </div>
        <div className="bg-[#08743E]  max-w-[592px] rounded-[24px] h-[372px] p-[36px] text-white  flex flex-col border-[#36BD79] border-solid border-2">
          <h2 className="text-4xl font-semibold mb-16">Corporate planting</h2>
          <p className="font-medium text-base mt-auto mb-8">
            Donate trees in the name of your company or individuals. You can do
            this online, at events, or in-store, using vouchers if desired.
          </p>
          <button className="font-semibold text-sm rounded-[48px] w-fit p-[12px_24px_12px_24px] border border-white border-solid">
            Be our partner{" "}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Mission;
