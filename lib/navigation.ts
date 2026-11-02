export interface NavItem {
  name: string;
  slug: string;
  position: "header" | "sidebar";
  type?: "button";
}

export const siteTitle = "Hjörtur Jóhannsson";
export const siteSubtitle = "Pianist/Composer/Arranger";

export const pages: NavItem[] = [
  { name: "About", slug: "/about", position: "header" },
  { name: "News", slug: "/news", position: "header" },
  { name: "Concerts", slug: "/concerts", position: "header" },
  { name: "Curriculum vitae", slug: "/curriculum-vitae", position: "header" },
  { name: "Projects", slug: "/projects", position: "sidebar" },
  { name: "Contact", slug: "/contact", position: "sidebar" },
  { name: "ISL/ENG", slug: "", position: "sidebar", type: "button" },
];

export function isActive(pathname: string, slug: string, partial: boolean): boolean {
  if (!slug) return false;
  if (pathname === slug) return true;
  return partial && pathname.startsWith(`${slug}/`);
}

export function mobileLabel(pathname: string): string {
  if (pathname === "/") return "";
  if (pathname.startsWith("/projects")) return "Projects";
  if (pathname.startsWith("/news")) return "News";
  if (pathname.startsWith("/concerts")) return "Concerts";
  if (pathname.startsWith("/about")) return "About";
  if (pathname.startsWith("/contact")) return "Contact";
  if (pathname.startsWith("/curriculum-vitae")) return "Curriculum vitae";
  return "";
}

export function backHref(pathname: string): string | null {
  if (pathname.startsWith("/projects/") && pathname !== "/projects") return "/projects";
  if (pathname.startsWith("/news/") && pathname !== "/news") return "/news";
  if (pathname.startsWith("/concerts/") && pathname !== "/concerts") return "/concerts";
  return null;
}
