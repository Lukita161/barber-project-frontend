"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export const HeaderLinkList = ()=> {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <ul className="flex w-full h-full  items-center justify-around">
                    <li>
                        <Link className={`font-medium rounded-sm text-gray-900 text-lg ${pathname==='/private/home' && 'border-b-[#131515] border-b-2'}`} href="/private/home">Inicio</Link>
                    </li>
                    <li>
                        <Link className={`font-medium rounded-sm text-gray-900 text-lg ${pathname==='/private/clients' && 'border-b-[#131515] border-b-2'}`} href="/private/clients">Clientes</Link>
                    </li>
                    <li>
                        <Link className={`font-medium rounded-sm text-gray-900 text-lg ${pathname==='/private/barbers' && 'border-b-[#131515] border-b-2'}`} href="/private/barbers">Barberos</Link>
                    </li>
                </ul>
    )
}