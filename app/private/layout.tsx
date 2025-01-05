import { HeaderLinkList } from "@/src/components/Private/Header/HeaderLinkList";
import { ProtectedRoutes } from "@/src/components/Private/Security/ProtectedRoutes";
import { ClientProvider } from "@/src/components/Public/ClientProvider";
import { NotificationContainer } from "@/src/components/Public/NotificationContainer";

export default function PrivateLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
<>

<ClientProvider>
<ProtectedRoutes>

            <header className="w-full bg-brown h-16 shadow-sm">
                <HeaderLinkList />
            </header>
            {children}
          <NotificationContainer />
</ProtectedRoutes>
</ClientProvider>
</>

    );
  }