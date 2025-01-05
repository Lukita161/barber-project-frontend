"use client"

import { getAllStatsForMonth } from "@/src/api/private/BarberApi"
import { useQuery } from "@tanstack/react-query"
import { Chart, registerables } from "chart.js"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { Spinner } from "../UI/Spinner"

Chart.register(...registerables)
const options = {
    scales: {
        y: {
            beginAtZero: true, // Asegúrate de que el eje Y comience en 0
            min: 0, // Establece el mínimo en 0
            max: 200 // Ajusta el máximo según tus datos
        }
    }
};

export const GraphicDetail = ()=> {
    const {data, isLoading} = useQuery({
        queryKey: ['barberByMonth'],
        queryFn: getAllStatsForMonth,
        retry: 0,
        refetchOnWindowFocus: false
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
        const labels = data.map(item => 'Mes: ' + item._id.split('-')[1].concat('-' + item._id.split('-')[0]))
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
    if(isLoading) return <Spinner />
    if(data) return (
        <div className="w-full h-full text-center mx-auto flex items-center justify-center">
            <Line options={options} data={graphicData} ></Line>
        </div>
    )
}