import "server-only";
import imageUrlBuilder from "@sanity/image-url";
import { publicSanityEnv } from "@/sanity/env";

export function sanityImageUrl(assetId: string | null | undefined, width: number): string | null {
  const { projectId, dataset, configured } = publicSanityEnv();
  if (!configured || !assetId) return null;
  try {
    return imageUrlBuilder({ projectId, dataset })
      .image(assetId)
      .width(width)
      .auto("format")
      .fit("max")
      .url();
  } catch {
    return null;
  }
}

export function scaledHeight(width: number, sourceWidth?: number | null, sourceHeight?: number | null): number {
  if (!sourceWidth || !sourceHeight) return Math.round(width * 0.75);
  return Math.max(1, Math.round(width * (sourceHeight / sourceWidth)));
}
