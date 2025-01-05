"use client"

import { getBarberById } from "@/src/api/private/BarberApi"
import { AppointmentsByBarberGraphic } from "@/src/components/Private/Barber/AppointmentsByBarberGraphic"
import { AppointmentsOfTheDay } from "@/src/components/Private/Barber/AppointmentsOfTheDay"
import { useIsLogged } from "@/src/hooks/useIsLogged"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useParams } from "next/navigation"


export default function BarberDetailPage() {
    const {data : sessionData} = useIsLogged()
    const params = useParams()
    const barberId = params.barberId!
    const { data, isLoading } = useQuery({
        queryKey: ['barberDetail'],
        queryFn: ()=>getBarberById(barberId.toString()),
        retry: 0,
        refetchOnWindowFocus: true,
        staleTime: 0
    })
    if (isLoading) return 'Cargando...'
    if(data) return (
        <main className="w-full md:h-[90vh] md:*:my-3 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
            <section className="w-[90%] md:w-[40%] md:min-h-[95%] p-4 h-[80%] border rounded-md shadow-md mx-auto mt-3 flex flex-col items-center">
                <div className="w-32 h-32 relative text-center">
                    {data.profileImage && <Image className="absolute rounded-md shadow" src={data.profileImage} alt={`Imagen de ${data.name}`} fill />}
                </div>
                <div className="text-pretty mt-6 flex flex-col w-full ml-3">
                    <h2 className="text-gray-800">Nombre: <span className="text-gray-900 font-medium">{data.name}</span></h2>
                    <h3 className="text-gray-800">Numero de telefono: <span className="text-gray-900 font-medium">{data.phoneNumber}</span></h3>
                    <h4 className="text-gray-800">Email: <span className="text-gray-900 font-medium">{data.email}</span></h4>
                </div>
                <div className="mt-8 gap-1 flex flex-col w-full h-[50%]">
                    <h3>Rendimiento del barbero: </h3>
                    <div className=" md:w-[90%] h-full mx-auto">
                    <AppointmentsByBarberGraphic barberId={barberId} />
                    </div>
                </div>
            </section>
            {sessionData?._id === barberId ? (
                <section className="w-[90%] md:w-[40%] md:min-h-[95%] p-4 h-[80%] border rounded-md shadow-md mx-auto mt-3 flex flex-col items-center">
                <AppointmentsOfTheDay barberId={barberId.toString()} />
            </section>
            ) : null}
        </main>
    )
}