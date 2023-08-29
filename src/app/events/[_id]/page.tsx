"use client"

import Header from "@/components/Header"
import Image from "next/image";
import Link from "next/link"
import { useEffect } from "react";

export default function EventPage() {
  const event = {
    "title": "Laguna de Servín",
    "description": "Ruta de 50km con 1,000m de ascenso.",
    date: new Date("2023-08-30"),
    "stravaLink": "https://www.strava.com/routes/284928",
    "difficulty": "3",
    "takeOffTime": "06:30",
    "meetingPoint": "Laguna de Servín",
    "finishTime": "08:30",
    assistants: [
      "Ramón Navarro",
      "Myrna",
      "Yahir",
      "Aketzali",
      "Carlos",
      "Paco",
      "Charly"
    ],
  }

  useEffect(() => {
    // <div className="strava-embed-placeholder" data-embed-type="route" data-embed-id="3127623879376346330" data-units="metric" />
    const embededDiv = document.createElement("div");
    embededDiv.className = "strava-embed-placeholder";
    embededDiv.setAttribute("data-embed-type", "route");
    embededDiv.setAttribute("data-embed-id", "3127623879376346330");
    embededDiv.setAttribute("data-units", "metric");
    // document.body.appendChild(embededDiv);

    const script = document.createElement("script");
    script.src = "https://strava-embeds.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Header />

      <main className='p-4'>
        <h1 className='text-3xl'>
          {event.title}
        </h1>

        <p className='text-gray-500'>
          {event.date.toLocaleDateString("es-MX", { year: "numeric", month: "2-digit", day: "2-digit" })}
        </p>

        {/* Event Map */}
        <div className='mt-4'>
          [Mapa]
          <br />
          [Stats]
        </div>

        {/* Event Details */}
        <div className='mt-4 flex flex-col gap-2'>
          <p>
            <span className='font-bold'>Hora de salida: </span>
            {event.takeOffTime}
          </p>
          <div className='flex gap-2 items-center'>
            <span className='font-bold'>Dificultad: </span>
            {/* 1 rombo for each difficulty */}
            <div className='flex'>
              {[...Array(parseInt(event.difficulty))].map((_, index) => (
                <Image key={index} src="/DiffRomboid.svg" alt="Dificultad" width={25} height={20} />
              ))}
            </div>
          </div>
          <p>
            <span className='font-bold'>Lugar de reunión: </span>
            {event.meetingPoint}
          </p>
          <p>
            <span className='font-bold'>Hora fin aprox: </span>
            {event.finishTime}
          </p>
          <p className="text-sm mt-1 bg-neutral-100 p-4 rounded shadow-md flex flex-col gap-1">
            <span className='font-semibold'>Descripción: </span>
            {event.description}
          </p>
        </div>

        {/* Event Assistant List */}
        <div className='mt-8'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-bold'>Lista de Asistentes</h2>
            {/* <button className='bg-secondary text-white p-1 rounded'>
              Apuntarme
            </button> */}
          </div>

          {/* Assist form */}
          {event.date >= new Date() &&
            <div className='my-2'>
              {/* <h3 className='font-semibold'>Apuntarme</h3> */}
              <form className='flex gap-2 mt-1 justify-between'>
                <input type="text" placeholder="Escribe tu nombre" className='border border-gray-200 p-2 rounded w-full' />

                <button className='bg-secondary text-white p-2 rounded'>
                  Apuntarme
                </button>
              </form>
            </div>
          }

          <div className='flex flex-col gap-2 mt-4'>
            {event.assistants.map((assistant, index) => (
              <p key={index} className='bg-neutral-100 p-2 rounded shadow-sm px-6'>
                {assistant}
              </p>
            ))}
          </div>

          {/* Assist form */}
          {/* <div className='mt-4'>
            <h3 className='font-semibold'>Apuntarme</h3>
            <form className='flex gap-2 mt-1 justify-between'>
              <input type="text" placeholder="Escribe tu nombre" className='border border-gray-200 p-2 rounded w-full' />

              <button className='bg-secondary text-white p-2 rounded'>
                Apuntarme
              </button>
            </form>
          </div> */}
        </div>
      </main>
    </>
  )
}