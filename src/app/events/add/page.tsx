import Header from '@/components/Header'
import React from 'react'

export default function AddEventPage() {
  return (
    <>
      <Header />

      <main className='p-4'>
        <h1 className='text-3xl'>
          Crear Evento
        </h1>

        <form className='flex flex-col gap-4 mt-4'>
          {/* Title */}
          <label className='flex flex-col gap-2'>
            <span>Titulo</span>
            <input type="text" className='border border-gray-300 dark:border-gray-700 rounded p-2' />
          </label>

          {/* Strava Route Link */}
          <label className='flex flex-col gap-2'>
            <span>Link de la Ruta</span>
            <input type="url" />
          </label>

          {/* Difficulty */}
          <label className='flex flex-col gap-2'>
            <span>Dificultad</span>
            <select>
              <option value="1">Fácil</option>
              <option value="2">Intermedio</option>
              <option value="3">Difícil</option>
              <option value="4">Extremo</option>
            </select>
            <input type='range' min='1' max='4' step='1' />
          </label>

          {/* Date */}
          <label className='flex flex-col gap-2'>
            <span>Fecha</span>
            <input type="date" />
          </label>

          {/* Time */}
          <label className='flex flex-col gap-2'>
            <span>Hora</span>
            <input type="time" />
          </label>

          {/* Takeoff place */}
          <label className='flex flex-col gap-2'>
            <span>Lugar de salida</span>
            <input type="text" />
          </label>

          {/* Description */}
          <label className='flex flex-col gap-2'>
            <span>Descripción</span>
            <textarea />
          </label>

          {/* Submit */}
          <button className='bg-secondary text-white rounded p-2'>
            Crear Evento
          </button>
        </form>
      </main>
    </>
  )
}
