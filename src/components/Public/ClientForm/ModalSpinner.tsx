"use client"

import { Dialog, DialogPanel } from "@headlessui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { Spinner } from "../../UI/Spinner"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"

export const ModalSpinner = ({isActive, setIsActive}: {isActive: boolean, setIsActive:Dispatch<SetStateAction<boolean>>})=> {
    const [done, setDone] = useState(false)
    const router = useRouter()
    // Este useEffect maneja el estado de carga falsa del componente
    useEffect(()=> {
        if (isActive) {
            const timer = setTimeout(() => {
                setDone(true)
                setTimeout(() => {
                    router.push('/')
                }, 1000) 
            }, 3000) 
            return () => {
                clearTimeout(timer)
            } 
        } else {
            setDone(false)
        }
    },[isActive, router])
    return (
<>
      <Dialog open={Boolean(isActive)} onClose={()=> setIsActive(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-lg shadow-sm border bg-white p-12">
            {done ? (
                <div className="flex flex-col items-center justify-center">
                    <CheckCircleIcon className="h-32 text-green-600 w-32 transition-all duration-200" />
                    <p className="text-xl font-bold">Registrado correctamente</p>
                </div>
            ) : <Spinner />}
          </DialogPanel>
        </div>
      </Dialog>
      <ToastContainer />
    </>
    )
}