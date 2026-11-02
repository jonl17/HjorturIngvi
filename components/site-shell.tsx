"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Player } from "@/components/player";
import { Portrait } from "@/components/portrait";
import { SocialLinks } from "@/components/social-links";
import { backHref, isActive, mobileLabel, pages, siteSubtitle, siteTitle } from "@/lib/navigation";
import type { ShellData } from "@/sanity/types";

export function SiteShell({ shell, children }: { shell: ShellData; children: React.ReactNode }) {
  const pathname = usePathname();
  const [icelandic, setIcelandic] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuOpen = openPath === pathname;
  const label = mobileLabel(pathname);
  const back = backHref(pathname);

  useEffect(() => {
    document.documentElement.lang = icelandic ? "is" : "en";
  }, [icelandic]);

  return (
    <>
      <div
        className="site"
        data-lang={icelandic ? "is" : "en"}
        data-home={pathname === "/" ? "true" : "false"}
        data-menu={menuOpen ? "open" : "closed"}
      >
        <Player title={shell.songTitle} src={shell.songUrl} />
        <header className="header desktop-only">
          {pages
            .filter((item) => item.position === "header")
            .map((item) => (
              <p key={item.slug}>
                  <Link className="nav-link bold" href={item.slug} aria-current={isActive(pathname, item.slug, false) ? "page" : undefined} onClick={() => setOpenPath(null)}>
                  {item.name}
                  <span className="underline" />
                </Link>
              </p>
            ))}
        </header>
        <Portrait front={shell.portraitUrl} second={shell.secondUrl} />
        <nav className="sidebar desktop-only" aria-label="Sections">
          {pages
            .filter((item) => item.position === "sidebar")
            .map((item) => (
              <p key={item.name}>
                {item.type === "button" ? (
                  <LanguageButton icelandic={icelandic} onToggle={() => setIcelandic((value) => !value)} />
                ) : (
                  <Link className="nav-link bold" href={item.slug} aria-current={isActive(pathname, item.slug, true) ? "page" : undefined} onClick={() => setOpenPath(null)}>
                    {item.name}
                    <span className="underline" />
                  </Link>
                )}
              </p>
            ))}
        </nav>
        <Link href="/" className="home-button desktop-only">
          <h1 className="home-title bold">{siteTitle}</h1>
          <p className="home-subtitle">{siteSubtitle}</p>
        </Link>
        <button
          type="button"
          className="burger mobile-only"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setOpenPath((current) => (current === pathname ? null : pathname))}
        >
          <span className={menuOpen ? "one ex" : "one"} />
          {menuOpen ? null : <span className="two" />}
          <span className={menuOpen ? "three ex" : "three"} />
        </button>
        <div className="mobile-menu mobile-only" data-open={menuOpen ? "true" : "false"}>
          <div className="mobile-menu-inner">
            <div>
              {pages.map((item) => (
                <p key={item.name}>
                  {item.type === "button" ? (
                    <LanguageButton icelandic={icelandic} onToggle={() => setIcelandic((value) => !value)} />
                  ) : (
                    <Link className="bold" href={item.slug} aria-current={isActive(pathname, item.slug, true) ? "page" : undefined} onClick={() => setOpenPath(null)}>
                      {item.name}
                    </Link>
                  )}
                </p>
              ))}
            </div>
            <div className="mobile-social">
              <SocialLinks services={shell.services} />
            </div>
          </div>
        </div>
        <div className="mobile-brand mobile-only">
          <h1 className="bold">
            <Link href="/" onClick={() => setOpenPath(null)}>
              {siteTitle}
            </Link>
          </h1>
          <p>{siteSubtitle}</p>
        </div>
        <main className="page">
          {label ? (
            <div className="mobile-heading mobile-only">
              <h1 className="bold">
                {back ? (
                  <Link href={back}>
                    <Image src="/ui/back.png" alt="" width={35} height={35} />
                    {label}
                    <span className="underline" />
                  </Link>
                ) : (
                  <>
                    {label}
                    <span className="underline" />
                  </>
                )}
              </h1>
            </div>
          ) : null}
          {children}
        </main>
      </div>
      <footer className="footer desktop-only">
        <div className="footer-inner">
          <SocialLinks services={shell.services} />
        </div>
      </footer>
    </>
  );
}

function LanguageButton({ icelandic, onToggle }: { icelandic: boolean; onToggle: () => void }) {
  return (
    <button type="button" className="language" onClick={onToggle}>
      <span className={icelandic ? "bold" : ""}>ISL</span>
      <span> / </span>
      <span className={icelandic ? "" : "bold"}>ENG</span>
    </button>
  );
}
