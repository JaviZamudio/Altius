"use client"

import Header from '@/components/Header'
import Link from 'next/link'
import React from 'react'

function MyInput({ label, type = 'text', placeholder, children }: any) {
  return (
    <label className='flex flex-col gap-2 w-full'>
      <span>{label}</span>
      {
        children ?
          children :
          <input type={type} className='border border-gray-300 rounded p-2' placeholder={placeholder} />
      }
    </label>
  )
}

export default function AddEventPage() {
  return (
    <>
      <Header />

      <main className='p-4'>

        <form className='flex flex-col gap-4 mt-4 mx-auto max-w-xs'>
          <h1 className='text-3xl'>
            Crear Evento
          </h1>
          {/* Title */}
          <MyInput label='Título' />

          {/* Strava Route Link */}
          <MyInput label='Link de Strava' type='url' />

          {/* Difficulty */}
          <MyInput label='Dificultad'>
            <select className='border border-gray-300 rounded p-2'>
              <option value="1">Fácil</option>
              <option value="2">Intermedio</option>
              <option value="3">Difícil</option>
              <option value="4">Extremo</option>
            </select>
          </MyInput>

          {/* Date & Time */}
          <div className='flex w-full justify-between gap-1'>
            {/* Date */}
            <MyInput label='Fecha' type='date' />
            
            {/* Takeoff time */}
            <MyInput label='Hora de salida' type='time' />
          </div>

          {/* Takeoff place */}
          <MyInput label='Lugar de salida' />

          {/* Description */}
          <label className='flex flex-col gap-2'>
            <span>Descripción</span>
            <textarea className='border border-gray-300 rounded p-2' />
          </label>

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
