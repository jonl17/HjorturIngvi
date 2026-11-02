import { SiteShell } from "@/components/site-shell";
import { getShellData } from "@/sanity/fetch";

export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const shell = await getShellData();
  return <SiteShell shell={shell}>{children}</SiteShell>;
}
