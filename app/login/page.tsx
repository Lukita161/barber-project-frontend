import { LoginForm } from "@/src/components/Login/LoginForm";
import { NotificationContainer } from "@/src/components/Public/NotificationContainer";

export default function LoginPage() {
  return (
    <>
    <main className="w-full h-screen flex bg-slate-100 items-center justify-center">
      <section className="w-[85%] h-[60%] md:w-[30%] md:h-[80%] bg-slate-50 rounded-md shadow-md p-4">
        <div className="flex flex-col items-center">
          <h1>Nombre</h1>
          <h2 className="text-gray-900 font-medium">
            Inicia sesión para continuar
          </h2>
        </div>
        <LoginForm />
      </section>
    </main>
    <NotificationContainer />
    </>
  );
}
