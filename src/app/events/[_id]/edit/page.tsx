"use client"

import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditEventPage({ params }: { params: { _id: string } }) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    stravaLink: '',
    difficulty: '1',
    date: '',
    takeOffTime: '',
    meetingPoint: '',
    description: '',
    finishTime: ''
  })

  const updateEvent = async () => {
    const response = await fetch(`/api/events/${params._id}`, {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const resBody = await response.json()

    console.log(resBody)

    if (resBody.code === 'OK') {
      alert('Evento actualizado')
      router.push(`/events/${params._id}`)
    } else {
      alert('Error al actualizar evento')
    }
  }

  const deleteEvent = async () => {
    const response = await fetch(`/api/events/${params._id}`, {
      method: 'DELETE',
    })

    const resBody = await response.json()

    console.log(resBody)

    if (resBody.code === 'OK') {
      alert('Evento eliminado')
      router.push('/events')
    } else {
      alert('Error al eliminar evento')
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    updateEvent()
  }

  const getEvent = async () => {
    const response = await fetch(`/api/events/${params._id}`)

    const resBody = await response.json()

    if (resBody.code !== 'OK') {
      alert('Error al obtener evento')
      router.push('/events')
    }

    const event = resBody.data

    console.log(event)

    setForm({
      title: event.title,
      stravaLink: event.stravaLink,
      difficulty: event.difficulty,
      // date in: 2023-09-02T00:00:00.000Z format by default... make it into 2023-09-02
      date: event.date.split('T')[0],
      takeOffTime: event.takeOffTime,
      meetingPoint: event.meetingPoint,
      description: event.description,
      finishTime: event.finishTime
    })
  }

  useEffect(() => {
    getEvent()

    if(localStorage.getItem("isAdmin") !== "true") {
      router.push(`/events/${params._id}`)
    }
  }, []);

  return (
    <>
      <Header />

      <main className="p-4">

        <h1 className="text-3xl">
          Editar Evento
        </h1>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mt-4 mx-auto max-w-xs">
          <label className="flex flex-col gap-1">
            <span className="">Título</span>
            <input
              type="text"
              className="border border-gray-300 rounded p-2"
              placeholder="Escribe un título"
              name="title"
              onChange={handleFormChange}
              autoComplete="off"
              required
              value={form.title}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="">Link de Strava</span>
            <input
              type="text"
              className="border border-gray-300 rounded p-2"
              placeholder="Link de Strava"
              name="stravaLink"
              onChange={handleFormChange}
              autoComplete="off"
              required
              value={form.stravaLink}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="">Dificultad</span>
            <select
              className="border border-gray-300 rounded p-2"
              name="difficulty"
              onChange={handleFormChange}
              required
              value={form.difficulty}
            >
              <option value="1">Fácil</option>
              <option value="2">Media</option>
              <option value="3">Difícil</option>
              <option value="4">Extrema</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="">Fecha</span>
            <input
              type="date"
              className="border border-gray-300 rounded p-2"
              placeholder="Fecha"
              name="date"
              onChange={handleFormChange}
              autoComplete="off"
              required
              value={form.date}
            />
          </label>

          <div className="flex gap-1">
            <label className="flex flex-col gap-1 w-full">
              <span className="">Hora de salida</span>
              <input
                type="time"
                className="border border-gray-300 rounded p-2"
                placeholder="Hora de salida"
                name="takeOffTime"
                onChange={handleFormChange}
                autoComplete="off"
                required
                value={form.takeOffTime}
              />
            </label>

            <label className="flex flex-col gap-1 w-full">
              <span className="">Hora fin Aprox</span>
              <input
                type="time"
                className="border border-gray-300 rounded p-2"
                placeholder="Hora fin Aprox"
                name="finishTime"
                onChange={handleFormChange}
                autoComplete="off"
                required
                value={form.finishTime}
              />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className="">Punto de encuentro</span>
            <input
              type="text"
              className="border border-gray-300 rounded p-2"
              placeholder="Punto de encuentro"
              name="meetingPoint"
              onChange={handleFormChange}
              autoComplete="off"
              required
              value={form.meetingPoint}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="">Descripción</span>
            <textarea
              className="border border-gray-300 rounded p-2"
              placeholder="Descripción"
              name="description"
              onChange={handleFormChange}
              autoComplete="off"
              required
              rows={3}
              value={form.description}
            />
          </label>


          {/* Action Buttons */}
          <div className='flex gap-4'>
            <Link href={`/events/${params._id}`}
              className='rounded p-2 border-2 border-gray-600 text-gray-600 w-1/2 text-center'
              tabIndex={-1}
            >
              Cancelar
            </Link>

            <button className='bg-secondary text-white rounded p-2 w-1/2' type='submit'>
              Guardar
            </button>
          </div>
        </form>

        <hr className="my-4" />

        <button className='bg-red-500 text-white rounded p-2 w-full' onClick={deleteEvent}>
          Eliminar Evento
        </button>
      </main>
    </>
  );
}