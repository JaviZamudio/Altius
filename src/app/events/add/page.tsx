"use client"

import Header from '@/components/Header'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AddEventPage() {
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
  const router = useRouter()

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(form)

    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const resBody = await response.json()

    console.log(resBody)

    if (resBody.code === 'OK') {
      alert('Evento creado')
      router.push('/events')
    } else {
      alert('Error al crear evento')
    }
  }

  return (
    <>
      <Header />

      <main className='p-4'>

        <form className='flex flex-col gap-4 mt-4 mx-auto max-w-xs' onSubmit={handleFormSubmit}>
          <h1 className='text-3xl'>
            Crear Evento
          </h1>
          {/* Title */}
          <div className='flex flex-col gap-1 w-full'>
            <span>Título</span>
            <input
              type='text'
              className='border border-gray-300 rounded p-2'
              placeholder='Título'
              name='title'
              onChange={handleFormChange}
              autoComplete='off'
              required
              value={form.title}
            />
          </div>

          {/* Strava Route Link */}
          {/* <MyInput label='Link de Strava' type='text' name='stravaLink' onChange={handleFormChange} required /> */}
          <div className='flex flex-col gap-1 w-full'>
            <span>Link de Strava</span>
            <input
              type='text'
              className='border border-gray-300 rounded p-2'
              placeholder='Link de Strava'
              name='stravaLink'
              onChange={handleFormChange}
              autoComplete='off'
              required
              value={form.stravaLink}
            />
          </div>

          {/* Difficulty */}
          <div className='flex flex-col gap-1 w-full'>
            <span>Dificultad</span>
            <select className='border border-gray-300 rounded p-2' name='difficulty' onChange={handleFormChange} required value={form.difficulty}>
              <option value="1">Fácil</option>
              <option value="2">Intermedio</option>
              <option value="3">Difícil</option>
              <option value="4">Extremo</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className='flex w-full justify-between gap-1'>
            {/* Takeoff time */}
            <div className='flex flex-col gap-1 w-full'>
              <span>Hora de salida</span>
              <input
                type='time'
                className='border border-gray-300 rounded p-2'
                placeholder='Hora de salida'
                name='takeOffTime'
                onChange={handleFormChange}
                autoComplete='off'
                required
                value={form.takeOffTime}
              />
            </div>

            {/* Finish time */}
            <div className='flex flex-col gap-1 w-full'>
              <span>Hora fin Aprox</span>
              <input
                type='time'
                className='border border-gray-300 rounded p-2'
                placeholder='Hora fin Aprox'
                name='finishTime'
                onChange={handleFormChange}
                autoComplete='off'
                required
                value={form.finishTime}
              />
            </div>
          </div>

          {/* Date */}
          <div className='flex flex-col gap-1 w-full'>
            <span>Fecha</span>
            <input
              type='date'
              className='border border-gray-300 rounded p-2'
              placeholder='Fecha'
              name='date'
              onChange={handleFormChange}
              autoComplete='off'
              required
              value={form.date}
            />
          </div>

          {/* Takeoff place */}
          <div className='flex flex-col gap-1 w-full'>
            <span>Lugar de salida</span>
            <input
              type='text'
              className='border border-gray-300 rounded p-2'
              placeholder='Lugar de salida'
              name='meetingPoint'
              onChange={handleFormChange}
              autoComplete='off'
              required
              value={form.meetingPoint}
            />
          </div>

          {/* Description */}
          <div className='flex flex-col gap-1 w-full'>
            <span>Descripción</span>
            <textarea
              className='border border-gray-300 rounded p-2'
              name='description'
              onChange={handleFormChange}
              required
              value={form.description}
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className='flex gap-4'>
            {/* <button className='rounded p-2 border border-gray-600 text-gray-600' type='button' tabIndex={-1}>
              Cancelar
            </button> */}
            <Link href='/events' className='rounded p-2 border border-gray-600 text-gray-600' tabIndex={-1}>
              Cancelar
            </Link>

            <button className='bg-secondary text-white rounded p-2' type='submit'>
              Crear Evento
            </button>
          </div>
        </form>
      </main>
    </>
  )
}
