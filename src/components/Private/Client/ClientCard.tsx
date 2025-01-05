"use client"

import { getClientsForCurrentMonth } from "@/src/api/private/ClientPrivateApi"
import { useQuery } from "@tanstack/react-query"
import { XCircleIcon } from "@heroicons/react/24/outline"
import { ClientStatus } from "./ClientStatus"
import { formatMonth } from "@/src/utils/formatMonth"
import { useRouter } from "next/navigation"
import DeleteModal from "./DeleteModal"

export const ClientCard = ()=> {
    const router = useRouter()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['clientsInfo'],
        queryFn: getClientsForCurrentMonth,
        refetchOnWindowFocus: false,
        retry: 1
    })
    if(isLoading) return 'Cargando...'
    if(isError) router.push('/private/home')
    if(data) return (
        <>
        <div className="flex flex-col gap-5  overflow-y-auto w-[90vw] md:w-[60vw] h-[80vh] p-5 border border-gray-300 rounded-md shadow-md">
            <h1 className="text-2xl font-bold border-b-2 pb-1">Clientes de <span className="capitalize">{formatMonth(new Date().getMonth()+1)}</span>: </h1>
            {data.map(client => (
                <div className="flex border-b p-1 justify-between border-gray-300 last-of-type:border-b-0 cursor-pointer" key={client._id}>
                    <div className="flex flex-col gap-1 hover:opacity-75 transition-opacity">
                    <h1 className="font-medium text-gray-800">Nombre: <span className="text-gray-900 font-normal">{client.fullName}</span></h1>
                    <h3 className="font-medium text-gray-800">Telefono: <span className="text-gray-900 font-normal">{client.phone}</span></h3>
                    </div>
                    <div className="flex items-center gap-2 md:gap-5 h-full">
                    <ClientStatus clientStatus={client.status} clientId={client._id} />
                    <XCircleIcon className="h-7 w-7 text-red-500 cursor-pointer" onClick={()=> router.push(`/private/clients/?delete-client=true&clientId=${client._id}`)} />
                    </div>
                </div>
            ))}
        </div>
        <DeleteModal />
        </>
    )
}