"use client";
import React, { useState, useEffect } from "react";
import FlyingBird from "./flying-bird";

const FlockOfBirds = () => {
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    const createFlock = () => {
      const newBirds = Array.from({ length: 7 }).map((_, index) => {
        const sizeFactor = 1 + index * 0.3; // Larger birds at the back
        return {
          id: index,
          startX: -100 + index * 5, // Birds move slightly to the right for each row
          startY: 40 + index * 3, // Birds are positioned lower as you go right
          delay: index * 0.5, // Delay between each bird's flight
          duration: 10, // Flying time for each bird
          size: sizeFactor, // Birds vary in size
        };
      });
      setBirds(newBirds);
    };

    createFlock();
  }, []);

  return (
    <div className="absolute top-0 h-[92px] w-full overflow-hidden bg-transparent z-10">
      <div
        className="absolute animate-flyStraight"
        style={{
          top: "-10%",
          left: "-92%",

          animationDuration: "10s",
          animationDelay: "0s",
        }}
      >
        <FlyingBird size={30} />
      </div>

      {/* Bird 2 */}
      <div
        className="absolute animate-flyStraight"
        style={{
          top: "-5%",
          left: "-86%",

          animationDuration: "10s",
          animationDelay: "0.5s",
        }}
      >
        <FlyingBird size={30} />
      </div>

      {/* Bird 3 */}
      <div
        className="absolute animate-flyStraight"
        style={{
          top: "40%",
          left: "-77%",
          animationDuration: "10s",
          animationDelay: "1s",
        }}
      >
        <FlyingBird size={40} />
      </div>

      {/* Bird 4 */}
      <div
        className="absolute animate-flyStraight"
        style={{
          top: "17%",
          left: "-70%",
          animationDuration: "10s",
          animationDelay: "1.5s",
        }}
      >
        <FlyingBird size={40} />
      </div>

      {/* Bird 5 */}
      <div
        className="absolute animate-flyStraight"
        style={{
          top: "50%",
          left: "-63%",
          animationDuration: "10s",
          animationDelay: "2s",
        }}
      >
        <FlyingBird size={50} />
      </div>

      {/* Bird 6 */}
      <div
        className="absolute animate-flyStraight"
        style={{
          top: "20%",
          left: "-55%",
          animationDuration: "10s",
          animationDelay: "2.5s",
        }}
      >
        <FlyingBird size={40} />
      </div>

      {/* Bird 7 */}
      <div
        className="absolute animate-flyStraight"
        style={{
          top: "60%",
          left: "-48%",
          animationDuration: "10s",
          animationDelay: "3s",
        }}
      >
        <FlyingBird size={50} />
      </div>
    </div>
  );
};

export default FlockOfBirds;
