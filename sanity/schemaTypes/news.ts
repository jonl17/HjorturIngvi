import { defineField, defineType } from "sanity";
import { slugFromTitle } from "@/lib/slugs";

export const news = defineType({
  name: "news",
  title: "News",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titill", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "title_en",
      title: "Enskur titill",
      type: "string",
      description: "Ef þetta er tómt birtist íslenski titillinn.",
    }),
    defineField({
      name: "slug",
      title: "Slóð",
      type: "slug",
      description: "Heldur íslenskum stöfum. Ekki umrita eða fella niður.",
      options: { source: "title", maxLength: 96, slugify: slugFromTitle },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Dagsetning",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      description:
        "Fréttir raðast eftir þessari dagsetningu. Ef þú velur ekkert hér verður dagsetningin í dag.",
    }),
    defineField({
      name: "image",
      title: "Mynd",
      type: "image",
      options: { hotspot: true },
      description: "Mynd, ekki skyld.",
    }),
    defineField({
      name: "body_is",
      title: "Texti (íslenska)",
      type: "blockContent",
      description: "Íslenski textinn.",
    }),
    defineField({
      name: "body_en",
      title: "Texti (enska)",
      type: "blockContent",
      description: "Enski textinn. Ef hann er tómur birtist íslenski textinn.",
    }),
  ],
  orderings: [{ title: "Nýjast efst", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "date", media: "image" },
  },
});
