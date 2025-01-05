"use client"

import { BarberCard } from "@/src/components/Private/BarberCard";
import { GraphicDetail } from "@/src/components/Private/GraphicDetail";

export default function PrivateHomePage() {
    return (
        <main className="w-full h-full flex flex-col justify-around">
            <section className="w-full text-center mt-6">
                <h1 className="text-xl font-bold">Bienvenido al panel de control de la barberia</h1>
            </section>
            <section className="w-full mx-auto md:h-[70vh] md:w-[80%] md:flex items-center justify-center text-center mt-10">
            <GraphicDetail />
            </section>
            <section className="w-full mt-10 flex md:mb-10 flex-col">
            <h2 className="md:text-lg font-medium mx-auto">Haz click para acceder a los perfiles</h2>
            <div className="mt-4 rounded-md border border-gray-100 shadow-md w-[90%] md:w-[60%] mx-auto flex h-full md:h-[40%] items-center justify-center p-1">
                <BarberCard />            
            </div>
            </section>
        </main>
    )
}