"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteTitle } from "@/lib/navigation";

export function Portrait({ front, second }: { front: string; second: string }) {
  const pathname = usePathname();
  const src = pathname === "/" || pathname === "/about" ? front : second;
  return (
    <div className="portrait desktop-only">
      <Image src={src} alt={siteTitle} fill sizes="20vw" priority={pathname === "/"} style={{ objectFit: "cover" }} />
    </div>
  );
}
