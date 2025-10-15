import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from "lucide-react"

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
			<header className="flex gap-4 items-center mb-8 border-b pb-4">
				<Image src="/file.svg" alt="tips" width={48} height={48} />
				<div>
					<h1 className="m-0 text-2xl font-semibold">Tips Mancing</h1>
					<p className="m-0 text-sm text-muted-foreground">Panduan singkat untuk meningkatkan peluang dan keselamatan saat memancing.</p>
				</div>
			</header>

			<section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{tips.map((t) => (
					<Card key={t.title} className="transition-all duration-300 hover:shadow-md hover:translate-y-1 border border-gray-200 rounded-xl">
						<CardHeader>
							<CardTitle className="text-lg font-semibold text-gray-800">{t.title}</CardTitle>
							<CardDescription className="text-sm text-gray-500">{t.body}</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">{t.body}</p>
						</CardContent>
						<CardFooter>
							<Button variant="ghost" size="sm" className="flex-items-center gap-1">Baca Selengkapnya <ArrowRight size={16}/></Button>
						</CardFooter>
					</Card>
				))}
			</section>

			<footer className="mt-6 text-sm text-muted-foreground">
				<p className="m-0">Ingat: selalu utamakan keselamatan dan patuhi peraturan setempat saat memancing.</p>
			</footer>
		</main>
	)
}
