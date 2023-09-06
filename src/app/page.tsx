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
            <iframe src="https://giphy.com/embed/5Zesu5VPNGJlm" height={"120px"} />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/events" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Ir a Eventos</Link>
            <a href="#" className="border-2 border-gray-800 text-black font-bold py-2 px-4 rounded flex gap-2">
              <span>
                Ir a Instagram
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 448 512" className='my-auto'><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
