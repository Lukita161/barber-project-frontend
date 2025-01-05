

import { axiosPrivate } from "@/src/lib/axios";
import { ClientsWithBarberInfoSchema } from "@/src/schemas";
import { ClientType } from "@/src/types";
import { isAxiosError } from "axios";

export const getClientsForCurrentMonth = async ()=> {
    try {
        const { data } = await axiosPrivate.get('/client/clients/months')
        const result = ClientsWithBarberInfoSchema.safeParse(data)
        if (!result.success) {
            throw new Error(result.error.errors[0].message)
        }
        return result.data
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.message);
          }
    }
}
export const changeStatusClient = async({id, status}: {id: ClientType['_id'], status: ClientType['status']}) => {
    try {
        console.log(status)
        const { data } = await axiosPrivate.patch<string>(`/client/client/${id}`, {status: status})
        return data
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.message);
          }
    }
}

export const deleteClient = async(id: ClientType['_id']) => {
    try {
        const {data} =  await axiosPrivate.delete<string>(`/client/client/delete/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.message)
    }
} }