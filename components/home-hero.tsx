import Image from "next/image";

export function HomeHero({ src }: { src: string | null }) {
  if (!src) return null;
  return (
    <div className="home-hero mobile-only">
      <Image src={src} alt="" width={800} height={1000} />
    </div>
  );
}
