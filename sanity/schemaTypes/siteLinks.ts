import { defineArrayMember, defineField, defineType } from "sanity";

const serviceNames = ["Spotify", "Youtube", "Facebook", "Soundcloud", "Instagram"];

export const siteLinks = defineType({
  name: "siteLinks",
  title: "External links",
  type: "document",
  fields: [
    defineField({
      name: "services",
      title: "Tenglar",
      type: "array",
      description: "Tenglar í fæti og í valmynd.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "serviceName",
              title: "Nafn",
              type: "string",
              options: { list: serviceNames },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "serviceUrl",
              title: "Slóð",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "serviceName", subtitle: "serviceUrl" } },
        }),
      ],
    }),
  ],
});
