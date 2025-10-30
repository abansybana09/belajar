"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sun, Moon, Search, Bell, User } from "lucide-react"; 
import { usePathname } from "next/navigation"; 
import { useEffect } from "react";

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const pathname = usePathname();

	const navLinks = [
		{ href: "/", label: "Beranda" },
		{ href: "/tips", label: "Tips" },
		{ href: "/lokasi", label: "Lokasi" },
	];

	useEffect(() => {
		// initialize theme from localStorage or prefers-color-scheme
		try {
			const stored = localStorage.getItem("theme");
			if (stored === "dark" || (!stored && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
				setTheme("dark");
				document.documentElement.classList.add("dark");
			} else {
				setTheme("light");
				document.documentElement.classList.remove("dark");
			}
		} catch (e) {
			// noop
		}
	}, []);

	function toggleTheme() {
		const next = theme === "light" ? "dark" : "light";
		setTheme(next);
		try {
			localStorage.setItem("theme", next);
		} catch (e) {}
		if (next === "dark") document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
	}

	return (
		<header className="w-full bg-gradient-to-r from-white/80 to-blue-50/60 dark:from-slate-900/80 dark:to-slate-800/70 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-slate-700 shadow">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<nav className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-3 hover:opacity-95 transition">
						<div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
								<path d="M2 12c4-6 10-8 20-2-6 2-10 6-16 8-2-2-4-4-4-6z" fill="currentColor" />
							</svg>
							{/* playful fish accent */}
							<span className="absolute -right-2 -bottom-2 w-4 h-4 rounded-full bg-white/80 text-blue-600 flex items-center justify-center text-[10px] animate-bounce">🐟</span>
						</div>
						<div className="flex flex-col leading-tight">
							<span className="font-bold text-lg text-slate-900 dark:text-slate-100">Situs Mancing</span>
							<small className="text-xs text-slate-500 dark:text-slate-400">Tips & Lokasi</small>
						</div>
					</Link>

					{/* Menu desktop */}
					<div className="hidden md:flex items-center gap-6">
						<div className="hidden md:flex gap-6 items-center text-sm font-medium">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className={`relative transition transform duration-200 hover:scale-105 px-1 pb-1 ${
										pathname === link.href
											? "text-blue-700 after:block after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
											: "text-slate-700 hover:text-blue-600 dark:text-slate-300"
									}`}
								>
									{link.label}
								</Link>
							))}
						</div>

						{/* Search */}
						<div className="hidden md:flex items-center bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-md px-2 py-1 shadow-sm">
							<Search className="text-slate-400 mr-2" size={16} />
							<input
								aria-label="Cari"
								placeholder="Cari tips atau lokasi..."
								className="w-40 bg-transparent outline-none text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
							/>
						</div>

						{/* Theme toggle + CTA */}
						<div className="flex items-center gap-3">
							<div className="relative">
								<button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition">
									<Bell size={16} />
								</button>
								<span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
							</div>

							<button
								aria-label="Toggle theme"
								onClick={toggleTheme}
								className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition"
							>
								{theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
							</button>

							<Link
								href="/"
								className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-semibold shadow hover:scale-105 transform transition"
							>
								<span className="text-xs">✨</span>
								Mulai
							</Link>
						</div>
					</div>

					{/* Tombol mobile */}
					<div className="md:hidden flex items-center gap-2">
						<button
							aria-label="Toggle theme"
							onClick={toggleTheme}
							className="p-2 rounded-md text-slate-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700 transition"
						>
							{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
						</button>

						<button
							aria-label="Toggle menu"
							onClick={() => setOpen((s) => !s)}
							className="p-2 rounded-md text-slate-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700 transition"
						>
							{open ? <X size={22} /> : <Menu size={22} />}
						</button>
					</div>
				</nav>
			</div>

			{/* Menu mobile */}
			<div className={`md:hidden transition-transform duration-300 ${open ? "translate-y-0" : "-translate-y-2 pointer-events-none"}`}>
				<div className={`overflow-hidden ${open ? "max-h-screen" : "max-h-0"}`}>
					<div className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shadow-sm rounded-b-xl px-4 py-4">
						<div className="flex flex-col gap-2">
							{navLinks.map((link, idx) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setOpen(false)}
									style={{ transitionDelay: `${idx * 60}ms` }}
									className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-all transform ${
										pathname === link.href
											? "text-blue-700 bg-blue-50 dark:bg-slate-800/60 scale-100"
											: "text-slate-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800/60 hover:scale-105"
									}`}
								>
									<span className="w-2 h-2 rounded-full bg-blue-400" />
									<span className="font-medium">{link.label}</span>
								</Link>
							))}

							<div className="mt-2 border-t border-gray-100 dark:border-slate-800 pt-3 flex items-center justify-between gap-3">
								<div className="flex items-center gap-2">
									<Search className="text-slate-400" size={16} />
									<input placeholder="Cari..." className="bg-transparent outline-none text-sm text-slate-700 dark:text-slate-200" />
								</div>

								<Link href="/" className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-semibold">
									Mulai
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
