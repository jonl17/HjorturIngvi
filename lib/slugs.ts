import slugify from "slugify";

/** Canonical slug. Keeps Icelandic letters, NFC, lower case. Never transliterates. */
export function slugFromTitle(title: string): string {
  return title
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * The route Gatsby built with slugify@1.3.6 and no options.
 * That call keeps case and transliterates Icelandic letters.
 */
export function legacyProjectSlug(title: string): string {
  return slugify(title);
}

export function uniqueSlug(base: string, used: Set<string>): string {
  if (!base) return base;
  if (!used.has(base)) {
    used.add(base);
    return base;
  }
  let index = 2;
  while (used.has(`${base}-${index}`)) index += 1;
  const slug = `${base}-${index}`;
  used.add(slug);
  return slug;
}

export function hasNonAscii(value: string): boolean {
  return /[^\u0000-\u007f]/.test(value);
}
