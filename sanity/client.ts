import "server-only";
import { createClient, type SanityClient } from "next-sanity";
import { publicSanityEnv } from "@/sanity/env";

/**
 * One shared read client for public pages.
 * CDN only. The read token is intentionally unused so drafts stay off this client.
 */
export function getReadClient(): SanityClient | null {
  const { projectId, dataset, configured } = publicSanityEnv();
  if (!configured) return null;
  try {
    return createClient({
      projectId,
      dataset,
      apiVersion: "2024-10-28",
      useCdn: true,
      perspective: "published",
    });
  } catch {
    return null;
  }
}
