export function formatDateAndHour(date: string) {
    const slicedDate = date.toString().split('T')[1]
    const actualDate = new Date(date)
    return {
        date: actualDate.toLocaleDateString('es-ES', {year: 'numeric', month: '2-digit', day: '2-digit'}),
        hour: slicedDate
    }; // 'es-ES' para español de España
  }