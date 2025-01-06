import "./globals.css";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Urban Cut",
  description: "Nos dedicamos a darte la mejor experiencia a todos nuestros clientes",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body >
          {children}
      </body>
    </html>
  );
}
