"use client"

import React, { useMemo, useState, useRef, useEffect } from "react"
import Link from "next/link"

type Location = {
	id: string
	name: string
	region: string
	description: string
	bestSeasons: string[]
	image: string
	difficulty?: "Easy" | "Moderate" | "Hard"
}

const SAMPLE_LOCATIONS: Location[] = [
	{
		id: "teluk-indah",
		name: "Teluk Indah",
		region: "Bali",
		description:
			"Teluk kecil dengan terumbu karang dangkal. Spot populer untuk casting dan jigging ringan.",
		bestSeasons: ["Apr", "May", "Jun", "Jul"],
		image:
			"https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3c9c5f8c6b1b6d4f4f2b0b6d7e0c9a2d",
		difficulty: "Easy",
	},
	{
		id: "karang-emas",
		name: "Karang Emas",
		region: "Lombok",
		description:
			"Terdapat drop-off dekat karang yang menarik predator. Siapkan peralatan medium-heavy.",
		bestSeasons: ["May", "Jun", "Jul", "Aug"],
		image:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=9b3a1b8f4c6b1d8c6a4e7b2f1c0d9e3f",
		difficulty: "Moderate",
	},
	{
		id: "muara-sri",
		name: "Muara Sri",
		region: "Jakarta",
		description:
			"Spot muara dengan akses mudah dari darat. Cocok untuk mancing mangrove dan jenahak kecil.",
		bestSeasons: ["Jan", "Feb", "Mar", "Nov", "Dec"],
		image:
			"https://images.unsplash.com/photo-1526779259212-5f3c89a7a6a6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7a8b9c6d5e4f3b2a1c0d9e8f7b6a5c4d",
		difficulty: "Easy",
	},
]

