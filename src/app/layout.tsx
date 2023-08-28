import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Altius MTB',
  description: 'Altius MTB es un club de ciclismo de montaña en Querétaro, México.',
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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
