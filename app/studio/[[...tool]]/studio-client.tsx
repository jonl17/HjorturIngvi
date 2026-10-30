"use client";

import dynamic from "next/dynamic";
import { publicSanityEnv } from "@/sanity/env";

const Studio = dynamic(() => import("./next-studio"), { ssr: false });

export function StudioClient() {
  if (!publicSanityEnv().configured) {
    return (
      <main className="page">
        <h1 className="bold">Studio</h1>
        <p>Studio is not configured yet.</p>
      </main>
    );
  }
  return <Studio />;
}
