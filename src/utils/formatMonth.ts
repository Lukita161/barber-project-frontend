export const formatMonth = (month: number) => { 
    const formatedMonth = new Intl.DateTimeFormat('es', { month: 'long' }).format(new Date(2021, month-1, 1))
    return formatedMonth
}