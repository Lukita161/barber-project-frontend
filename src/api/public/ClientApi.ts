

import { axiosClient } from "@/src/lib/axios"
import { BarbersInfoFormSchema, ClientFormSchema } from "@/src/schemas"
import { ClientFormType } from "@/src/types"
import { isAxiosError } from "axios"

export const getBarbersInfo = async()=> {
    try {
        const {data} = await axiosClient.get('/barber')
        const result = BarbersInfoFormSchema.safeParse(data)
        if (!result.success) {
            throw new Error('Error en el servidor, vuelve a intentarlo')
        }

        return result.data
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.message)
        }
    }
}

export const createClient = async(clientFormData: ClientFormType)=> {
    try {
        const result = ClientFormSchema.safeParse(clientFormData)
        if(!result.success) {
            return {
                error: result.error.issues
            }
        }
        const { data } = await axiosClient.post('/client', result.data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.message)
        }
    }
}