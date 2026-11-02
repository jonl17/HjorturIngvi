import type { Metadata } from "next";
import { ConcertList } from "@/components/concert-list";
import { EmptyState } from "@/components/empty-state";
import { getConcerts } from "@/sanity/fetch";

export const revalidate = 3600;

export const metadata: Metadata = { title: "Concerts" };

export default async function ConcertsPage() {
  const concerts = await getConcerts();
  if (!concerts || concerts.length === 0) return <EmptyState />;
  return <ConcertList concerts={concerts} />;
}
