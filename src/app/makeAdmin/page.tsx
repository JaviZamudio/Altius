"use client"

import Link from "next/link";
import { useEffect } from "react";

export default function MakeAdminPage() {
    useEffect(() => {
        // add isAdmin = true to local storage
        localStorage.setItem("isAdmin", "true");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen p-8 text-center">
            <h1 className="text-3xl font-bold">¡Felicidades!</h1>
            <p className="text-xl my-4">Ahora eres administrador de la página</p>

            <Link href="/" className="bg-primary text-white p-2 flex rounded text-center justify-center gap-1 text-sm mt-4">
                Ir a la página principal
            </Link>
        </div>
    );
}