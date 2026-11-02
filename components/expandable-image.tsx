"use client";

import { useState } from "react";
import Image from "next/image";

export function ExpandableImage({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <figure className={open ? "figure is-open" : "figure"}>
      <Image src={src} alt={alt} width={width} height={height} />
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Shrink image" : "Enlarge image"}>
        <Image src={open ? "/ui/ex.png" : "/ui/plus.png"} alt="" width={45} height={45} />
      </button>
    </figure>
  );
}
