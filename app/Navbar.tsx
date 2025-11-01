"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
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

    // Menutup menu mobile setiap kali pindah halaman
    useEffect(() => {
        if (open) {
            setOpen(false);
        }
    }, [pathname]);


    return (
        <header className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200 dark:border-slate-700 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16 relative">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 hover:opacity-95 transition">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M2 12c4-6 10-8 20-2-6 2-10 6-16 8-2-2-4-4-4-6z" fill="currentColor" />
                            </svg>
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
                                    className={`relative transition transform duration-200 hover:scale-105 px-1 pb-1 group ${
                                        pathname === link.href
                                            ? "text-blue-700 dark:text-blue-400"
                                            : "text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                                    }`}
                                >
                                    {link.label}
                                    <span className={`
                                        absolute -bottom-1 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ease-out
                                        ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'} 
                                    `} />
                                </Link>
                            ))}
                        </div>

                        {/* Theme toggle */}
                        <div className="flex items-center gap-3">
                            <button
                                aria-label="Toggle theme"
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 hover:rotate-12"
                            >
                                {/* PERUBAHAN DI SINI:
                                  Logika dibalik agar ikon menunjukkan status SAAT INI.
                                */}
                                {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Tombol mobile */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            aria-label="Toggle theme"
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-slate-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700 transition"
                        >
                            {/* PERUBAHAN DI SINI:
                              Logika dibalik agar ikon menunjukkan status SAAT INI.
                            */}
                            {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <button
                            aria-label="Toggle menu"
                            onClick={() => setOpen((s) => !s)}
                            className="p-2 rounded-full text-slate-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                        >
                            <div className={`transform transition-transform duration-300 ${open ? 'rotate-90' : 'rotate-0'}`}>
                                {open ? <X size={22} /> : <Menu size={22} />}
                            </div>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Menu mobile - Animasi slide down + fade in */}
            <div
                className={`
                    md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 shadow-lg rounded-b-xl
                    transition-all duration-300 ease-in-out
                    ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
                `}
            >
                <div className="px-4 py-4">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link, idx) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{ transitionDelay: `${idx * 60}ms` }}
                                className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-all transform duration-300 ${
                                    open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                                } ${
                                    pathname === link.href
                                        ? "text-blue-700 bg-blue-50 dark:bg-slate-800/60"
                                        : "text-slate-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800/60 hover:scale-[1.03]"
                                }`}
                            >
                                <span className={`w-2 h-2 rounded-full ${pathname === link.href ? 'bg-blue-500' : 'bg-blue-300 dark:bg-slate-600'}`} />
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}