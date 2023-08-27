"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyLink({ href, text }: { href: string, text: string }) {
    const pathname = usePathname();

    return (
        <Link href={href} className={`text-accent ${pathname === href ? 'border-b-2 border-secondary dark:border-secondary-dark' : ''}`}>
            {text}
        </Link>
    )
}