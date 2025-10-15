"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import { usePathname } from "next/navigation"; 

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	const navLinks = [
		{ href: "/", label: "Beranda" },
		{ href: "/tips", label: "Tips" },
		{ href: "/lokasi", label: "Lokasi" },
	];

	return (
		<header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<nav className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2 hover:opacity-90 transition">
						<svg
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="text-blue-600"
						>
							<path d="M2 12c4-6 10-8 20-2-6 2-10 6-16 8-2-2-4-4-4-6z" fill="#2563EB" />
						</svg>
						<span className="font-bold text-lg text-blue-900">Situs Mancing</span>
					</Link>

					{/* Menu desktop */}
					<div className="hidden md:flex gap-8 items-center text-sm font-medium">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`transition-colors ${
									pathname === link.href
										? "text-blue-700 border-b-2 border-blue-700 pb-1"
										: "text-gray-700 hover:text-blue-600"
								}`}
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Tombol mobile */}
					<div className="md:hidden">
						<button
							aria-label="Toggle menu"
							onClick={() => setOpen((s) => !s)}
							className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
						>
							{open ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</nav>
			</div>

			{/* Menu mobile */}
			<div
				className={`md:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${
					open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div className="px-4 py-3 flex flex-col gap-2">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setOpen(false)}
							className={`block py-2 px-2 rounded-md transition-colors ${
								pathname === link.href
									? "text-blue-700 bg-blue-50"
									: "text-gray-700 hover:bg-gray-50 hover:text-blue-700"
							}`}
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>
		</header>
	);
}
