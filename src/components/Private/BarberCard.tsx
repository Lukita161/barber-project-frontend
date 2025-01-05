"use client"

import { getAllBarbers } from "@/src/api/private/BarberApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "../UI/Spinner";

export const BarberCard = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['allBarbers'],
        queryFn: getAllBarbers,
        retry: 1,
        refetchOnWindowFocus: false
    })
    if(isLoading) return <Spinner />
  if(data)return (
    <>
      <div className="w-full h-full flex justify-around p-1 mt-6">
        {data.map((barber, index) => (
          <Link href={`/private/barbers/details/${barber._id}`} key={index} className="text-center flex flex-col items-center justify-center cursor-pointer hover:opacity-70 transition-opacity">

            <div className="w-16 md:w-24 md:h-24 h-16 relative rounded-md">
              <Image
              className="rounded-md"
                src={barber.profileImage}
                alt={`Imagen de ${barber.name}`}
                fill
              />
            </div>
            <h1>{barber.name}</h1>
                </Link>
        ))}
      </div>
    </>
  );
};
