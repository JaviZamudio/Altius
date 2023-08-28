"use client"

import Header from "@/components/Header"
import Link from "next/link"
import { useEffect } from "react";

export default function EventPage() {
  const event = {
    "title": "Laguna de Servín",
    "description": "2 horas de rodada en la laguna de Servín",
    date: new Date("2023-08-19"),
    "stravaLink": "https://www.strava.com/routes/284928",
    "difficulty": "Facil",
    "takeOffTime": "06:30",
    "meetingPoint": "Laguna de Servín",
    "finishTime": "08:30"
  }

  useEffect(() => {
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

        <div className="strava-embed-placeholder" data-embed-type="route" data-embed-id="3127623879376346330" data-units="metric" data-full-width="true"></div>

        {/* Event */}

        <p className='text-gray-500'>
          {event.description}
        </p>
        <p className='text-gray-500'>
          {event.date.toDateString()}
        </p>
        <p className='text-gray-500'>
          {event.stravaLink}
        </p>
        <p className='text-gray-500'>
          {event.difficulty}
        </p>
        <p className='text-gray-500'>
          {event.takeOffTime}
        </p>
        <p className='text-gray-500'>
          {event.meetingPoint}
        </p>
        <p className='text-gray-500'>
          {event.finishTime}
        </p>

        {/* Back to Events */}
        {/* <Link href='/events'>
          <a className='text-blue-500 underline'>
            &larr; Regresar a eventos
          </a>
        </Link> */}
      </main>
    </>
  )
}