import { defineField, defineType } from "sanity";
import { slugFromTitle } from "@/lib/slugs";

export const project = defineType({
  name: "project",
  title: "Projects",
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
      description:
        "Heldur íslenskum stöfum. Gamla slóðin úr slugify(title) vísar hingað ef hún er önnur.",
      options: { source: "title", maxLength: 96, slugify: slugFromTitle },
      validation: (rule) => rule.required(),
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
  preview: {
    select: { title: "title", media: "image" },
  },
});
