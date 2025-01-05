"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getBarbersInfo } from "../../../api/public/ClientApi";

type BarberPickerProps = {
  selectedBarber: string
  setSelectedBarber: Dispatch<SetStateAction<string>>
}

export const BarberPicker = ({selectedBarber, setSelectedBarber}: BarberPickerProps) => {
  
  const { data } = useQuery({
    queryFn: getBarbersInfo,
    queryKey: ["barbers"],
  });
  return (
    <div className="flex w-72 p-2 justify-around">
      {data?.map((barber) => (
        <div
          onClick={() => setSelectedBarber(barber.name)}
          
          key={barber.name}
          className={`${
            selectedBarber === barber.name
              ? ""
              : ""
          } flex rounded-md mr-5 mt-3 hover:opacity-80 transition-opacity cursor-pointer `}
        >
          <Image
          
            className={`${
              selectedBarber === barber.name && "border-2 opacity-70 border-blue-500"
            } rounded-md hover:opacity-80 transition-opacity`}
            width={80}
            height={80}
            src={barber.profileImage}
            alt={`Imagen de ${barber.name}`}
          />
        </div>
      ))}
    </div>
  );
};
