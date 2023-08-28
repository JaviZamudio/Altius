import Header from "@/components/Header";
import Link from "next/link";

export default function EventsPage() {
  const events = [
    {
      "title": "Laguna de Servín",
      "description": "2 horas de rodada en la laguna de Servín",
      date: new Date("2023-08-19"),
      "stravaLink": "https://www.strava.com/routes/284928",
      "difficulty": "Facil",
      "takeOffTime": "06:30",
      "meetingPoint": "Laguna de Servín",
      "finishTime": "08:30"
    },
    {
      "title": "Presa de la Boca",
      "description": "2 horas de rodada en la presa de la boca",
      date: new Date("2023-08-19"),
      "stravaLink": "https://www.strava.com/routes/284928",
      "difficulty": "Intermedio",
      "takeOffTime": "06:30",
      "meetingPoint": "Laguna de Servín",
      "finishTime": "08:30"
    },
    {
      "title": "Mina de la luz",
      "description": "2 horas de rodada en la mina de la luz",
      date: new Date("2023-08-19"),
      "stravaLink": "https://www.strava.com/routes/284928",
      "difficulty": "Dificil",
      "takeOffTime": "06:30",
      "meetingPoint": "Laguna de Servín",
      "finishTime": "08:30"
    },
    {
      "title": "Sierra de Santiago",
      "description": "2 horas de rodada en la sierra de Santiago",
      date: new Date("2023-08-19"),
      "stravaLink": "https://www.strava.com/routes/284928",
      "difficulty": "Extremo",
      "takeOffTime": "06:30",
      "meetingPoint": "Laguna de Servín",
      "finishTime": "08:30"
    }
  ]

  return (
    <>
      <Header />

      <main className='p-4'>
        <h1 className='text-3xl'>
          Eventos
        </h1>

        {/* Events List */}
        <div className='flex flex-col gap-4 my-4'>
          {events.map((event, index) => (
            <div key={index} className='bg-white p-4 rounded shadow-md border border-gray-200'>
              <h2 className='text-xl'>{event.title}</h2>
              <p className='text-sm text-gray-500'>
                {event.date.toLocaleDateString()}
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
              </div>
            </div>
          ))}
        </div>

        {/* Add Event Button */}
        <Link href='/events/add' className="bg-secondary text-white p-2 rounded">
          Crear Evento
        </Link>
      </main >
    </>
  )
}