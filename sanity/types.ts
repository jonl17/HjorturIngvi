export type PortableBlocks = Array<{ _type: string; _key?: string }>;

export interface ServiceLink {
  serviceName: string;
  serviceUrl: string;
}

export interface ShellData {
  portraitUrl: string;
  secondUrl: string;
  songTitle: string;
  songUrl: string | null;
  services: ServiceLink[];
}

export interface AboutDocument {
  title: string;
  bodyIs: PortableBlocks;
  bodyEn: PortableBlocks;
}

export interface NewsItem {
  title: string;
  titleEn: string | null;
  slug: string;
  date: string | null;
  imageUrl: string | null;
  imageWidth: number;
  imageHeight: number;
  bodyIs: PortableBlocks;
  bodyEn: PortableBlocks;
}

export interface ConcertItem {
  title: string;
  titleEn: string | null;
  slug: string;
  venue: string;
  date: string | null;
  ticketsRequired: boolean;
  buyTicketLink: string | null;
  eventLink: string | null;
}

export interface ProjectItem {
  title: string;
  titleEn: string | null;
  slug: string;
  imageUrl: string | null;
  imageWidth: number;
  imageHeight: number;
  bodyIs: PortableBlocks;
  bodyEn: PortableBlocks;
}

export interface ContactDocument {
  email: string;
  telephone: string;
}

export interface CvDocument {
  title: string;
  bodyIs: PortableBlocks;
  bodyEn: PortableBlocks;
}
