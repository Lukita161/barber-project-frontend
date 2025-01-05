import { z } from "zod";
import { BarberLoginSchema, BarbersInfoFormSchema, ClientFormSchema, ClientInfoSchema, ClientWithBarberInfoSchema, CreateBarberSchema } from "../schemas";

export type BarbersFormType = z.infer<typeof BarbersInfoFormSchema>

export type ClientFormType = z.infer<typeof ClientFormSchema>

export type ClientsForMonthsType = {
    label: string,
    data: number[]
}[]

export type ClientInfoType = z.infer<typeof ClientInfoSchema>

export type ClientType = z.infer<typeof ClientWithBarberInfoSchema>

export type CreateBarberType = z.infer<typeof CreateBarberSchema>

export type BarberLoginType = z.infer<typeof BarberLoginSchema>