import { BarberDetailCard } from "@/src/components/Private/BarberDetailCard";
import Link from "next/link";

export default function BarbersPage() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center gap-3">
      <section className="w-[90%] md:w-[40%] rounded-md mt-24 border border-gray-300 shadow-lg p-3 flex flex-col">
        <BarberDetailCard />
      </section>
      <div className="mt-6">
        <Link href={'/private/createNewBarber'} className="p-3 bg-black font-bold text-white mt-4 rounded-md shadow hover:bg-[#363635] transition-colors duration-150 ">
          Crear nuevo barbero
        </Link>
      </div>
    </main>
  );
}
