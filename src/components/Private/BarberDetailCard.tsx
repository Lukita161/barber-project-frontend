"use client"

import { getAllBarbersWithAppointments } from "@/src/api/private/BarberApi"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Spinner } from "../UI/Spinner"
import { XCircleIcon } from "@heroicons/react/24/outline"
import DeleteBarberModal from "./Barber/DeleteBarberModal"

export const BarberDetailCard = ()=> {
    const router = useRouter()
    const {data, isLoading, isError} = useQuery({
        queryKey: ['barberDetail'],
        queryFn: getAllBarbersWithAppointments,
        retry: 1,
        refetchOnWindowFocus: true,
        staleTime: 0
    })
    if (!Array.isArray(data)) {
        return <Spinner />
    }

    if(isError) router.push('/private/home')
    if(isLoading) return 'Cargando...'
    if(data) return (
        <>
        <div className="flex w-full min-h-full flex-col items-center justify-between gap-6">
        {data?.map(barberInfo => (
            <div key={barberInfo._id} className="flex flex-row w-full items-center border-b border-gray-300 py-2 hover:border-b-blue-500 hover:opacity-85 transition-all duration-100 last-of-type:border-0">

            <Link href={`/private/barbers/details/${barberInfo._id}`} className="flex w-full cursor-pointer items-center " key={barberInfo._id}>
                <div className="w-[70px] h-[70px] relative rounded-md">
                    {barberInfo.profileImage && <Image className="rounded-md" fill src={barberInfo.profileImage} alt={`Imagen de ${barberInfo.name}`} /> }
                </div>
                <div className="flex flex-col ml-3">
                    <h2 className="text-lg font-bold text-gray-800">{barberInfo.name}</h2>
                    <h3 className="text-gray-800">Nro de cortes del mes: <span className="font-bold text-gray-600">{barberInfo.appointment.length}</span></h3>
                </div>
            </Link>
            <XCircleIcon onClick={()=> router.push(`/private/barbers?delete-barber=true&barber=${barberInfo._id}`)} className="w-6 h-6 cursor-pointer text-red-600 hover:opacity-85 transition-opacity" />
            </div>
        ))}
        </div>
        <DeleteBarberModal />
        </>
    )
}