export default function Page(): React.ReactElement {
	const [query, setQuery] = useState("")
	const [region, setRegion] = useState("All")
	const [sortBy, setSortBy] = useState<"popular" | "alpha">("popular")

	const cardRefs = useRef<Record<string, HTMLElement | null>>({});
	const [highlighted, setHighlighted] = useState<string | null>(null)
	const [hoveredId, setHoveredId] = useState<string | null>(null)
	const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({})
	

	/** ✅ NEW: Simpan Popularity agar tidak random saat SSR */
	const [popularity, setPopularity] = useState<Record<string, number>>({})

	useEffect(() => {
		const map: Record<string, number> = {}
		SAMPLE_LOCATIONS.forEach(loc => {
			map[loc.id] = Math.floor(Math.random() * 90) + 10
		})
		setPopularity(map)
	}, [])

	function toggleExpanded(id: string) {
		setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }))
	}

	function highlightText(text: string, q: string) {
		if (!q) return text
		const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
		const parts = text.split(new RegExp(`(${safe})`, "i"))
		return parts.map((part, i) => {
			if (part.toLowerCase() === q.toLowerCase()) {
				return (
					<span key={i} className="bg-yellow-200 dark:bg-yellow-600 text-black dark:text-black px-0.5 rounded">{part}</span>
				)
			}
			return <span key={i}>{part}</span>
		})
	}

	const regions = useMemo(() => {
		const set = new Set(SAMPLE_LOCATIONS.map((l) => l.region))
		return ["All", ...Array.from(set).sort()]
	}, [])

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase()
		let list = SAMPLE_LOCATIONS.filter((l) => {
			const matchesQuery = q === "" || l.name.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
			const matchesRegion = region === "All" || l.region === region
			return matchesQuery && matchesRegion
		})

		if (sortBy === "alpha") list = list.sort((a, b) => a.name.localeCompare(b.name))
		return list
	}, [query, region, sortBy])

	useEffect(() => {
		if (!highlighted) return
		const el = cardRefs.current[highlighted]
		if (el) {
			el.scrollIntoView({ behavior: "smooth", block: "center" })
			const timer = setTimeout(() => setHighlighted(null), 2000)
			return () => clearTimeout(timer)
		}
	}, [highlighted])

	function surpriseMe() {
		if (filtered.length === 0) return
		const pick = filtered[Math.floor(Math.random() * filtered.length)]
		setHighlighted(pick.id)
	}

	function difficultyColor(d?: string) {
		switch (d) {
			case "Easy":
				return "#86efac"
			case "Moderate":
				return "#fcd34d"
			case "Hard":
				return "#fb7185"
			default:
				return "#e5e7eb"
		}
	}

	return (
		<main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* HERO SECTION */}
			<section className="mb-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-6 shadow-md flex items-center justify-between gap-6">
				<div className="flex items-center gap-4">
					<div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
							<path d="M2 12c4-6 10-8 20-2-6 2-10 6-16 8-2-2-4-4-4-6z" fill="currentColor" />
						</svg>
						<span className="absolute -right-2 -bottom-2 w-5 h-5 rounded-full bg-white/90 text-blue-600 flex items-center justify-center text-[11px] animate-bounce">🐟</span>
					</div>

					<div>
						<h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-violet-600 dark:text-white">🎣 Lokasi Mancing</h1>
						<p className="text-sm text-slate-600 dark:text-slate-300">Kumpulan spot rekomendasi — cari, saring, dan temukan kejutan.</p>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<div className="text-sm text-slate-600 dark:text-slate-300">{filtered.length} hasil</div>
					<button
						onClick={() => { setQuery(""); setRegion("All"); setSortBy("popular") }}
						className="px-3 py-2 rounded-md bg-white border border-gray-200 hover:bg-gray-50 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
					>
						Reset
					</button>

					<button
						onClick={surpriseMe}
						className="px-4 py-2 rounded-full bg-rose-500 to-pink-500 bg-gradient-to-r text-white text-sm font-semibold shadow-lg hover:scale-105 transition"
					>
						Surprise Me ✨
					</button>
				</div>
			</section>

			{/* FILTERS */}
			<section aria-label="controls" className="flex gap-3 mb-5 flex-wrap items-center">
				<input
					aria-label="Cari lokasi"
					placeholder="Cari nama atau deskripsi..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="flex-1 min-w-[180px] px-3 py-2 rounded-md border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:focus:ring-indigo-500"
				/>

				<select
					aria-label="Filter region"
					value={region}
					onChange={(e) => setRegion(e.target.value)}
					className="px-3 py-2 rounded-md border border-gray-200 bg-white text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
				>
					{regions.map((r) => (
						<option key={r} value={r}>{r}</option>
					))}
				</select>

				<select
					aria-label="Urutkan"
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value as any)}
					className="px-3 py-2 rounded-md border border-gray-200 bg-white text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
				>
					<option value="popular">Terpopuler</option>
					<option value="alpha">A–Z</option>
				</select>
			</section>

			{/* RESULTS */}
			<section aria-live="polite">
				{filtered.length === 0 ? (
					<div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-md">Tidak ada lokasi yang cocok.</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filtered.map((loc) => {
							const isHighlighted = highlighted === loc.id
							const isHovered = hoveredId === loc.id
							const pop = popularity[loc.id] ?? 0
							const starCount = Math.max(0, Math.min(5, Math.round(pop / 20)))
							return (
								<article
	ref={(el) => { cardRefs.current[loc.id] = el }}
	key={loc.id}
	onMouseEnter={() => setHoveredId(loc.id)}
	onMouseLeave={() => setHoveredId(null)}
	className={`group relative rounded-xl overflow-hidden bg-white dark:bg-slate-900 border 
	${isHighlighted ? 'ring-4 ring-indigo-200 dark:ring-indigo-900 shadow-xl' : 'border-gray-200 dark:border-slate-700 shadow-sm'}
	transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
>
	{/* HIGHLIGHT LABEL */}
	{isHighlighted && (
		<span className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold shadow-md">
			✨ Fokus
		</span>
	)}

	{/* IMAGE */}
	<div className="h-40 bg-gray-200 relative overflow-hidden">
		<img
			src={loc.image}
			alt={loc.name}
			className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
		/>

		{/* POP BADGE + STARS */}
		<div className="absolute top-3 left-3 z-20 flex items-center gap-2">
			<div className="text-[11px] px-2 py-0.5 rounded-full bg-white/90 text-rose-600 font-medium shadow">
				{pop ? `🔥 ${pop}%` : '—'}
			</div>
			<div className="flex items-center gap-0.5 text-yellow-400">
				{Array.from({ length: 5 }).map((_, i) => (
					<span key={i} className={`text-xs ${i < starCount ? '' : 'opacity-30'}`}>★</span>
				))}
			</div>
		</div>

		{/* Hover Overlay */}
		<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
			<div className="flex-1">
				<div className="text-sm text-white font-semibold">{loc.name}</div>
				<div className="text-xs text-white/80">{loc.region}</div>
			</div>
			<Link href={`/lokasi/${loc.id}`}>
				<button className="ml-2 px-3 py-1.5 rounded-md bg-white/90 text-xs font-medium shadow">
					Lihat
				</button>
			</Link>
		</div>
	</div>

	{/* CONTENT */}
	<div className="p-4 flex flex-col justify-between h-44">
		<div>
			<h3 className="flex items-center justify-between gap-3 text-base font-semibold mb-2">
				<span>{loc.name}</span>
				<span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
					{loc.region}
				</span>
			</h3>

			{/* Difficulty & Popularity */}
			<div className="flex items-center gap-3 mb-3">
				<span
					style={{ background: difficultyColor(loc.difficulty) }}
					className="px-2 py-0.5 rounded-full text-[11px] font-semibold text-black dark:text-black"
				>
					{loc.difficulty ?? '—'}
				</span>

				<div className="flex items-center gap-2">
					<span className="text-xs text-slate-500 dark:text-slate-400">
						{pop}% Populer
					</span>
					<div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
						<div
							style={{ width: `${pop}%` }}
							className="h-full bg-rose-400"
						/>
					</div>
				</div>
			</div>

			<p
				className="text-sm text-slate-600 dark:text-slate-300"
				style={!expandedMap[loc.id] ? {
					display: '-webkit-box',
					WebkitLineClamp: 2,
					WebkitBoxOrient: 'vertical',
					overflow: 'hidden'
				} : {}}
			>
				{highlightText(loc.description, query)}
			</p>

			{loc.description.length > 120 && (
				<button
					onClick={() => toggleExpanded(loc.id)}
					className="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-300"
				>
					{expandedMap[loc.id] ? 'Tutup' : 'Baca selengkapnya'}
				</button>
			)}
		</div>

		{/* Footer Buttons */}
		<div className="mt-4 flex items-center justify-between">
			<div className="flex gap-2 flex-wrap">
				{loc.bestSeasons.slice(0, 4).map((s) => (
					<span
						key={s}
						className="px-2 py-1 rounded-full text-[11px] font-medium bg-indigo-50 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
					>
						{s}
					</span>
				))}
			</div>

			<div className="flex items-center gap-2">
				<Link href={`/lokasi/${loc.id}`}>
					<button className="px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-600 text-xs font-medium hover:bg-indigo-100 dark:bg-indigo-600 dark:text-white">
						Lihat
					</button>
				</Link>
				<button
					onClick={() => setHighlighted(loc.id)}
					className="px-3 py-1.5 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-medium shadow hover:scale-105 transition"
				>
					📍 Fokus
				</button>
			</div>
		</div>
	</div>
</article>

							)
						})}
					</div>
				)}
			</section>
		</main>
	)
}
