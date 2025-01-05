"use client"

import React from 'react';
import { ImageUpload } from '@/src/components/Private/Barber/ImageUpload';
import { useMutation } from '@tanstack/react-query';
import { createBarber } from '@/src/api/private/BarberApi';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CreateBarberSchema } from '@/src/schemas';

const CreateNewBarber: React.FC = () => {
    const router = useRouter()
    const { mutate } = useMutation({
        mutationFn: createBarber,
        onSuccess: (data) => {
            toast.success(data?.toString());
            router.push('/private/barbers')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name')?.toString(),
            phoneNumber: formData.get('phoneNumber')?.toString(),
            email: formData.get('email')?.toString(),
            image: formData.get('image')?.toString(),
            password: formData.get("password")?.toString(),
            profileImage: formData.get('image')?.toString()
        }
        const result = CreateBarberSchema.safeParse(data);
            if (!result.success) {
             result.error.issues.forEach(issue => {
                toast.error(issue.message)
             })
             return
            }
        mutate(result.data)
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
    };

    return (
        <div className='w-full flex items-center justify-center gap-6 flex-col'>
            <h1 className='mt-8 text-2xl font-black text-gray-800'>Crear nuevo barbero</h1>
            <div className='shadow-xl p-5 rounded-lg w-[90%] md:w-[40%] border border-gray-200'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name">Nombre:</label>
                    <input
                    className='border border-gray-200 shadow rounded-md p-2 outline-none focus:border-brown'
                        type="text"
                        id="name"
                        name='name'
                        
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="phoneNumber">Número de telefono: </label>
                    <input
                    className='border border-gray-200 shadow rounded-md p-2 outline-none focus:border-brown'
                        type="number"
                        id="phoneNumber"
                        name='phoneNumber'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email">Email:</label>
                    <input
                    className='border border-gray-200 shadow rounded-md p-2 outline-none focus:border-brown'
                        type="text"
                        id="email"
                        name='email'
                        
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="image">Imagen de perfil: </label>
                    <ImageUpload />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                    className='border border-gray-200 shadow rounded-md p-2 outline-none focus:border-brown'
                        type="text"
                        id="password"
                        name='password'
                        
                    />
                </div>
                <button className='p-3 bg-black font-bold text-white mt-4 rounded-md shadow hover:bg-[#363635] transition-colors duration-150 ' type="submit">Crear nuevo barbero</button>
            </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateNewBarber;