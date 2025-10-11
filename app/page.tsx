"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 bg-blue-50">
      <main className="flex flex-col gap-8 items-center">
        {/* Gambar joran mancing dari sumber eksternal */}
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
          alt="Joran Mancing"
          width={300}
          height={300}
          priority
          className="rounded-lg shadow-lg"
        />
        <h1 className="text-2xl font-bold text-blue-900">Selamat Datang di Situs Mancing!</h1>
        <p className="text-lg text-blue-700 text-center max-w-md">
          Temukan tips, trik, dan informasi seputar dunia memancing. Mulai petualangan mancingmu sekarang!
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            href="/tips"
            className="rounded-full bg-blue-600 text-white font-medium px-6 py-2 hover:bg-blue-700 transition"
          >
            Tips Mancing
          </Link>
          <a
            className="rounded-full bg-green-600 text-white font-medium px-6 py-2 hover:bg-green-700 transition"
            href="/lokasi"
          >
            Lokasi Favorit
          </a>
        </div>
      </main>
      <footer className="mt-12 text-blue-800">
        &copy; {new Date().getFullYear()} Situs Mancing. Semua hak dilindungi.
      </footer>
    </div>
  );
}
