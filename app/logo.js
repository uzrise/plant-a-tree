import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo1.png"
      width={139}
      height={40}
      alt="Plant a Tree Logo"
      priority
    />
  );
}
