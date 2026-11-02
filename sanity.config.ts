import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { publicSanityEnv } from "@/sanity/env";
import { schemaTypes, singletonTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

const env = publicSanityEnv();

export default defineConfig({
  name: "hjortur-ingvi",
  title: "Hjörtur Ingvi",
  basePath: "/studio",
  projectId: env.configured ? env.projectId : "aaaaaaaa",
  dataset: env.dataset || "production",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((template) => !singletonTypes.has(template.schemaType)),
  },
  document: {
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(({ action }) => action !== "duplicate" && action !== "delete")
        : actions,
  },
});
