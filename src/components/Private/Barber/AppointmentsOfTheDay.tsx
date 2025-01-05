"use client";

import { getAppointmentsInfoByDate } from "@/src/api/private/BarberApi";
import { useQuery } from "@tanstack/react-query";
import { ClientStatus } from "../Client/ClientStatus";
import { ToastContainer } from "react-toastify";

export const AppointmentsOfTheDay = ({ barberId }: { barberId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["clientsInfo"],
    queryFn: () => getAppointmentsInfoByDate(barberId),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  if (isLoading) return "Cargando...";

  if (data)
    return (
      <>
        <div className="w-full h-full flex flex-col items-center justify-center mb-6">
          <h1 className="text-xl font-bold mb-3 text-gray-800">
            Clientes agendados para hoy:
          </h1>
          {data.length === 0 ? (
            <div >
              <h1>Parece que no tienes clientes hoy</h1>
            </div>
          ) : data.map((appointment) => (
            <div
              key={appointment._id}
              className="w-full p-4 h-28 border rounded-md shadow-md flex items-center justify-between"
            >
              <div className="flex flex-col gap-1">
                <h1 className="text-gray-900">
                  Cliente:{" "}
                  <span className="font-bold">{appointment.fullName}</span>
                </h1>
                <h3 className="text-gray-900">
                  Número de telefono:{" "}
                  <span className="font-bold">{appointment.phone}</span>
                </h3>
                <div>
                  <h4 className="text-gray-900">
                    Horario asignado:{" "}
                    <span className="text-blue-500 font-bold">
                      {appointment.hour}
                    </span>
                  </h4>
                </div>
              </div>
              <div>
                <ClientStatus
                  clientId={appointment._id}
                  clientStatus={appointment.status}
                />
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </>
    );
};
