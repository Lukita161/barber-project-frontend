export const statusTranslate = (status: string)=> {
    if(status === 'pending') return 'Pendiente'
    if(status === 'canceled') return 'Cancelado'
    if(status === 'completed') return 'Completado'
}

export const statusColor = (status:string) => {
    if(status === 'pending') return 'text-indigo-500'
    if(status === 'canceled') return 'text-red-500'
    if(status === 'completed') return 'text-green-500'
}