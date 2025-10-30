import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from "lucide-react"
import { Badge } from '@/components/ui/badge'

const tips = [
	{
		title: 'Pilih Umpan yang Tepat',
		body: 'Sesuaikan umpan dengan jenis ikan yang ingin ditangkap — cacing, udang, atau umpan buatan masing-masing punya keunggulan.',
	},
	{
		title: 'Perhatikan Cuaca dan Pasang Surut',
		body: 'Ikan cenderung aktif saat perubahan cuaca dan pada fase pasang atau dekat pergantian pasang surut.',
	},
	{
		title: 'Gunakan Senar dan Mata Kail Sesuai',
		body: 'Senar yang terlalu tebal mengurangi sensitivitas; mata kail harus cukup tajam dan sesuai ukuran umpan.',
	},
	{
		title: 'Teknik Melempar yang Tenang',
		body: 'Hindari suara keras atau gerakan tiba-tiba saat mendekati spot; lemparan yang halus lebih menarik ikan.',
	},
	{
		title: 'Sabar dan Perhatikan Indikator',
		body: 'Perhatikan ujung joran, pelampung, atau perubahan gerakan senar untuk merespons saat ikan menyambar.',
	},
	{
		title: 'Rotasi Spot dan Kedalaman',
		body: 'Jika tidak ada hasil setelah beberapa lama, pindah sedikit atau ubah kedalaman umpan untuk menemukan ikan.',
	},
	{
		title: 'Periksa Peralatan Sebelum Berangkat',
		body: 'Pastikan gulungan berfungsi, simpul kuat, dan cadangan umpan serta peralatan keselamatan tersedia.',
	},
	{
		title: 'Kelola Hasil Tangkapan dengan Bijak',
		body: 'Jika bukan untuk konsumsi, kembalikan ikan ke air dengan teknik yang meminimalkan cedera.',
	},
]

export default function TipsPage() {
	return (
		<main className="p-6 md:p-10 max-w-5xl mx-auto bg-white rounded-2xl shadow-sm">
			<header className="flex gap-4 items-center mb-6">
				<div className="flex items-center gap-4">
					<div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-md">
						<span className="text-2xl">🎣</span>
					</div>
					<div>
						<h1 className="m-0 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-500">Tips Mancing</h1>
						<p className="m-0 text-sm text-muted-foreground">Panduan singkat & kreatif untuk meningkatkan peluang (dan tampil beda) saat memancing.</p>
						<div className="mt-2 flex gap-2 items-center">
							<Badge>Praktis</Badge>
							<Badge variant="outline">Aman</Badge>
							<Badge variant="secondary">Ramai Dicari</Badge>
						</div>
					</div>
					
				</div>
			</header>

			<section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{tips.map((t, idx) => (
					<Card key={t.title} className="group relative overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 rounded-xl">
						{/* Decorative diagonal accent */}
						<div className="absolute -right-16 -top-10 w-48 h-48 rotate-12 opacity-10 pointer-events-none" aria-hidden>
							<svg viewBox="0 0 100 100" className="w-full h-full text-emerald-400 fill-current">
								<circle cx="50" cy="50" r="50" />
							</svg>
						</div>
						<CardHeader>
							<div className="flex justify-between items-start">
								<div>
									<CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
										<span className="text-2xl">{idx === 0 ? '🏆' : idx < 3 ? '✨' : '•'}</span>
										{t.title}
									</CardTitle>
									<CardDescription className="text-sm text-gray-500 line-clamp-2">{t.body}</CardDescription>
								</div>
								{idx < 2 && <Badge className="ml-2">Top</Badge>}
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">{t.body}</p>
						</CardContent>
						<CardFooter className="flex justify-between items-center">
							<Button variant="ghost" size="sm" className="flex items-center gap-2">
								Baca Selengkapnya
								<ArrowRight size={16} />
							</Button>
							<span className="text-xs text-muted-foreground">{idx % 2 === 0 ? 'Kecerdasan spot' : 'Teknik & peralatan'}</span>
						</CardFooter>
					</Card>
				))}
			</section>

			<footer className="mt-6 text-sm text-muted-foreground border-t pt-4">
				<p className="m-0">Ingat: selalu utamakan keselamatan dan patuhi peraturan setempat saat memancing. Tips ini pendek, mudah diingat, dan siap dicoba di lapangan.</p>
			</footer>
		</main>
	)
}
