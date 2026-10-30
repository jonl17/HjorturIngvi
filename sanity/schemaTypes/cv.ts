import { defineField, defineType } from "sanity";

export const cv = defineType({
  name: "cv",
  title: "CV",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titill", type: "string" }),
    defineField({
      name: "body_is",
      title: "Texti (íslenska)",
      type: "blockContent",
      description: "Láttu ártal vera fyrirsögn (H1) og færslurnar punktalista.",
    }),
    defineField({
      name: "body_en",
      title: "Texti (enska)",
      type: "blockContent",
      description: "Enski textinn. Ef hann er tómur birtist íslenski textinn.",
    }),
  ],
});
