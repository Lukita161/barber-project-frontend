import { ClientProvider } from "@/src/components/Public/ClientProvider";
import { NotificationContainer } from "@/src/components/Public/NotificationContainer";

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
        <NotificationContainer />
      </body>
    </html>
  );
}