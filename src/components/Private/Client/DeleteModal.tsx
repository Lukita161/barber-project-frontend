"use client"

import { deleteClient } from '@/src/api/private/ClientPrivateApi'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'

export default function DeleteModal () {
    const queryClient = useQueryClient()
    const router = useRouter()
    const params = useSearchParams()
    const isActive = params.get('delete-client')
    const clientId = params.get('clientId')!
    const { mutate } = useMutation({
        mutationFn: deleteClient,
        onError: (error)=> {
            toast.error(error.message)
        },
        onSuccess: (data)=> {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['clientsInfo']})
            router.push('/private/clients')
        }
    })


  return (
    <>
      <Dialog open={Boolean(isActive)} onClose={() => router.push('/private/clients')} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-lg shadow-sm border bg-white p-12">
            <DialogTitle className="font-bold text-center text-2xl">Eliminar cliente</DialogTitle>
            <Description>Esta opción es irreversible</Description>
            <p>¿Estas seguro que deseas eliminar al cliente? Toda la información se perdera</p>
            <div className="flex justify-around w-full gap-4">
              <button onClick={()=> router.push('/private/clients')} className='p-2 border border-gray-300 rounded-md font-bold shadow px-6 hover:opacity-80 transition-opacity'>Atrás</button>
              <button onClick={()=> mutate(clientId)} className='p-2 bg-red-500 rounded-md shadow text-white font-bold px-6 hover:bg-red-600 transition-colors'>Eliminar</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <ToastContainer />
    </>
  )
}