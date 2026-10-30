import { defineArrayMember, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Texti",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Venjulegt", value: "normal" },
        { title: "Fyrirsögn", value: "h1" },
        { title: "Undirfyrirsögn", value: "h2" },
        { title: "Tilvitnun", value: "blockquote" },
      ],
      lists: [
        { title: "Punktar", value: "bullet" },
        { title: "Númer", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Feitletrað", value: "strong" },
          { title: "Skáletrað", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Hlekkur",
            fields: [{ name: "href", type: "url", title: "Slóð" }],
          },
        ],
      },
    }),
  ],
});
