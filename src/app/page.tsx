import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const images = [
    // "https://www.svgrepo.com/show/217073/bulldozer.svg",
    // "https://www.svgrepo.com/show/217075/excavator.svg",
    // "https://www.svgrepo.com/show/217076/truck.svg",
    // "https://www.svgrepo.com/show/217079/steamroller-road.svg",
    // "https://www.svgrepo.com/show/217080/dump-truck-truck.svg",
    // "https://www.svgrepo.com/show/217080/dump-truck-truck.svg",
    "https://www.svgrepo.com/show/426192/cogs-settings.svg",
    "https://www.svgrepo.com/show/296263/crane.svg",
    "https://www.svgrepo.com/show/296268/loader.svg",
    "https://www.svgrepo.com/show/296276/industrial-robot-robot.svg",
    "https://www.svgrepo.com/show/296277/industrial-robot-robot.svg",
    "https://www.svgrepo.com/show/296279/crane.svg",
    "https://www.svgrepo.com/show/296285/driller-drill.svg",
    "https://www.svgrepo.com/show/296287/industrial-robot-factory.svg",
    "https://www.svgrepo.com/show/296304/cargo-truck-construction.svg",
    // "https://www.svgrepo.com/show/296302/gauge-indicator.svg",
    "https://www.svgrepo.com/show/296305/container-port.svg"
  ]

  const randomImage = images[Math.floor(Math.random() * images.length)]

  return (
    <>
      <Header />

      <main className=" flex flex-col justify-center items-center my-auto p-4">
        <div className="flex flex-col justify-center items-center">
          {/* <img src={randomImage} alt="Logo" className="mb-8 h-40" /> */}
          <Image src={randomImage} alt="Logo" width={160} height={160} className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-700 mb-4">Sitio en construcción</h1>
          {/* <p className="text-center text-gray-500 text-lg md:text-xl lg:text-2xl mb-8">El inge está trabajando... <p className="text-2xl md:text-3xl lg:text-4xl">👷‍♂️</p></p> */}
          <p className="text-center text-gray-500 text-lg md:text-xl lg:text-2xl mb-6 flex flex-col items-center gap-2">
            El inge está trabajando...
            <iframe src="https://giphy.com/embed/5Zesu5VPNGJlm" height={"120px"}/>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/events" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Ir a Eventos</Link>
            <a href="#" className="border-2 border-gray-800 text-black font-bold py-2 px-4 rounded">
              Recargar pagina
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
