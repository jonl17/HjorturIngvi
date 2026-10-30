import { LangText } from "@/components/lang-text";

export function EmptyState({
  is = "Ekkert efni hér enn.",
  en = "Nothing here yet.",
}: {
  is?: string;
  en?: string;
}) {
  return (
    <p className="empty">
      <LangText is={is} en={en} />
    </p>
  );
}
