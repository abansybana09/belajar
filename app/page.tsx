"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-start min-h-screen p-6 sm:p-12 bg-gradient-to-b from-white via-blue-50 to-sky-50 dark:from-slate-900 dark:via-slate-800">

      <main className="max-w-6xl mx-auto w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur rounded-2xl shadow-xl p-8 sm:p-12 mt-8 border border-sky-50 dark:border-slate-800">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">Selamat Datang di Dunia Mancing</h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">
              Temukan tips, trik, dan lokasi memancing terbaik. Mulai petualanganmu dengan panduan praktis dan rekomendasi spot dari komunitas.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/tips"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-white font-medium shadow transition transform hover:scale-105 bg-gradient-to-r from-rose-500 to-pink-500"
              >
                📘 Tips Mancing
              </Link>

              <Link
                href="/lokasi"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-white font-medium shadow transition transform hover:scale-105 bg-gradient-to-r from-emerald-500 to-emerald-600"
              >
                📍 Lokasi Favorit
              </Link>

              <a
                href="#"
                className="inline-flex items-center gap-3 border border-sky-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium px-4 py-2 rounded-lg hover:shadow-sm transition"
              >
                🤝 Bergabung dengan Komunitas
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-sky-100 dark:ring-slate-700">
              <Image
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                alt="Joran Mancing"
                width={540}
                height={360}
                className="block w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>

        {/* <section className="mt-10">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">Fitur Populer</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/tips" className="p-6 bg-white/80 dark:bg-slate-800/70 rounded-xl shadow hover:shadow-lg border border-sky-50 dark:border-slate-800 transition">
              <div className="text-3xl">🎣</div>
              <h4 className="mt-4 font-semibold text-slate-900 dark:text-slate-100">Panduan & Teknik</h4>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">Belajar teknik dasar hingga tingkat lanjut, pemilihan umpan dan perawatan alat.</p>
            </Link>

            <Link href="/lokasi" className="p-6 bg-white/80 dark:bg-slate-800/70 rounded-xl shadow hover:shadow-lg border border-sky-50 dark:border-slate-800 transition">
              <div className="text-3xl">📍</div>
              <h4 className="mt-4 font-semibold text-slate-900 dark:text-slate-100">Spot Terbaik</h4>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">Rekomendasi spot memancing di sekitar, lengkap dengan fasilitas dan waktu terbaik.</p>
            </Link>

            <div className="p-6 bg-white/80 dark:bg-slate-800/70 rounded-xl shadow hover:shadow-lg border border-sky-50 dark:border-slate-800 transition">
              <div className="text-3xl">🧰</div>
              <h4 className="mt-4 font-semibold text-slate-900 dark:text-slate-100">Peralatan</h4>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">Review joran, reel, dan gear lain agar kamu memilih peralatan terbaik untuk kebutuhanmu.</p>
            </div>
          </div>
        </section> */}

        <footer className="mt-12 border-t border-sky-100 dark:border-slate-800 pt-6 text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <div>&copy; {new Date().getFullYear()} Situs Mancing. Semua hak dilindungi.</div>
          <div className="text-sm">Dibuat dengan ❤️ untuk para pemancing</div>
        </footer>
      </main>
    </div>
  );
}
