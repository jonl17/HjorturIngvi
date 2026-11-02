import type { Metadata } from "next";
import { EmptyState } from "@/components/empty-state";
import { hasBlocks, PortableBody } from "@/components/portable-body";
import { getAbout } from "@/sanity/fetch";

export const revalidate = 3600;

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const about = await getAbout();
  if (!about || (!hasBlocks(about.bodyIs) && !hasBlocks(about.bodyEn))) return <EmptyState />;
  return (
    <div className="about">
      <PortableBody is={about.bodyIs} en={about.bodyEn} />
    </div>
  );
}
