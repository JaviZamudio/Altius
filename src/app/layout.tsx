import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Altius MTB',
  description: 'Altius es un grupo de triatletas y ciclistas de montaña que se reúnen para entrenar y competir en eventos de MTB y triatlón.',
  icons: {
    icon: '/Mini.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-MX">
      <body className={inter.className + " min-h-screen flex flex-col"}>
        {children}
      </body>
    </html>
  )
}
