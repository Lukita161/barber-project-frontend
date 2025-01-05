

import { axiosPrivate } from "@/src/lib/axios"
import { sessionBarberData } from "@/src/schemas"
import { BarberLoginType } from "@/src/types"
import { isAxiosError } from "axios"

export const loginBarber = async (formData: BarberLoginType) => {
    try {
        const { data } = await axiosPrivate.post('/barber/logIn', {
            email: formData.email,
            password: formData.password
        })
        console.log(`Esto es el data: ${data}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const isBarberLoggedIn = async ()=> {
    try {
        const { data } = await axiosPrivate.get('/barber/isBarber')
        const result = sessionBarberData.safeParse(data)
        if(!result.success) {
            throw new Error('Error al obtener la informacion del usuario')
        }
        return result.data
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.message);
          }
    }
}