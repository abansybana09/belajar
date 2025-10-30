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

	// refs to allow scrolling to a chosen card (Surprise Me)
	const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
	const [highlighted, setHighlighted] = useState<string | null>(null)
	const [hoveredId, setHoveredId] = useState<string | null>(null)

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
			setTimeout(() => setHighlighted(null), 2000)
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
				return "#86efac" // green
			case "Moderate":
				return "#fcd34d" // yellow
			case "Hard":
				return "#fb7185" // red/pink
			default:
				return "#e5e7eb"
		}
	}

	return (
		<main style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
			<header style={{ marginBottom: "1.25rem" }}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
					<div>
						<h1 style={{ fontSize: "1.9rem", margin: 0, background: "linear-gradient(90deg,#06b6d4,#7c3aed)", WebkitBackgroundClip: "text", color: "transparent" }}>
							🎣 Lokasi Mancing
						</h1>
						<p style={{ marginTop: 6, color: "#555" }}>
							Kumpulan spot rekomendasi — cari, saring, dan temukan kejutan.
						</p>
					</div>

					<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
						<div style={{ fontSize: 13, color: "#444" }}>{filtered.length} hasil</div>
						<button
							onClick={() => { setQuery(""); setRegion("All"); setSortBy("popular") }}
							style={{ padding: "8px 12px", borderRadius: 8, border: "none", background: "#eef2ff", cursor: "pointer" }}
						>
							Reset
						</button>
						<button
							onClick={surpriseMe}
							style={{ padding: "8px 12px", borderRadius: 999, border: "none", background: "#ffedd5", cursor: "pointer" }}
						>
							Surprise Me ✨
						</button>
					</div>
				</div>
			</header>

			<section
				aria-label="controls"
				style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}
			>
				<input
					aria-label="Cari lokasi"
					placeholder="Cari nama atau deskripsi..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					style={{ flex: 1, minWidth: 200, padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd" }}
				/>

				<select
					aria-label="Filter region"
					value={region}
					onChange={(e) => setRegion(e.target.value)}
					style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd", background: "white" }}
				>
					{regions.map((r) => (
						<option key={r} value={r}>
							{r}
						</option>
					))}
				</select>

				<select
					aria-label="Urutkan"
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value as any)}
					style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd", background: "white" }}
				>
					<option value="popular">Terpopuler</option>
					<option value="alpha">A–Z</option>
				</select>
			</section>

			<section aria-live="polite">
				{filtered.length === 0 ? (
					<div style={{ padding: 24, background: "#f9f9f9", borderRadius: 8 }}>Tidak ada lokasi yang cocok.</div>
				) : (
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
							gap: 16,
						}}
					>
						{filtered.map((loc) => {
							const isHighlighted = highlighted === loc.id
							const isHovered = hoveredId === loc.id
							return (
								<article
									ref={(el) => { cardRefs.current[loc.id] = el as HTMLDivElement | null }}
									key={loc.id}
									onMouseEnter={() => setHoveredId(loc.id)}
									onMouseLeave={() => setHoveredId(null)}
									style={{
										border: "1px solid #eee",
										borderRadius: 12,
										overflow: "hidden",
										background: "linear-gradient(180deg, #ffffff, #fbfbff)",
										boxShadow: isHighlighted ? "0 6px 30px rgba(124,58,237,0.12)" : isHovered ? "0 8px 24px rgba(2,6,23,0.06)" : "0 1px 4px rgba(2,6,23,0.04)",
										transform: isHovered ? "translateY(-6px) scale(1.01)" : "translateY(0)",
										transition: "transform 180ms ease, box-shadow 220ms ease",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<div style={{ height: 150, overflow: "hidden", background: "#ddd" }}>
										<img
											src={loc.image}
											alt={loc.name}
											style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
										/>
									</div>

									<div style={{ padding: 12, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
										<div>
											<h3 style={{ margin: "0 0 6px 0", display: "flex", alignItems: "center", gap: 8 }}>
												<span style={{ fontSize: 16 }}>{loc.name}</span>
												<span style={{ fontSize: 13, color: "#6b7280" }}>• {loc.region}</span>
											</h3>
											<div style={{ marginBottom: 8, display: "flex", gap: 8, alignItems: "center" }}>
												<span style={{ background: difficultyColor(loc.difficulty), padding: "6px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
													{loc.difficulty ?? "—"}
												</span>
												<span style={{ fontSize: 12, color: "#9ca3af" }}>Pop: {Math.floor(Math.random() * 90) + 10}%</span>
											</div>
											<p style={{ margin: "0 0 12px 0", color: "#374151", fontSize: 14 }}>{loc.description}</p>
										</div>

										<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 6 }}>
											<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
												{loc.bestSeasons.slice(0, 4).map((s, i) => (
													<span
														key={s}
														style={{
															background: `linear-gradient(90deg, rgba(99,102,241,0.08), rgba(16,185,129,0.04))`,
															padding: "6px 10px",
															borderRadius: 999,
															fontSize: 12,
															fontWeight: 600,
															opacity: 0.95,
														}}
													>
														{s}
													</span>
												))}
											</div>

											<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
												<Link href={`/lokasi/${loc.id}`} style={{ textDecoration: "none" }}>
													<button
														aria-label={`Lihat ${loc.name}`}
														style={{ padding: "8px 12px", borderRadius: 8, border: "none", background: "#eef2ff", cursor: "pointer" }}
													>
														Lihat
													</button>
													</Link>
													<button
														onClick={() => setHighlighted(loc.id)}
														style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #eee", background: "white", cursor: "pointer" }}
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
