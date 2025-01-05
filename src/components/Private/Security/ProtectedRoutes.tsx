"use client"

import { useIsLogged } from "@/src/hooks/useIsLogged";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const whitelist = ['/private/home', '/private/clients', '/private/barbers']

export const ProtectedRoutes = ({children}: {children: ReactNode})=> {
    const router = useRouter()
    const pathname = usePathname()
    const { data, isError } = useIsLogged()
    if(isError) {
        router.push('/login')
    }
    useEffect(()=> {
        if(!data && !whitelist.includes(pathname)) {
            router.push('/login')
    }}, [data, pathname, router])
    return data ? <>{children}</> : null
}