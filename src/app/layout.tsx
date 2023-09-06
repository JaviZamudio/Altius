import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Altius MTB',
  description: 'Altius es un grupo de triatletas y ciclistas de montaña que se reúnen para entrenar y competir en eventos de MTB y triatlón. Creado por BoutSoftware.',
  applicationName: 'Altius MTB',
  keywords: ['altius', 'mtb', 'ciclismo', 'ciclista', 'montaña', 'bicicleta', 'bici', 'ciclistas', 'ciclistas de montaña', 'Querétaro', 'México', 'BoutSoftware'],
  authors: [{ name: 'BoutSoftware', url: 'https://boutsoftware.com' }, { name: 'Javier Zamudio', url: 'https://https://github.com/JaviZamudio' }],
  creator: 'BoutSoftware',
  publisher: 'BoutSoftware',
  icons: {
    icon: '/Mini.svg',
  },
  openGraph: { type: 'website' }
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
