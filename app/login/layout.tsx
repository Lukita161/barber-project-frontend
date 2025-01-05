import { ClientProvider } from "@/src/components/Public/ClientProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body >
        <ClientProvider>
          {children}
        </ClientProvider>

      </body>
    </html>
  );
}