"use client"

import Header from "@/components/Header"
import { Event } from "@/types/types";
import Image from "next/image";
import Link from "next/link"
import { useEffect, useState } from "react";

export default function EventPage({ params }: { params: { _id: string } }) {
  const [event, setEvent] = useState({} as any);
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({
    name: ""
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const updateAttendees = async () => {
    const res = await fetch(`/api/events/${params._id}`, {
      method: "POST",
      body: JSON.stringify({
        name: form.name
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const body = await res.json();

    if (body.code !== "OK") {
      alert("Error al registrar asistencia");
      return;
    }

    alert("Asistencia registrada");
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEvent({
      ...event,
      attendees: [
        form.name,
        ...event.attendees,
      ],
    });
    setForm({
      name: ""
    });

    updateAttendees();
  }

  const getEvent = async () => {
    const res = await fetch(`/api/events/${params._id}`);
    const body = await res.json();

    if (body.code !== "OK") {
      alert("Error al obtener el evento");
      return;
    }

    body.data.date = new Date(body.data.date);
    body.data.stravaRouteId = body.data.stravaLink.split("/").pop();

    setEvent(body.data);
  }

  const removeAttendee = async (name: string) => {
    const res = await fetch(`/api/events/${params._id}`, {
      method: "DELETE",
      body: JSON.stringify({
        name
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const body = await res.json();

    if (body.code !== "OK") {
      alert("Error al eliminar asistencia");
      return;
    }

    alert("Asistencia eliminada");

    setEvent({
      ...event,
      attendees: event.attendees.filter((attendee: string) => attendee !== name)
    });

    return;
  }

  useEffect(() => {
    getEvent();

    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  useEffect(() => {
    // <div className="strava-embed-placeholder" data-embed-type="route" data-embed-id="3127623879376346330" data-units="metric" data-full-width="true" />
    const embededDiv = document.createElement("div");
    embededDiv.className = "strava-embed-placeholder";
    embededDiv.setAttribute("data-embed-type", "route");
    embededDiv.setAttribute("data-embed-id", event.stravaRouteId);
    embededDiv.setAttribute("data-units", "metric");
    embededDiv.setAttribute("data-full-width", "true");
    document.getElementById("embededStravaMap")?.replaceChildren(embededDiv);

    const script = document.createElement("script");
    script.src = "https://strava-embeds.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [event.stravaRouteId]);

  return (
    <>
      <Header />

      <main className='p-4'>
        <h1 className='text-3xl'>
          {event.title}
        </h1>

        <p className='text-gray-500'>
          {event.date?.toLocaleDateString("es-MX", { year: "numeric", month: "2-digit", day: "2-digit" })}
        </p>

        {/* Event Map */}
        <div className='mt-4' id="embededStravaMap">
          {/* [Mapa]
          <br />
          [Stats] */}
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
              {[...Array(parseInt(event.difficulty) || 0)].map((_, index) => (
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
            {/* <button className='bg-secondary text-white p-1 rounded px-2'>
              Apuntarme
            </button> */}
          </div>

          {/* Assist form */}
          {event.date >= new Date() &&
            <div className='my-4'>
              <form className='flex gap-2 mt-1 justify-between' onSubmit={handleFormSubmit} autoComplete="off">
                <input type="text" placeholder="Escribe tu nombre" className='border border-gray-200 p-2 rounded w-full' name="name" value={form.name} onChange={handleFormChange} autoComplete="autocomplete_off_randString" />

                <button className='bg-secondary text-white p-2 rounded' type="submit">
                  Apuntarme
                </button>
              </form>
            </div>
          }

          <div className='flex flex-col gap-2 mt-4'>
            {event.attendees?.map((assistant: string, index: number) => (
              <div key={index} className="flex justify-between items-center bg-neutral-100 p-2 rounded shadow-sm px-6">
                <p>{assistant}</p>

                {isAdmin &&
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-600 cursor-pointer" onClick={() => removeAttendee(assistant)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                }
              </div>
            ))}
          </div>

          {/* Assist form */}
          {/* {event.date >= new Date() &&
            <div className='mt-6 mb-4'>
              <h3 className='font-semibold'>Apuntarme</h3> 
              <form className='flex gap-2 mt-1 justify-between'>
                <input type="text" placeholder="Escribe tu nombre" className='border border-gray-200 p-2 rounded w-full' />

                <button className='bg-secondary text-white p-2 rounded'>
                  Apuntarme
                </button>
              </form>
            </div>
          } */}
        </div>
      </main>
    </>
  )
}