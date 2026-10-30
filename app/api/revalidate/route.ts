import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

const knownTypes = ["about", "news", "concert", "contact", "project", "siteLinks", "cv"];

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Webhook is not configured" }, { status: 501 });
  }

  const { isValidSignature, body } = await parseBody<Record<string, unknown>>(request, secret, false);
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const type = readType(body);
  const tags = type && knownTypes.includes(type) ? [type] : knownTypes;
  for (const tag of tags) revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: true, tags });
}

function readType(body: Record<string, unknown> | null): string | null {
  if (!body) return null;
  if (typeof body._type === "string") return body._type;
  const result = body.result;
  if (result && typeof result === "object" && typeof (result as { _type?: unknown })._type === "string") {
    return (result as { _type: string })._type;
  }
  return null;
}
