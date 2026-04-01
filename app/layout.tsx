import type { ReactNode } from "react";
import { Orbitron, Rajdhani } from "next/font/google";

import { Providers } from "@/app/providers";
import "@/app/globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron"
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani"
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69ccd9191aacdcc17b25517b" />
        <meta
          name="talentapp:project_verification"
          content="129bdd5f2a10b8eb8307b03b1f362ecd8d89927f19cc23c899bda8468ec1030c311f03b42577e0fcc749c3fa2fd43ce7b976266def3b995994a561b09f590c0a"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>QuickFlip</title>
      </head>
      <body className={`${orbitron.variable} ${rajdhani.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
