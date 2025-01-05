"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function HomePage() {
    const [isMobile, setIsMobile] = useState(false)

  useEffect(()=> {
    const handleResize = ()=> {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize);
  },[])
  return (
    <>
    <main className="w-full h-full overflow-hidden">
      <div className="w-full h-full ">
        <div className="w-full h-full absolute backdrop-brightness-50 bg-black/30">
          <Image
          className=""
            src={`${isMobile ? '/barber-principal-image-mobile.webp' : '/barber-principal-image-desktop.jpg'}`}
            alt="Imagen de barberia"
            fill
            />
        </div>
        <div>
          <section className="w-full h-full absolute mx-1">
            <div className="flex flex-col w-full h-full justify-around items-center">
              <div className="w-full h-[40%] flex flex-col justify-around items-center">

              <h1 className="text-3xl mt-3 text-white font-bold text-center">
                Lleva tu estilo al siguiente nivel
              </h1>
              <div className="space-y-1 flex flex-col items-center justify-center">
                <p className="text-white text-lg">¿Listo para tu nuevo look?</p>
                <Link href={'/public/book-haircut'} className="w-60 p-3 text-center rounded-lg shadow-md bg-black text-brown text-xl font-bold hover:bg-[#2d2e2a] transition-colors duration-150">
                  Agendate acá
                </Link>
              </div>
            </div>
              </div>
          </section>
        </div>
      </div>
    </main>
            </>
  );
}