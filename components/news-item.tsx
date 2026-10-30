import Link from "next/link";
import { ExpandableImage } from "@/components/expandable-image";
import { LangText } from "@/components/lang-text";
import { PortableBody } from "@/components/portable-body";
import { formatDisplayDate } from "@/lib/format";
import type { NewsItem as NewsItemData } from "@/sanity/types";

export function NewsItem({ item, linked }: { item: NewsItemData; linked: boolean }) {
  const title = <LangText is={item.title} en={item.titleEn} />;
  return (
    <article className="news-item">
      <p className="news-date bold">{formatDisplayDate(item.date)}</p>
      <h1 className="news-title bold">
        {linked ? <Link href={`/news/${item.slug}`}>{title}</Link> : title}
      </h1>
      {item.imageUrl ? (
        <ExpandableImage src={item.imageUrl} width={item.imageWidth} height={item.imageHeight} alt={item.title} />
      ) : null}
      <PortableBody is={item.bodyIs} en={item.bodyEn} />
    </article>
  );
}
