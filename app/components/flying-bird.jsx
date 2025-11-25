"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const FlyingBird = ({ size = 42 }) => {
  const [isWingUp, setIsWingUp] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWingUp((prev) => !prev); // Qanot holatini almashtirish
    }, 300); // Har 300 millisekundda almashadi

    return () => clearInterval(interval); // Intervalni tozalash
  }, []);

  return (
    <Image
      src={isWingUp ? "/images/bird_wing_up.png" : "/images/bird_wing_down.png"}
      width={size}
      height={size}
      alt="Flying bird"
      className={`size-[${size}]`}
    />
  );
};

export default FlyingBird;
