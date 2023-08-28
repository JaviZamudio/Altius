import Header from "@/components/Header";
import Link from "next/link";

export default function EventsPage() {
  return (
    <>
      <Header />

      <main className='p-4'>
        <h1 className='text-3xl'>
          Eventos
        </h1>

        {/* Add Event Button */}
        <Link href='/events/add' className="bg-secondary text-white p-2 rounded">
          Crear Evento
        </Link>
      </main>
    </>
  )
}