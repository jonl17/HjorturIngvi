import "server-only";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableBlocks } from "@/sanity/types";

const components: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <blockquote>
        <p>{children}</p>
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      const external = href.startsWith("http");
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
};

export function hasBlocks(blocks: PortableBlocks | null | undefined): boolean {
  return Array.isArray(blocks) && blocks.length > 0;
}

export function PortableBody({ is, en }: { is: PortableBlocks; en: PortableBlocks }) {
  const english = hasBlocks(en) ? en : is;
  if (!hasBlocks(is) && !hasBlocks(english)) return null;
  return (
    <>
      <div className="lang-is rich">
        <PortableText value={is} components={components} />
      </div>
      <div className="lang-en rich">
        <PortableText value={english} components={components} />
      </div>
    </>
  );
}
