"use client";

import { loginBarber } from "@/src/api/login/LoginApi";
import { BarberLoginSchema } from "@/src/schemas";
import { useMutation } from "@tanstack/react-query";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const router = useRouter()
    const { mutate } = useMutation({
        mutationFn: loginBarber,
        onSuccess: (data) => {
          localStorage.setItem('sessionToken', data)
            toast.success("Iniciando sesión")
            router.push("/private/home")
        },
        onError: (error) => {
            toast.error(error.message)
    }
})
const handleAction = (formData: FormData)=> {
    const data = {
        email: formData.get('email')!.toString(),
        password: formData.get('password')!.toString()
    }
    const result = BarberLoginSchema.safeParse(data)
    if(!result.success) {
        result.error.issues.forEach(issue => {
            toast.error(issue.message)
        })
        return
    }
    mutate(result.data)
}
  return (
    <Form
      className="w-full h-full flex flex-col gap-3 justify-evenly"
      action={handleAction}
    >

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-gray-900" htmlFor="email">
            Email:{" "}
          </label>
          <input
            id="email"
            className="p-2 border rounded-md shadow-sm outline-none focus:border-brown/50 transition-colors duration-150"
            type="text"
            name="email"
            placeholder="ejemplo@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-900" htmlFor="password">
            Contraseña:{" "}
          </label>
          <input
            id="password"
            className="p-2 border rounded-md shadow-sm outline-none focus:border-brown/50 transition-colors duration-150"
            type="text"
            name="password"
            placeholder="123456..."
          />
        </div>
      </div>

      <div className="flex flex-col">
        <input
          className="p-3 bg-black cursor-pointer font-bold text-white mt-4 rounded-md shadow hover:bg-[#363635] transition-colors duration-150 "
          type="submit"
          value="Iniciar sesión"
        />
      </div>
    </Form>
  );
};
