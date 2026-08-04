import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const origin = `${host.includes("localhost") ? "http" : "https"}://${host}`;
  return {
    title: "WebLab · Deine erste Webseite",
    description: "Moderne Lernumgebung für Webentwicklung mit Kapiteln, Live-Editor, Missionen, Punkten und Lerncoach.",
    icons: { icon: "/weblab-logo.png", shortcut: "/weblab-logo.png", apple: "/weblab-logo.png" },
    openGraph: {
      title: "WebLab · Deine erste Webseite",
      description: "HTML verstehen, direkt ausprobieren und 320 XP sammeln.",
      locale: "de_DE",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1672, height: 942, alt: "WebLab – Deine erste Webseite" }],
    },
    twitter: { card: "summary_large_image", title: "WebLab · Deine erste Webseite", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body>{children}</body></html>;
}
