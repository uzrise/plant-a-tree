import React from "react";
import FlyingBird from "./flying-bird";

const BirdAnimation = () => {
  return (
    <div className="absolute top-[45%] sm:top-[50%] md:top-[52%] lg:top-[54%] xl:top-[56%] z-10 left-[30%] sm:left-[33%] md:left-[34%] lg:left-[35%] xl:left-[36%] animate-fly">
      <FlyingBird sizeVariant={2} />
    </div>
  );
};

export default BirdAnimation;
