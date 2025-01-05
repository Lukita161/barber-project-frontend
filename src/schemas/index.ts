import { z } from "zod";

export const BarberInfoFormSchema = z.object({
    name: z.string(),
    profileImage: z.string()
})

export const BarbersInfoFormSchema = z.array(BarberInfoFormSchema)

export const ClientFormSchema = z.object({
    fullName: z.string().min(3, {message: 'Nombre no valido'}),
    phone: z.string().min(9, {message: 'El número es muy corto'}).max(9, {message: "El número es muy largo"}),
    date: z.string().min(1, {message: 'Debes seleccionar una fecha válida'}),
    hour: z.string().min(1, {message: 'Debes seleccionar una hora válida'}),
    barber: z.string().min(1, {message: 'Debes seleccionar un barbero'})
})

export const BarberLoginSchema = z.object({
    email: z.string().min(6, {message: 'Email no valido'}),
    password: z.string().min(8, {message: 'Contraseña no valida'})
})

export const ClientForMonthSchema = z.object({
    _id: z.string(),
    count: z.number()
})

export const ClientsForMonthsSchema = z.array(ClientForMonthSchema)

export const ClientInfoSchema = z.object({
    _id: z.string(),
    name: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    profileImage: z.string()
})

export const ClientsInfoSchema = z.array(ClientInfoSchema)

export const ClientInfoAndAppointmentsSchema = z.object({
    _id: z.string(),
    name: z.string(),
    appointment: z.array(z.string()),
    phoneNumber: z.string(),
    email: z.string(),
    profileImage: z.string()
})

export const ClientsInfoAndAppointmentsSchema = z.array(ClientInfoAndAppointmentsSchema)

export const BarberInfoAndAppointmentsSchema = z.object({
    _id: z.string(),
    name: z.string(),
    appointment: z.array(z.string()),
    phoneNumber: z.string(),
    email: z.string(),
    profileImage: z.string()
})

export const AppointmentForBarberCount = z.object({
    month: z.string(),
    count: z.number()
})

export const AppointmentsForBarbersCount = z.array(AppointmentForBarberCount)

export const CreateBarberSchema = z.object({
    name: z.string().min(1, {message: 'Nombre no valido'}),
    phoneNumber: z.string().min(9, {message: 'Telefono no valido'}),
    email: z.string().min(1, {message: 'Email no valido'}),
    password: z.string().min(8, {message: 'Contraseña no valida'}),
    profileImage: z.string().min(1, {message: 'Debes subir una imagen'})
})

export const ClientWithBarberInfoSchema = z.object({
    _id: z.string(),
    fullName: z.string(),
    date: z.string(),
    hour: z.string(),
    phone: z.string(),
    status: z.string(),
    barber: z.object({
        _id: z.string(),
        name: z.string(),
        profileImage: z.string()
    }),
})

export const ClientsWithBarberInfoSchema = z.array(ClientWithBarberInfoSchema)

export const AppointmentsOfTheDaySchema = z.array(
    z.object({
        _id: z.string(),
        fullName: z.string(),
        hour: z.string(),
        phone: z.string(),
        status: z.string()
    })
)

export const sessionBarberData = z.object({
    _id: z.string(),
    email: z.string(),
    name: z.string()
})