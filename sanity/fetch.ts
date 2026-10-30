import "server-only";
import { cache } from "react";
import { getReadClient } from "@/sanity/client";
import { sanityImageUrl, scaledHeight } from "@/sanity/image";
import type {
  AboutDocument,
  ConcertItem,
  ContactDocument,
  CvDocument,
  NewsItem,
  PortableBlocks,
  ProjectItem,
  ShellData,
} from "@/sanity/types";
import {
  fallbackPortrait,
  fallbackSecondPortrait,
  fallbackServices,
  fallbackSongTitle,
} from "@/lib/fallback-content";

interface ImageAsset {
  assetId?: string | null;
  width?: number | null;
  height?: number | null;
}

const imageProjection = `{
  "assetId": asset->_id,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const shellQuery = `{
  "about": *[_type == "about"][0]{
    songTitle,
    "songUrl": song.asset->url,
    "portrait": forsiduMynd${imageProjection},
    "second": secondImage${imageProjection}
  },
  "links": *[_type == "siteLinks"][0]{
    services[]{ serviceName, serviceUrl }
  }
}`;

const aboutQuery = `*[_type == "about"][0]{
  title,
  body_is,
  body_en
}`;

const newsListQuery = `*[_type == "news"] | order(date desc){
  title,
  title_en,
  "slug": slug.current,
  date,
  "image": image${imageProjection},
  body_is,
  body_en
}`;

const newsItemQuery = `*[_type == "news" && slug.current == $slug][0]{
  title,
  title_en,
  "slug": slug.current,
  date,
  "image": image${imageProjection},
  body_is,
  body_en
}`;

const newsSlugsQuery = `*[_type == "news" && defined(slug.current)]{ "slug": slug.current }`;

const concertListQuery = `*[_type == "concert"] | order(date asc){
  title,
  title_en,
  "slug": slug.current,
  venue,
  date,
  ticketsRequired,
  buyTicketLink,
  eventLink
}`;

const concertItemQuery = `*[_type == "concert" && slug.current == $slug][0]{
  title,
  title_en,
  "slug": slug.current,
  venue,
  date,
  ticketsRequired,
  buyTicketLink,
  eventLink
}`;

const concertSlugsQuery = `*[_type == "concert" && defined(slug.current)]{ "slug": slug.current }`;

const projectListQuery = `*[_type == "project"] | order(title asc){
  title,
  title_en,
  "slug": slug.current,
  "image": image${imageProjection},
  body_is,
  body_en
}`;

const projectItemQuery = `*[_type == "project" && slug.current == $slug][0]{
  title,
  title_en,
  "slug": slug.current,
  "image": image${imageProjection},
  body_is,
  body_en
}`;

const contactQuery = `*[_type == "contact"][0]{ email, telephone }`;

const cvQuery = `*[_type == "cv"][0]{ title, body_is, body_en }`;

interface RawShell {
  about?: {
    songTitle?: string | null;
    songUrl?: string | null;
    portrait?: ImageAsset | null;
    second?: ImageAsset | null;
  } | null;
  links?: { services?: Array<{ serviceName?: string | null; serviceUrl?: string | null }> | null } | null;
}

interface RawBody {
  title?: string | null;
  body_is?: PortableBlocks | null;
  body_en?: PortableBlocks | null;
}

interface RawNews extends RawBody {
  title_en?: string | null;
  slug?: string | null;
  date?: string | null;
  image?: ImageAsset | null;
}

interface RawConcert {
  title?: string | null;
  title_en?: string | null;
  slug?: string | null;
  venue?: string | null;
  date?: string | null;
  ticketsRequired?: boolean | null;
  buyTicketLink?: string | null;
  eventLink?: string | null;
}

type RawProject = RawNews;

/**
 * The only public read path. Cached for an hour and tagged for the webhook.
 * Returns null when Sanity is not configured or the read fails, so the build still finishes.
 */
export const sanityFetch = cache(async function sanityFetch<Result>(
  query: string,
  tagList: string,
  paramsJson = "{}",
): Promise<Result | null> {
  const client = getReadClient();
  if (!client) return null;
  try {
    const params = JSON.parse(paramsJson) as Record<string, unknown>;
    const tags = tagList.split(",").filter(Boolean);
    return await client.fetch<Result>(query, params, {
      next: { revalidate: 3600, tags },
    });
  } catch {
    console.error("Sanity read failed");
    return null;
  }
});

function blocks(value: PortableBlocks | null | undefined): PortableBlocks {
  return Array.isArray(value) ? value : [];
}

function picture(image: ImageAsset | null | undefined, width: number): {
  imageUrl: string | null;
  imageWidth: number;
  imageHeight: number;
} {
  const imageUrl = sanityImageUrl(image?.assetId, width);
  return {
    imageUrl,
    imageWidth: width,
    imageHeight: scaledHeight(width, image?.width, image?.height),
  };
}

const emptyShell: ShellData = {
  portraitUrl: fallbackPortrait,
  secondUrl: fallbackSecondPortrait,
  songTitle: fallbackSongTitle,
  songUrl: null,
  services: fallbackServices,
};

export async function getShellData(): Promise<ShellData> {
  const data = await sanityFetch<RawShell>(shellQuery, "about,siteLinks");
  if (!data) return emptyShell;
  const services =
    data.links?.services
      ?.filter((item) => item.serviceName && item.serviceUrl)
      .map((item) => ({
        serviceName: item.serviceName as string,
        serviceUrl: item.serviceUrl as string,
      })) ?? null;
  return {
    portraitUrl: sanityImageUrl(data.about?.portrait?.assetId, 1000) ?? emptyShell.portraitUrl,
    secondUrl: sanityImageUrl(data.about?.second?.assetId, 1000) ?? emptyShell.secondUrl,
    songTitle: data.about?.songTitle?.trim() || emptyShell.songTitle,
    songUrl: data.about?.songUrl ?? null,
    services: data.links ? (services ?? []) : emptyShell.services,
  };
}

export async function getAbout(): Promise<AboutDocument | null> {
  const data = await sanityFetch<RawBody | null>(aboutQuery, "about");
  if (!data) return null;
  return {
    title: data.title?.trim() || "About",
    bodyIs: blocks(data.body_is),
    bodyEn: blocks(data.body_en),
  };
}

function mapNews(item: RawNews): NewsItem | null {
  if (!item.slug || !item.title) return null;
  const image = picture(item.image, 800);
  return {
    title: item.title,
    titleEn: item.title_en?.trim() || null,
    slug: item.slug,
    date: item.date ?? null,
    imageUrl: image.imageUrl,
    imageWidth: image.imageWidth,
    imageHeight: image.imageHeight,
    bodyIs: blocks(item.body_is),
    bodyEn: blocks(item.body_en),
  };
}

export async function getNews(): Promise<NewsItem[] | null> {
  const data = await sanityFetch<RawNews[] | null>(newsListQuery, "news");
  if (!data) return null;
  return data.flatMap((item) => {
    const mapped = mapNews(item);
    return mapped ? [mapped] : [];
  });
}

export async function getNewsItem(slug: string): Promise<NewsItem | null> {
  const data = await sanityFetch<RawNews | null>(newsItemQuery, "news", JSON.stringify({ slug }));
  if (!data) return null;
  return mapNews(data);
}

export async function getNewsSlugs(): Promise<string[]> {
  const data = await sanityFetch<Array<{ slug?: string | null }> | null>(newsSlugsQuery, "news");
  return data?.flatMap((item) => (item.slug ? [item.slug] : [])) ?? [];
}

function mapConcert(item: RawConcert): ConcertItem | null {
  if (!item.slug || !item.title) return null;
  return {
    title: item.title,
    titleEn: item.title_en?.trim() || null,
    slug: item.slug,
    venue: item.venue?.trim() || "",
    date: item.date ?? null,
    ticketsRequired: Boolean(item.ticketsRequired),
    buyTicketLink: item.buyTicketLink?.trim() || null,
    eventLink: item.eventLink?.trim() || null,
  };
}

export async function getConcerts(): Promise<ConcertItem[] | null> {
  const data = await sanityFetch<RawConcert[] | null>(concertListQuery, "concert");
  if (!data) return null;
  return data.flatMap((item) => {
    const mapped = mapConcert(item);
    return mapped ? [mapped] : [];
  });
}

export async function getConcert(slug: string): Promise<ConcertItem | null> {
  const data = await sanityFetch<RawConcert | null>(concertItemQuery, "concert", JSON.stringify({ slug }));
  if (!data) return null;
  return mapConcert(data);
}

export async function getConcertSlugs(): Promise<string[]> {
  const data = await sanityFetch<Array<{ slug?: string | null }> | null>(concertSlugsQuery, "concert");
  return data?.flatMap((item) => (item.slug ? [item.slug] : [])) ?? [];
}

function mapProject(item: RawProject): ProjectItem | null {
  if (!item.slug || !item.title) return null;
  const image = picture(item.image, 800);
  return {
    title: item.title,
    titleEn: item.title_en?.trim() || null,
    slug: item.slug,
    imageUrl: image.imageUrl,
    imageWidth: image.imageWidth,
    imageHeight: image.imageHeight,
    bodyIs: blocks(item.body_is),
    bodyEn: blocks(item.body_en),
  };
}

export async function getProjects(): Promise<ProjectItem[] | null> {
  const data = await sanityFetch<RawProject[] | null>(projectListQuery, "project");
  if (!data) return null;
  return data.flatMap((item) => {
    const mapped = mapProject(item);
    return mapped ? [mapped] : [];
  });
}

export async function getProject(slug: string): Promise<ProjectItem | null> {
  const data = await sanityFetch<RawProject | null>(projectItemQuery, "project", JSON.stringify({ slug }));
  if (!data) return null;
  return mapProject(data);
}

export async function getContact(): Promise<ContactDocument | null> {
  const data = await sanityFetch<{ email?: string | null; telephone?: string | null } | null>(
    contactQuery,
    "contact",
  );
  if (!data?.email && !data?.telephone) return null;
  return {
    email: data?.email?.trim() || "",
    telephone: data?.telephone?.trim() || "",
  };
}

export async function getCv(): Promise<CvDocument | null> {
  const data = await sanityFetch<RawBody | null>(cvQuery, "cv");
  if (!data) return null;
  return {
    title: data.title?.trim() || "CV",
    bodyIs: blocks(data.body_is),
    bodyEn: blocks(data.body_en),
  };
}
