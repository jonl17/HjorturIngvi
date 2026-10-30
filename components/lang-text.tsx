export function LangText({ is, en }: { is: string; en?: string | null }) {
  const english = en?.trim() ? en : is;
  return (
    <>
      <span className="lang-is">{is}</span>
      <span className="lang-en">{english}</span>
    </>
  );
}
