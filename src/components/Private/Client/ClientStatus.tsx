"use client"

import { changeStatusClient } from "@/src/api/private/ClientPrivateApi"
import { ClientType } from "@/src/types"
import { statusColor, statusTranslate } from "@/src/utils/StatusTranslate"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { toast } from "react-toastify"

export const ClientStatus = ({clientStatus, clientId}: {clientStatus: ClientType['status'], clientId: ClientType['_id']})=> {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
       mutationFn: changeStatusClient,
       onError: (error) => toast.error(error.message),
       onSuccess: (data) => {
        queryClient.invalidateQueries({queryKey: ['clientsInfo']})
        toast.success(data)
       }
    })
    const handleClick = ()=> {
        if(clientStatus === 'pending') {
            mutate({id: clientId, status: 'completed' })
        } else mutate({id: clientId, status: 'pending' })
    }
    return (
        <p onClick={handleClick} className={`${statusColor(clientStatus)} font-bold text-sm cursor-pointer`}>{statusTranslate(clientStatus)}</p>
    )
}