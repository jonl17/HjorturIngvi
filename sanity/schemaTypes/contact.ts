import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titill",
      type: "string",
      initialValue: "Contact",
    }),
    defineField({ name: "email", title: "Netfang", type: "string" }),
    defineField({ name: "telephone", title: "Sími", type: "string" }),
  ],
});
