import type { Metadata } from "next";
import { hasBlocks, PortableBody } from "@/components/portable-body";
import { getCv } from "@/sanity/fetch";

export const revalidate = 3600;

export const metadata: Metadata = { title: "Curriculum vitae" };

export default async function CvPage() {
  const cv = await getCv();
  if (!cv || (!hasBlocks(cv.bodyIs) && !hasBlocks(cv.bodyEn))) {
    return <h1 className="bold">Coming soon...</h1>;
  }
  return (
    <div className="cv">
      <PortableBody is={cv.bodyIs} en={cv.bodyEn} />
    </div>
  );
}
