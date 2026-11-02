import type { StructureResolver } from "sanity/structure";

const singletons = [
  { id: "about", title: "About", type: "about" },
  { id: "contact", title: "Contact", type: "contact" },
  { id: "siteLinks", title: "External links", type: "siteLinks" },
  { id: "cv", title: "CV", type: "cv" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Efni")
    .items([
      ...singletons.map((item) =>
        S.listItem()
          .title(item.title)
          .id(item.id)
          .child(S.document().schemaType(item.type).documentId(item.id).title(item.title)),
      ),
      S.divider(),
      S.documentTypeListItem("news").title("News"),
      S.documentTypeListItem("concert").title("Concerts"),
      S.documentTypeListItem("project").title("Projects"),
    ]);
