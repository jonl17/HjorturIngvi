import type { Metadata } from "next";
import { EmptyState } from "@/components/empty-state";
import { NewsItem } from "@/components/news-item";
import { getNews } from "@/sanity/fetch";

export const revalidate = 3600;

export const metadata: Metadata = { title: "News" };

export default async function NewsPage() {
  const news = await getNews();
  if (!news || news.length === 0) return <EmptyState />;
  return (
    <>
      {news.map((item) => (
        <NewsItem key={item.slug} item={item} linked />
      ))}
    </>
  );
}
