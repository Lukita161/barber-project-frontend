"use client";

import { createClient } from "@/src/api/public/ClientApi";
import { BarberPicker } from "@/src/components/Public/ClientForm/BarberPicker";
import { DatePicker } from "@/src/components/Public/ClientForm/DatePicker";
import { GoBackArrow } from "@/src/components/Public/ClientForm/GoBackArrow";
import { ModalSpinner } from "@/src/components/Public/ClientForm/ModalSpinner";
import { formatDateAndHour } from "@/src/logic/formatDate";
import { useMutation } from "@tanstack/react-query";

import Form from "next/form";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";



const BookHaircutPage = () => {
    const [selectedBarber, setSelectedBarber] = useState("");
    const [modalOpen, setModalOpen] = useState(false)
    const {mutate} = useMutation({
        mutationFn: createClient,
        onMutate: ()=> {
          setModalOpen(true)
        },
        onSuccess: (data) => {
            toast.success(data)
            //router.push('/')
        },
        onError: (error)=> {
            toast.error(error.message)
        }
    })
  const handleAction = (formData: FormData) => {
    const name = formData.get("name")!;
    const lastName = formData.get("lastName")!;
    if (name.toString().length <= 3 || lastName.toString().length <= 3) {
      alert("Name must be at least 4 characters long");
      return;
    }
    const actualDate = formData.get('date')!
    const formatedDate = formatDateAndHour(actualDate.toString())
    const data = {
      fullName: name.toString().concat(" ").concat(lastName.toString()),
      phone: formData.get("phone")!.toString(),
      date: formatedDate.date,
      hour: formatedDate.hour,
      barber: selectedBarber
    };
    mutate(data)
  };
  return (
    <>
    <main className="w-full h-screen flex mb-8">
      <Form action={handleAction} className="w-full  h-full flex flex-col items-center gap-6">
        <div className="w-[85%] md:w-[70%] lg:w-[30%] rounded-md border border-gray-100 shadow-2xl h-[full] my-6 p-6 flex flex-col gap-4 items-center justify-center">
      <div className="w-full text-left flex" >
      <Link className="w-10 hover:opacity-60 transition-opacity duration-100" href={'/'}>
        <GoBackArrow />
      </Link>
      </div>
          <div className="flex flex-col">
            <label className="text-gray-800" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-72 shadow bg-gray-200 rounded-lg p-2 outline-none border border-gray-200 focus:border focus:border-gray-500 transition-all"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800" htmlFor="lastName">
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-72 bg-gray-200 shadow rounded-lg p-2 outline-none border border-gray-200 focus:border focus:border-gray-500 transition-all"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800" htmlFor="phone">
              Numero de telefono
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="w-72 bg-gray-200 shadow rounded-lg p-2 outline-none border border-gray-200 focus:border focus:border-gray-500 transition-all"
            />
          </div>
          <div className="flex flex-col text-gray-800">
            <label htmlFor="barber">Selecciona un barbero</label>
            <BarberPicker selectedBarber={selectedBarber} setSelectedBarber={setSelectedBarber} />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="date">Seleccione una hora y fecha</label>
            <DatePicker />
          </div>
          <div className="flex flex-col">
            <input
              type="submit"
              value="Registrarme"
              className="w-72 p-3 mt-12 shadow-lg bg-black cursor-pointer text-white rounded-lg hover:bg-black/90 transition-colors duration-150"
            />
          </div>
        </div>
      </Form>
    </main>
    <ModalSpinner isActive={modalOpen} setIsActive={setModalOpen} />
    </>
  );
};

export default BookHaircutPage;
