"use client"

import { getBarberAppointmentsCount } from "@/src/api/private/BarberApi"
import { useQuery } from "@tanstack/react-query"
import { Chart, registerables } from "chart.js"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"


Chart.register(...registerables)
const options = {
    scales: {
        y: {
            beginAtZero: true, // Asegúrate de que el eje Y comience en 0
            min: 0, // Establece el mínimo en 0
            max: 100 // Ajusta el máximo según tus datos
        }
    }
};


export const AppointmentsByBarberGraphic = ({barberId}: {barberId: string | string[]})=> {
    const { data } = useQuery({
        queryKey: ['appointmentCount'],
        queryFn: ()=>getBarberAppointmentsCount(barberId.toString()),
    })
    const [graphicData, setGraphicData] = useState({
            labels: [''],
            datasets: [{
                label: '',
                data: [0],
                borderWidth: 0
            }]
        })
        useEffect(()=> {
            if(!data) return
            const labels = data.map(item => 'Mes: ' + item.month.split('-')[1].concat('-' + item.month.split('-')[0]))
            const count = data.map(item => item.count)
            setGraphicData({
                labels: labels,
                datasets: [{
                    label: `Clientes atendidos`,
                    data: count,
                    borderWidth: 1
                }]
            })
        },[data])
    if(data) return (
        <div className="w-full h-full text-center mx-auto flex items-center justify-center">
            <Line options={options} data={graphicData} ></Line>
        </div>
    )
}