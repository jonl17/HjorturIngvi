import { defineField, defineType } from "sanity";
import { slugFromTitle } from "@/lib/slugs";

export const concert = defineType({
  name: "concert",
  title: "Concerts",
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
    defineField({ name: "venue", title: "Staður", type: "string" }),
    defineField({ name: "date", title: "Dagsetning", type: "datetime" }),
    defineField({
      name: "ticketsRequired",
      title: "Miða krafist",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "buyTicketLink",
      title: "Miðatengill",
      type: "url",
      description: "T.d. miði.is",
    }),
    defineField({
      name: "eventLink",
      title: "Viðburðartengill",
      type: "url",
      description: "T.d. facebook event síða",
    }),
  ],
  orderings: [{ title: "Eldra fyrst", name: "dateAsc", by: [{ field: "date", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "venue" },
  },
});
