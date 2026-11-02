import { about } from "@/sanity/schemaTypes/about";
import { blockContent } from "@/sanity/schemaTypes/blockContent";
import { concert } from "@/sanity/schemaTypes/concert";
import { contact } from "@/sanity/schemaTypes/contact";
import { cv } from "@/sanity/schemaTypes/cv";
import { news } from "@/sanity/schemaTypes/news";
import { project } from "@/sanity/schemaTypes/project";
import { siteLinks } from "@/sanity/schemaTypes/siteLinks";

export const schemaTypes = [blockContent, about, news, concert, contact, project, siteLinks, cv];

export const singletonTypes = new Set(["about", "contact", "siteLinks", "cv"]);
