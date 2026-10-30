import { HomeHero } from "@/components/home-hero";
import { getShellData } from "@/sanity/fetch";

export const revalidate = 3600;

export default async function HomePage() {
  const shell = await getShellData();
  return <HomeHero src={shell.portraitUrl} />;
}
