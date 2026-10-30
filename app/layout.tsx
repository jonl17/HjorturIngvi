import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const groteskReg = localFont({
  src: "./fonts/grotesk-reg.otf",
  variable: "--font-reg",
  display: "swap",
  adjustFontFallback: false,
  weight: "400",
});

const groteskFat = localFont({
  src: "./fonts/grotesk-fat.otf",
  variable: "--font-fat",
  display: "swap",
  adjustFontFallback: false,
  weight: "400",
});

const groteskLight = localFont({
  src: "./fonts/grotesk-light.ttf",
  variable: "--font-light",
  display: "swap",
  adjustFontFallback: false,
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Hjörtur Jóhannsson",
    template: "%s | Hjörtur Jóhannsson",
  },
  description: "Pianist/Composer/Arranger",
  icons: { icon: "/ui/stop.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${groteskReg.variable} ${groteskFat.variable} ${groteskLight.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
