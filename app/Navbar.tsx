"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
	const [open, setOpen] = useState(false);

	return (
		<header className="w-full bg-white/80 backdrop-blur sticky top-0 z-40 border-b border-gray-100">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<nav className="flex items-center justify-between h-16">
					<div className="flex items-center gap-3">
						<Link href="/" className="inline-flex items-center gap-2">
							<svg
								width="28"
								height="28"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden
								className="text-blue-600"
							>
								<path d="M2 12c4-6 10-8 20-2-6 2-10 6-16 8-2-2-4-4-4-6z" fill="#2563EB" />
							</svg>
							<span className="font-bold text-lg text-blue-900">Situs Mancing</span>
						</Link>
					</div>

					<div className="hidden md:flex gap-6 items-center text-sm">
						<Link href="/" className="text-gray-700 hover:text-blue-700">
							Beranda
						</Link>
						<Link href="/tips" className="text-gray-700 hover:text-blue-700">
							Tips
						</Link>
						<Link href="/lokasi" className="text-gray-700 hover:text-blue-700">
							Lokasi
						</Link>
					</div>

					<div className="md:hidden">
						<button
							aria-label="Toggle menu"
							onClick={() => setOpen((s) => !s)}
							className="p-2 rounded-md bg-gray-100 text-gray-700"
						>
							{open ? "Tutup" : "Menu"}
						</button>
					</div>
				</nav>
			</div>

			{open && (
				<div className="md:hidden bg-white border-t border-gray-100">
					<div className="px-4 py-3 flex flex-col gap-2">
						<Link href="/" onClick={() => setOpen(false)} className="block py-2">
							Beranda
						</Link>
						<Link href="/tips" onClick={() => setOpen(false)} className="block py-2">
							Tips
						</Link>
						<Link href="/lokasi" onClick={() => setOpen(false)} className="block py-2">
							Lokasi
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}
