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

    setEvent({
      ...event,
      attendees: event.attendees.filter((attendee: string) => attendee !== name)
    });

    return;
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert(`Link copiado a ${window.location.href}`);
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
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [event.stravaRouteId]);

  return (
    <>
      <Header />

      <main className='p-4 max-w-4xl mx-auto'>
        <h1 className='text-3xl w-full'>
          {event.title}
        </h1>

        <p className='text-gray-500 mt-1'>
          {event.date?.toLocaleDateString()}
        </p>


        {/* Event Map */}
        <div className='mt-4' id="embededStravaMap" />

        {/* Event Details */}
        <div className='mt-4 flex flex-col gap-2'>
          <div className='flex gap-2 items-center'>
            <span className='font-bold'>Dificultad: </span>
            {/* 1 rombo for each difficulty */}
            <div className='flex'>
              {[...Array(parseInt(event.difficulty) || 0)].map((_, index) => (
                <Image key={index} src="/DiffRomboid.svg" alt="Dificultad" width={25} height={20} />
              ))}
            </div>
          </div>

          <p className='overflow-auto'>
            <span className='font-bold'>Punto de encuentro: </span>
            {
              // if it contains an http link, make it clickable
              event.meetingPoint?.includes("http") ?
                <a href={event.meetingPoint} target="_blank" rel="noreferrer" className='text-blue-500 underline gap-1 items-center ml-1'>
                  Ver Mapa
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                :
                event.meetingPoint
            }
          </p>

          <p>
            <span className='font-bold'>Hora de inicio: </span>
            {event.takeOffTime}
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
            <h2 className='text-lg font-bold'>Lista de Confirmación</h2>

            {/* Share Button */}
            {
              isAdmin &&
              < button className='border-2 border-tertiary text-tertiary py-1 px-2 rounded font-semibold text-sm flex gap-1 items-center' onClick={handleCopyLink}>
                Copy intive

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            }
          </div>

          {/* Assist form */}
          {event.date >= new Date() &&
            <div className='my-4'>
              <form className='flex gap-2 mt-1 justify-between' onSubmit={handleFormSubmit} autoComplete="off">
                <input type="text" placeholder="Escribe tu nombre" className='border border-gray-200 p-2 rounded w-full' name="name" value={form.name} onChange={handleFormChange} autoComplete="autocomplete_off_randString" required />

                <button className='bg-secondary text-white p-2 rounded' type="submit">
                  Apuntarme
                </button>
              </form>
            </div>
          }

          {/* Attendees list */}
          <div className='flex flex-col gap-2 my-4'>
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
        </div>

        {/* Edit Event Button */}
        {isAdmin &&
          <Link href={`/events/${params._id}/edit`} className="bg-tertiary text-white p-2 rounded flex justify-center text-center mt-6 gap-2">
            Editar evento

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </Link>
        }
      </main >
    </>
  )
}