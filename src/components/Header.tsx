import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import MyLink from "./MyLink";

export default function Header() {
  return (
    <header className='flex justify-between items-center h-16 p-4 bg-primary sticky top-0 z-10'>
      <Link href='/'>
        <Image src="/MTB Horizontal.svg" alt="Altius MTB" width={160} height={0} />
      </Link>

      <nav className='flex items-center gap-4'>
        <MyLink href='/' text='Home' />
        <MyLink href='/events' text='Events' />
      </nav>
    </header>
  )
}