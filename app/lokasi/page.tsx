"use client"

import React, { useMemo, useState } from "react"
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

	return (
		<main style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
			<header style={{ marginBottom: "1.25rem" }}>
				<h1 style={{ fontSize: "1.75rem", margin: 0 }}>Lokasi Mancing</h1>
				<p style={{ marginTop: 6, color: "#555" }}>
					Kumpulan spot mancing yang direkomendasikan — cari, saring, dan jelajahi.
				</p>
			</header>

			<section
				aria-label="controls"
				style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}
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
					style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd" }}
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
					style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd" }}
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
						{filtered.map((loc) => (
							<article
								key={loc.id}
								style={{ border: "1px solid #eee", borderRadius: 10, overflow: "hidden", background: "#fff" }}
							>
								<div style={{ height: 150, overflow: "hidden", background: "#ddd" }}>
									<img
										src={loc.image}
										alt={loc.name}
										style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
									/>
								</div>

								<div style={{ padding: 12 }}>
									<h3 style={{ margin: "0 0 6px 0" }}>{loc.name}</h3>
									<div style={{ marginBottom: 8, color: "#666", fontSize: 13 }}>{loc.region} • {loc.difficulty}</div>
									<p style={{ margin: "0 0 12px 0", color: "#444", fontSize: 14 }}>{loc.description}</p>

									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
										<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
											{loc.bestSeasons.slice(0, 4).map((s) => (
												<span
													key={s}
													style={{ background: "#f0f0f0", padding: "4px 8px", borderRadius: 999, fontSize: 12 }}
												>
													{s}
												</span>
											))}
										</div>

										<Link href={`/lokasi/${loc.id}`} style={{ textDecoration: "none" }}>
											<button
												aria-label={`Lihat ${loc.name}`}
												style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", background: "white" }}
											>
												Lihat
											</button>
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				)}
			</section>
		</main>
	)
}
