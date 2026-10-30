/**
 * One-off import of the markdown on `master` into Sanity.
 *
 * Only Jón or DevOps runs this, and only after the Sanity project exists.
 * The Next.js app does not import this file.
 *
 *   npm run migrate:dry-run
 *   npx tsx scripts/migrate-from-markdown.ts --dry-run
 *   npx tsx scripts/migrate-from-markdown.ts --dry-run --source /path/to/checkout
 *
 * A real run (no --dry-run) needs NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET and SANITY_MIGRATION_WRITE_TOKEN.
 * Token values are never printed.
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { createReadStream } from "node:fs";
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createClient, type SanityClient } from "@sanity/client";
import matter from "gray-matter";
import { marked, type Token, type Tokens } from "marked";
import { hasNonAscii, legacyProjectSlug, slugFromTitle, uniqueSlug } from "../lib/slugs";

const expected = [
  ["about", 1],
  ["news", 13],
  ["concert", 5],
  ["contact", 1],
  ["project", 1],
  ["siteLinks", 1],
  ["cv", 1],
] as const;

const excludedFile = "chopin-nocturne-op.55-no.1-by-arthur-rubinstein-15154-.mp3";
const icelandicLetters = "áéíóúýþæöðÁÉÍÓÚÝÞÆÖÐ";
const sourceCommit = "18d7220ba572762e4d7f8ee77fb0d2ecd426f67a";

interface Span {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
}

interface MarkDef {
  _type: "link";
  _key: string;
  href: string;
}

interface Block {
  _type: "block";
  _key: string;
  style: string;
  markDefs: MarkDef[];
  children: Span[];
  listItem?: "bullet" | "number";
  level?: number;
}

interface AssetRecord {
  nfcName: string;
  sha1: string;
  kind: "image" | "file";
  filePath: string;
}

interface BuiltDocument {
  _id: string;
  _type: string;
  [key: string]: unknown;
}

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const sourceFlag = args.indexOf("--source");
const sourceArg = sourceFlag >= 0 ? args[sourceFlag + 1] : undefined;

const failures: string[] = [];

function fail(message: string) {
  failures.push(message);
}

function repoRoot(): string {
  return process.cwd();
}

function materialiseSource(): { staticDir: string; cleanup: () => void } {
  if (sourceArg) {
    const withStatic = path.join(sourceArg, "static");
    const direct = existsDir(path.join(sourceArg, "about")) ? sourceArg : withStatic;
    if (!existsDir(direct)) {
      console.error("Source folder was not found.");
      process.exit(1);
    }
    return { staticDir: direct, cleanup: () => undefined };
  }
  const dir = mkdtempSync(path.join(tmpdir(), "hjortur-source-"));
  const archivePath = path.join(dir, "static.tar");
  execFileSync("git", ["archive", `--output=${archivePath}`, sourceCommit, "static"], { cwd: repoRoot() });
  execFileSync("tar", ["-xf", archivePath, "-C", dir]);
  return {
    staticDir: path.join(dir, "static"),
    cleanup: () => rmSync(dir, { recursive: true, force: true }),
  };
}

function existsDir(value: string): boolean {
  try {
    return statSync(value).isDirectory();
  } catch {
    return false;
  }
}

function asString(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return "";
}

function asBoolean(value: unknown): boolean {
  return value === true || value === "true";
}

function splitLanguages(markdown: string): { is: string; en: string } {
  const lines = markdown.replace(/^\uFEFF/, "").split(/\r?\n/);
  const index = lines.findIndex((line) => /^\s*\\?-ENSKA-\s*$/.test(line));
  if (index === -1) return { is: markdown.trim(), en: "" };
  return {
    is: lines.slice(0, index).join("\n").trim(),
    en: lines.slice(index + 1).join("\n").trim(),
  };
}

function keyFor(seed: string): string {
  return createHash("sha1").update(seed).digest("hex").slice(0, 12);
}

function inlineTokens(tokens: Token[] | undefined, marks: string[], markDefs: MarkDef[], seed: string): Span[] {
  if (!tokens) return [];
  const spans: Span[] = [];
  tokens.forEach((token, index) => {
    const seedPart = `${seed}.${index}`;
    if (token.type === "text" || token.type === "escape" || token.type === "codespan") {
      const text = "text" in token ? token.text : "";
      if (text) spans.push({ _type: "span", _key: keyFor(seedPart + text), text, marks: [...marks] });
      return;
    }
    if (token.type === "strong" || token.type === "em") {
      const mark = token.type === "strong" ? "strong" : "em";
      spans.push(...inlineTokens(token.tokens, [...marks, mark], markDefs, seedPart));
      return;
    }
    if (token.type === "link") {
      const link = token as Tokens.Link;
      const linkKey = keyFor(`${seedPart}:${link.href}`);
      markDefs.push({ _type: "link", _key: linkKey, href: link.href });
      spans.push(...inlineTokens(link.tokens, [...marks, linkKey], markDefs, seedPart));
      return;
    }
    if (token.type === "br") {
      spans.push({ _type: "span", _key: keyFor(seedPart), text: "\n", marks: [...marks] });
      return;
    }
    if ("tokens" in token && token.tokens) {
      spans.push(...inlineTokens(token.tokens, marks, markDefs, seedPart));
      return;
    }
    if ("text" in token && token.text) {
      spans.push({ _type: "span", _key: keyFor(seedPart + token.text), text: token.text, marks: [...marks] });
    }
  });
  return mergeSpans(spans);
}

function mergeSpans(spans: Span[]): Span[] {
  const merged: Span[] = [];
  for (const span of spans) {
    const previous = merged[merged.length - 1];
    if (previous && previous.marks.join("|") === span.marks.join("|")) {
      previous.text += span.text;
      continue;
    }
    merged.push({ ...span, marks: [...span.marks] });
  }
  return merged.filter((span) => span.text.length > 0);
}

function makeBlock(style: string, tokens: Token[] | undefined, seed: string, list?: { listItem: "bullet" | "number"; level: number }): Block | null {
  const markDefs: MarkDef[] = [];
  const children = inlineTokens(tokens, [], markDefs, seed);
  if (children.length === 0) return null;
  const block: Block = {
    _type: "block",
    _key: keyFor(`${seed}:${style}:${children.map((child) => child.text).join("")}`),
    style,
    markDefs,
    children,
  };
  if (list) {
    block.listItem = list.listItem;
    block.level = list.level;
  }
  return block;
}

function blocksFromTokens(tokens: Token[], seed: string): Block[] {
  const blocks: Block[] = [];
  tokens.forEach((token, index) => {
    const seedPart = `${seed}.${index}`;
    if (token.type === "space") return;
    if (token.type === "paragraph") {
      const block = makeBlock("normal", token.tokens, seedPart);
      if (block) blocks.push(block);
      return;
    }
    if (token.type === "heading") {
      const heading = token as Tokens.Heading;
      const style = heading.depth <= 1 ? "h1" : heading.depth === 2 ? "h2" : "normal";
      const block = makeBlock(style, heading.tokens, seedPart);
      if (block) blocks.push(block);
      return;
    }
    if (token.type === "blockquote") {
      const quote = token as Tokens.Blockquote;
      quote.tokens?.forEach((child, childIndex) => {
        if (child.type !== "paragraph") return;
        const block = makeBlock("blockquote", child.tokens, `${seedPart}.${childIndex}`);
        if (block) blocks.push(block);
      });
      return;
    }
    if (token.type === "list") {
      const list = token as Tokens.List;
      const listItem = list.ordered ? "number" : "bullet";
      list.items.forEach((item, itemIndex) => {
        const paragraph = item.tokens?.find((child) => child.type === "paragraph" || child.type === "text");
        const inline = paragraph && "tokens" in paragraph ? paragraph.tokens : item.tokens;
        const block = makeBlock("normal", inline, `${seedPart}.${itemIndex}`, { listItem, level: 1 });
        if (block) blocks.push(block);
      });
      return;
    }
    if ("tokens" in token && token.tokens) {
      blocks.push(...blocksFromTokens(token.tokens, seedPart));
      return;
    }
    if ("text" in token && token.text.trim()) {
      const block = makeBlock("normal", [{ type: "text", text: token.text, raw: token.text } as Token], seedPart);
      if (block) blocks.push(block);
    }
  });
  return blocks;
}

function toBlocks(markdown: string, seed: string): Block[] {
  if (!markdown.trim()) return [];
  return blocksFromTokens(marked.lexer(markdown), seed);
}

function compact(value: string): string {
  return value
    .normalize("NFC")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[^\p{L}\p{N}]+/gu, "")
    .toLowerCase();
}

function spanText(blocks: Block[]): string {
  return blocks.map((block) => block.children.map((child) => child.text).join("")).join("");
}

function checkBody(label: string, markdown: string, blocks: Block[]) {
  const source = compact(markdown);
  if (!source) return;
  const rendered = compact(spanText(blocks));
  if (blocks.length === 0 || rendered !== source) {
    fail(`${label} dropped text (source ${source.length} chars, blocks ${rendered.length} chars)`);
  }
  for (const letter of icelandicLetters) {
    if (markdown.includes(letter) && !spanText(blocks).includes(letter)) {
      fail(`${label} dropped the letter ${letter}`);
    }
  }
}

function documentId(type: string, slug?: string): string {
  if (!slug) return type;
  // A dot marks a private Sanity id, which a tokenless public read cannot see.
  if (/^[A-Za-z0-9_-]+$/.test(slug)) return `${type}-${slug}`;
  return `${type}-${createHash("sha1").update(slug.normalize("NFC")).digest("hex").slice(0, 16)}`;
}

function referenceName(value: string): string {
  const trimmed = value.trim().replace(/\\/g, "/");
  const base = trimmed.split("/").pop() ?? trimmed;
  return base.normalize("NFC");
}

function assetKind(filename: string): "image" | "file" {
  return /\.(mp3|wav|m4a|aac|ogg)$/i.test(filename) ? "file" : "image";
}

function sha1File(filePath: string): string {
  return createHash("sha1").update(readFileSync(filePath)).digest("hex");
}

function indexImages(imagesDir: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const entry of readdirSync(imagesDir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const nfc = entry.name.normalize("NFC");
    const full = path.join(imagesDir, entry.name);
    const existing = map.get(nfc);
    if (!existing || entry.name === nfc) map.set(nfc, full);
  }
  return map;
}

function readMarkdownFiles(folder: string): Array<{ filename: string; data: Record<string, unknown>; content: string }> {
  return readdirSync(folder)
    .filter((name) => name.endsWith(".md"))
    .sort((a, b) => a.normalize("NFC").localeCompare(b.normalize("NFC")))
    .map((filename) => {
      const parsed = matter(readFileSync(path.join(folder, filename), "utf8"));
      return { filename, data: parsed.data as Record<string, unknown>, content: parsed.content };
    });
}

async function main() {
  const { staticDir, cleanup } = materialiseSource();
  try {
    await run(staticDir);
  } finally {
    cleanup();
  }
}

async function run(staticDir: string) {
  const imagesDir = path.join(staticDir, "assets", "images");
  const images = indexImages(imagesDir);
  const assets = new Map<string, AssetRecord>();
  const collapsed: string[] = [];

  const grouped = new Map<string, string[]>();
  for (const entry of readdirSync(imagesDir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const nfc = entry.name.normalize("NFC");
    grouped.set(nfc, [...(grouped.get(nfc) ?? []), entry.name]);
  }
  for (const [nfc, names] of grouped) {
    if (names.length > 1) collapsed.push(`${nfc} (${names.length} filenames, one import)`);
  }

  function attachAsset(raw: unknown, label: string): { _type: "image" | "file"; asset: { _type: "reference"; _ref: string } } | undefined {
    const value = asString(raw);
    if (!value) return undefined;
    const nfcName = referenceName(value);
    if (nfcName === excludedFile) {
      fail(`${label} points at the excluded recording ${excludedFile}`);
      return undefined;
    }
    const filePath = images.get(nfcName);
    if (!filePath) {
      fail(`${label} is missing: ${nfcName}`);
      return undefined;
    }
    const sha1 = sha1File(filePath);
    const kind = assetKind(nfcName);
    if (!assets.has(sha1)) assets.set(sha1, { nfcName, sha1, kind, filePath });
    const refType = kind === "image" ? "image" : "file";
    return { _type: refType, asset: { _type: "reference", _ref: `sha1:${sha1}` } };
  }

  function bodies(content: string, label: string): { body_is: Block[]; body_en: Block[] } {
    const split = splitLanguages(content);
    const body_is = toBlocks(split.is, `${label}:is`);
    const body_en = toBlocks(split.en, `${label}:en`);
    checkBody(`${label} body_is`, split.is, body_is);
    checkBody(`${label} body_en`, split.en, body_en);
    return { body_is, body_en };
  }

  const documents: BuiltDocument[] = [];
  const slugRows: Array<{ type: string; slug: string; id: string }> = [];
  const legacyRoutes: string[] = [];

  const aboutFiles = readMarkdownFiles(path.join(staticDir, "about"));
  for (const file of aboutFiles) {
    const text = bodies(file.content, `about:${file.filename}`);
    documents.push({
      _id: "about",
      _type: "about",
      title: asString(file.data.title) || "About",
      ...text,
      forsiduMynd: attachAsset(file.data["forsidu-mynd"], `${file.filename} forsidu-mynd`),
      secondImage: attachAsset(file.data["second-image"], `${file.filename} second-image`),
      songTitle: asString(file.data.songtitle),
      song: attachAsset(file.data.song, `${file.filename} song`),
    });
  }

  const newsFiles = readMarkdownFiles(path.join(staticDir, "news"));
  const newsSlugs = new Set<string>();
  for (const file of newsFiles) {
    const title = asString(file.data.title);
    const slug = uniqueSlug(slugFromTitle(title), newsSlugs);
    const id = documentId("news", slug);
    slugRows.push({ type: "news", slug, id });
    const text = bodies(file.content, `news:${file.filename}`);
    documents.push({
      _id: id,
      _type: "news",
      title,
      title_en: asString(file.data.title_en),
      slug: { _type: "slug", current: slug },
      date: asString(file.data.date),
      image: attachAsset(file.data.image, `${file.filename} image`),
      ...text,
    });
  }

  const concertFiles = readMarkdownFiles(path.join(staticDir, "concerts"));
  const concertSlugs = new Set<string>();
  for (const file of concertFiles) {
    const title = asString(file.data.title);
    const slug = uniqueSlug(slugFromTitle(title), concertSlugs);
    const id = documentId("concert", slug);
    slugRows.push({ type: "concert", slug, id });
    documents.push({
      _id: id,
      _type: "concert",
      title,
      title_en: asString(file.data.title_en),
      slug: { _type: "slug", current: slug },
      venue: asString(file.data.venue),
      date: asString(file.data.date),
      ticketsRequired: asBoolean(file.data.ticketsrequired),
      buyTicketLink: asString(file.data.buyticketlink) || undefined,
      eventLink: asString(file.data.eventlink) || undefined,
    });
  }

  const contactFiles = readMarkdownFiles(path.join(staticDir, "contact"));
  for (const file of contactFiles) {
    documents.push({
      _id: "contact",
      _type: "contact",
      title: asString(file.data.title) || "Contact",
      email: asString(file.data.email),
      telephone: asString(file.data.telephone),
    });
  }

  const projectFiles = readMarkdownFiles(path.join(staticDir, "projects"));
  const projectSlugs = new Set<string>();
  for (const file of projectFiles) {
    const title = asString(file.data.title);
    const slug = uniqueSlug(slugFromTitle(title), projectSlugs);
    const legacy = legacyProjectSlug(file.data.title as string);
    if (legacy !== slug) legacyRoutes.push(`/projects/${legacy} -> /projects/${slug}`);
    slugRows.push({ type: "project", slug, id: documentId("project", slug) });
    const text = bodies(file.content, `project:${file.filename}`);
    documents.push({
      _id: documentId("project", slug),
      _type: "project",
      title,
      title_en: asString(file.data.title_en),
      slug: { _type: "slug", current: slug },
      image: attachAsset(file.data.image, `${file.filename} image`),
      ...text,
    });
  }

  const linkFiles = readMarkdownFiles(path.join(staticDir, "externallinks"));
  for (const file of linkFiles) {
    const services = Array.isArray(file.data.services) ? file.data.services : [];
    documents.push({
      _id: "siteLinks",
      _type: "siteLinks",
      services: services.map((service, index) => {
        const record = service as Record<string, unknown>;
        const serviceName = asString(record.servicename);
        const serviceUrl = asString(record.serviceurl);
        return {
          _key: keyFor(`${serviceName}:${serviceUrl}:${index}`),
          _type: "object",
          serviceName,
          serviceUrl,
        };
      }),
    });
  }

  const cvFiles = readMarkdownFiles(path.join(staticDir, "cv"));
  for (const file of cvFiles) {
    const text = bodies(file.content, `cv:${file.filename}`);
    documents.push({
      _id: "cv",
      _type: "cv",
      title: asString(file.data.title) || "CV",
      ...text,
    });
  }

  const counts = new Map<string, number>();
  for (const [type] of expected) counts.set(type, 0);
  for (const document of documents) counts.set(document._type, (counts.get(document._type) ?? 0) + 1);

  const referenced = new Set([...assets.values()].map((asset) => asset.nfcName));
  const unreferenced: string[] = [];
  for (const [nfc] of grouped) {
    if (nfc === excludedFile) continue;
    if (!referenced.has(nfc)) unreferenced.push(nfc);
  }
  unreferenced.sort((a, b) => a.localeCompare(b));

  const nonAscii = slugRows.filter((row) => hasNonAscii(row.slug));
  const countLine = expected.map(([type]) => counts.get(type) ?? 0).join("/");

  console.log(dryRun ? "migrate-from-markdown: dry run" : "migrate-from-markdown: write");
  console.log(sourceArg ? `source: ${sourceArg}` : `source: git archive ${sourceCommit} static`);
  console.log(dryRun ? "nothing will be written" : "writing documents");
  console.log("");
  console.log("counts");
  for (const [type, want] of expected) {
    const got = counts.get(type) ?? 0;
    console.log(`  ${type} ${got}${got < want ? " SHORT" : ""}`);
    if (got < want) fail(`${type} count ${got} is below ${want}`);
  }
  console.log(`expected 1/13/5/1/1/1/1`);
  console.log(`actual   ${countLine}`);
  console.log("");
  console.log(`document ids (${documents.length})`);
  for (const document of documents) {
    console.log(`  ${document._id}`);
    if (document._id.includes(".")) fail(`id contains a dot: ${document._id}`);
  }
  console.log("");
  console.log(`non-ASCII slugs (${nonAscii.length})`);
  for (const row of nonAscii) console.log(`  ${row.type} ${row.slug}  _id ${row.id}`);
  console.log("");
  console.log("legacy project routes");
  if (legacyRoutes.length === 0) console.log("  (none)");
  for (const route of legacyRoutes) console.log(`  ${route}`);
  console.log("");
  console.log(`assets ${assets.size} (deduped by sha1, NFC)`);
  for (const asset of [...assets.values()].sort((a, b) => a.nfcName.localeCompare(b.nfcName))) {
    console.log(`  ${asset.kind} ${asset.nfcName} sha1=${asset.sha1.slice(0, 12)}`);
  }
  console.log("");
  console.log("normalised filenames");
  if (collapsed.length === 0) console.log("  (none)");
  for (const line of collapsed) console.log(`  ${line}`);
  console.log("");
  console.log(`unreferenced images, not imported (${unreferenced.length})`);
  for (const name of unreferenced) console.log(`  ${name}`);
  console.log("");
  console.log("excluded");
  console.log(`  ${excludedFile}`);
  console.log("");

  if (failures.length > 0) {
    console.error(`stopped with ${failures.length} problem(s):`);
    for (const problem of failures) console.error(`  ${problem}`);
    process.exit(1);
  }

  if (dryRun) {
    console.log("dry run ok");
    return;
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "";
  const token = process.env.SANITY_MIGRATION_WRITE_TOKEN?.trim() ?? "";
  if (!projectId || !dataset || !token) {
    console.error("A real run needs NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_MIGRATION_WRITE_TOKEN.");
    process.exit(1);
  }

  // Writes use the API. Public pages keep useCdn: true and never import this script.
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-10-28",
    token,
    useCdn: false,
  });
  console.log(`project ${projectId.slice(0, 2)}*** dataset ${dataset}`);
  try {
    await writeAll(client, documents, assets);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "write failed";
    console.error(message.split(token).join("***"));
    process.exit(1);
  }
}

async function writeAll(client: SanityClient, documents: BuiltDocument[], assets: Map<string, AssetRecord>) {
  const refs = new Map<string, string>();
  for (const asset of assets.values()) {
    const assetType = asset.kind === "image" ? "sanity.imageAsset" : "sanity.fileAsset";
    const existing = await client.fetch<string | null>(`*[_type == $assetType && sha1hash == $sha1][0]._id`, {
      assetType,
      sha1: asset.sha1,
    });
    if (existing) {
      refs.set(asset.sha1, existing);
      console.log(`reuse ${asset.nfcName}`);
      continue;
    }
    const uploaded = await client.assets.upload(asset.kind, createReadStream(asset.filePath), {
      filename: asset.nfcName,
    });
    refs.set(asset.sha1, uploaded._id);
    console.log(`upload ${asset.nfcName}`);
  }

  for (const document of documents) {
    const payload = JSON.parse(JSON.stringify(document)) as BuiltDocument;
    replaceRefs(payload, refs);
    await client.createOrReplace(payload);
    console.log(`document ${payload._id}`);
  }
  console.log("write finished");
}

function replaceRefs(value: unknown, refs: Map<string, string>) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    for (const item of value) replaceRefs(item, refs);
    return;
  }
  const record = value as Record<string, unknown>;
  if (typeof record._ref === "string" && record._ref.startsWith("sha1:")) {
    const sha1 = record._ref.slice(5);
    const id = refs.get(sha1);
    if (!id) throw new Error(`Missing uploaded asset ${sha1.slice(0, 12)}***`);
    record._ref = id;
  }
  for (const child of Object.values(record)) replaceRefs(child, refs);
}

void main();
