import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titill", type: "string" }),
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
    defineField({
      name: "forsiduMynd",
      title: "Forsíðumynd",
      type: "image",
      options: { hotspot: true },
      description: "Myndin hægra megin á forsíðu og á About.",
    }),
    defineField({
      name: "secondImage",
      title: "Önnur mynd",
      type: "image",
      options: { hotspot: true },
      description: "Myndin hægra megin á öðrum síðum.",
    }),
    defineField({
      name: "songTitle",
      title: "Titill lags",
      type: "string",
      description: "Titillinn sem birtist í spilaranum.",
    }),
    defineField({
      name: "song",
      title: "Lag",
      type: "file",
      options: { accept: "audio/mpeg" },
      description: "Hljóðskrá (mp3) sem spilarinn spilar.",
    }),
  ],
});
