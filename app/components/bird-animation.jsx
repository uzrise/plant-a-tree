import React from "react";
import FlyingBird from "./flying-bird";

const BirdAnimation = () => {
  return (
    <div className="absolute top-[56%] z-10 left-[36%] animate-fly">
      <FlyingBird />
    </div>
  );
};

export default BirdAnimation;
