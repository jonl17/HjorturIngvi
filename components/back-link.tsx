import Image from "next/image";
import Link from "next/link";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link className="back-link bold desktop-only" href={href}>
      <Image src="/ui/back.png" alt="" width={35} height={35} />
      <span>{label}</span>
    </Link>
  );
}
