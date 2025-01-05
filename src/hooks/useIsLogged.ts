"use client"

import { useQuery } from "@tanstack/react-query"
import { isBarberLoggedIn } from "../api/login/LoginApi"

export const useIsLogged = ()=> {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['sessionData'],
        queryFn: isBarberLoggedIn,
        retry: 1,
        refetchOnWindowFocus: true,
    })
    return { data, isError, isLoading }
}