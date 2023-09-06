"use client"

import Header from "@/components/Header";
import { Event } from "@/types/types";
import { ObjectId, WithId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function EventCard({ event }: { event: any }) {
  return (
    <div className='bg-white p-4 rounded shadow-md border border-gray-200'>
      <h3 className='text-xl'>{event.title}</h3>
      <p className='text-sm text-gray-500'>
        {
          new Date(event.date).toLocaleDateString()
        }
      </p>

      <div className='mt-2 flex flex-col gap-2'>
        <p>
          <span className='font-bold'>Hora de salida: </span>
          {event.takeOffTime}
        </p>
        <div className='flex gap-2 items-center'>
          <span className='font-bold'>Dificultad: </span>
          {/* 1 rombo for each difficulty */}
          <div className='flex'>
            {[...Array(parseInt(event.difficulty) || 0)].map((_, index) => (
              <Image key={index} src="/DiffRomboid.svg" alt="Dificultad" width={25} height={20} />
            ))}
          </div>
        </div>
        <p className="text-sm mt-2">
          {/* only the first 144 chars */}
          {event.description.length > 144 ? event.description.slice(0, 144) + '...' : event.description}
        </p>

        {/* Event Actions */}
        <div className='flex justify-end mt-2'>
          <Link href={`/events/${event._id}`} className='bg-secondary text-white p-2 rounded'>
            Ver Evento
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function EventsPage() {
  const [nextEvents, setNextEvents] = useState<WithId<Event>[]>([])
  const [pastEvents, setPastEvents] = useState<WithId<Event>[]>([])
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  // Get events
  const getEvents = async () => {
    const res = await fetch('/api/events')
    const resBody = await res.json()

    if (resBody.code === 'OK') {
      setNextEvents(resBody.data.nextEvents)
      setPastEvents(resBody.data.pastEvents)
    } else {
      alert('Error al obtener eventos')
    }
  }

  useEffect(() => {
    getEvents()

    setIsAdmin(localStorage.getItem('isAdmin') === 'true')
  }, [])

  return (
    <>
      <Header />

      <main className='p-4 flex flex-col max-w-2xl mx-auto'>
        <div className="flex justify-between items-center">
          <h1 className='text-3xl'>
            Eventos
          </h1>
          {
            isAdmin &&
            <Link href='/events/add' className="bg-primary text-white p-2 flex rounded text-center justify-center gap-1 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Crear Evento
            </Link>
          }
        </div>

        {/* Events List */}
        <div className='flex flex-col my-4 gap-4'>
          <h2 className='text-lg'>Próximos Eventos</h2>
          {nextEvents.length === 0 &&
            <p className="text-sm text-gray-500 w-full ml-16 my-4">
              No hay eventos próximos
            </p>
          }
          {nextEvents.map((event, index) => (
            <EventCard event={event} key={index} />
          ))}
          
          <h2 className='text-lg gap-4'>Eventos Anteriores</h2>
          {pastEvents.map((event, index) => (
            <EventCard event={event} key={index} />
          ))}
        </div>

        {/* Add Event Button */}
        {
          isAdmin &&
          <>
            <hr className='mb-4' />
            <Link href='/events/add' className="bg-primary text-white p-2 flex rounded text-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Crear Evento
            </Link>
          </>
        }
      </main >
    </>
  )
}