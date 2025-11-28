"use client";
import { useState } from "react";
import HeroController from "../components/hero-controller";
import Clouds from "../components/clouds";
import Mountains from "../components/mountains";
import BirdAnimation from "../components/bird-animation";
import FlockOfBirds from "../components/flock-of-birds";
import Pledge from "../components/sections/pledge";
import Mission from "../components/sections/mission";
import Pledge2 from "../components/sections/pledge-2";
import Gallery from "../components/sections/gallery";
import Plant from "../components/sections/plant";
import Contributors from "../components/sections/contributors";
import ContactUs from "../components/sections/contact-us";

export default function Home() {
  const [treeCount, setTreeCount] = useState(1);

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <HeroController treeCount={treeCount} setTreeCount={setTreeCount} />
      <section className="relative w-full overflow-hidden h-[200px] sm:h-[250px] md:h-[350px] lg:h-[450px] xl:h-[500px] -mt-4 sm:-mt-8 md:-mt-12 lg:-mt-16 xl:-mt-[120px]">
        <div className="absolute inset-0 w-full h-full lg:scale-90 xl:scale-100 origin-center flex items-end justify-center">
          <Clouds />
          <BirdAnimation />
          {treeCount > 1 && <FlockOfBirds treeCount={treeCount} />}
          <Mountains treeCount={treeCount} />
        </div>
      </section>
      <Pledge />
      <Mission />
      <Pledge2 />
      <Gallery /> 
      <Contributors />
      <Plant />
      <ContactUs />
    </main>
  );
}
