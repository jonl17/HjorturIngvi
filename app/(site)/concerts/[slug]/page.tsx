import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/back-link";
import { ConcertList } from "@/components/concert-list";
import { getConcert, getConcertSlugs } from "@/sanity/fetch";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getConcertSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const concert = await getConcert(decodeSlug(slug));
  return { title: concert?.title ?? "Concerts" };
}

export default async function ConcertPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concert = await getConcert(decodeSlug(slug));
  if (!concert) notFound();
  return (
    <>
      <BackLink href="/concerts" label="Concerts" />
      <ConcertList concerts={[concert]} />
    </>
  );
}

function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}
