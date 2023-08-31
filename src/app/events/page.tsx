import Header from "@/components/Header";
import { Event } from "@/types/types";
import { ObjectId, WithId } from "mongodb";
import Link from "next/link";

function EventCard({ event }: { event: WithId<Event> }) {
  return (
    <div className='bg-white p-4 rounded shadow-md border border-gray-200 mb-4'>
      <h3 className='text-xl'>{event.title}</h3>
      <p className='text-sm text-gray-500'>
        {event.date.toLocaleDateString("es-MX", { year: "numeric", month: "2-digit", day: "2-digit" })}
      </p>

      <div className='mt-2 flex flex-col gap-2'>
        <p>
          <span className='font-bold'>Hora de salida: </span>
          {event.takeOffTime}
        </p>
        <p>
          <span className='font-bold'>Dificultad: </span>
          {event.difficulty}
        </p>
        <p className="text-sm mt-2">
          {event.description}
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

  const nextEvents: WithId<Event>[] = [
    {
      "_id": new ObjectId("64ec4581fa41df0a0eba30df"),
      "title": "El Meteoro - Ixtla | Parte 2",
      "description": "56.9KM con ruta del Ultrasonic Maratón para reconocer Terreno. Estar 15 Minutos antes.",
      "date": new Date("2023-08-26"),
      "stravaLink": "https://www.strava.com/routes/284928",
      "difficulty": "Dificil",
      "takeOffTime": "07:00",
      "meetingPoint": "Estacionamiento Meteoro Bike Park",
      "finishTime": "10:30",
      attendees: []
    },
  ];
  const pastEvents: WithId<Event>[] = [
    {
      "_id": new ObjectId("64ec4581fa41df0a0eba30df"),
      "title": "El Meteoro - Ixtla",
      "description": "56.9KM con ruta del Ultrasonic Maratón para reconocer Terreno. Estar 15 Minutos antes.",
      "date": new Date("2023-08-26"),
      "stravaLink": "https://www.strava.com/routes/284928",
      "difficulty": "Dificil",
      "takeOffTime": "07:00",
      "meetingPoint": "Estacionamiento Meteoro Bike Park",
      "finishTime": "10:30",
      attendees: []
    },
    {
      "_id": new ObjectId("64ebf3d3fa41df0a0eba30de"),
      "title": "Laguna de Servín",
      "description": "2 horas de rodada en la laguna de Servín",
      "date": new Date("2023-08-19"),
      "stravaLink": "https://www.strava.com/routes/284928",
      "difficulty": "Facil",
      "takeOffTime": "06:30",
      "meetingPoint": "Laguna de Servín",
      "finishTime": "08:30",
      attendees: []
    }
  ]

  return (
    <>
      <Header />

      <main className='p-4 flex flex-col'>
        <div className="flex justify-between items-center">
          <h1 className='text-3xl'>
            Eventos
          </h1>
          
          <Link href='/events/add' className="bg-primary text-white p-2 flex rounded text-center justify-center gap-1 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Crear Evento
          </Link>
        </div>

        {/* Events List */}
        <div className='flex flex-col my-4'>
          <h2 className='text-lg my-2'>Próximos Eventos</h2>
          {nextEvents.map((event, index) => (
            <EventCard event={event} key={index} />
          ))}

          <h2 className='text-lg my-2'>Eventos Anteriores</h2>
          {pastEvents.map((event, index) => (
            <EventCard event={event} key={index} />
          ))}
        </div>

        {/* Add Event Button */}
        <Link href='/events/add' className="bg-primary text-white p-2 flex rounded text-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Crear Evento
        </Link>
      </main >
    </>
  )
}