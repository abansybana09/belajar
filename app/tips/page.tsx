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
        // Latar belakang utama dibuat sedikit lebih terang di dark mode
        <main className="p-6 md:p-10 max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm my-10">
            <header className="flex gap-4 items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-md">
                        <span className="text-2xl">🎣</span>
                    </div>
                    <div>
                        {/* Gradien teks dibuat lebih cerah di dark mode */}
                        <h1 className="m-0 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400">
                            Tips Mancing
                        </h1>
                        <p className="m-0 text-sm text-muted-foreground">Panduan singkat & kreatif untuk meningkatkan peluang Anda.</p>
                        <div className="mt-2 flex gap-2 items-center">
                            {/* Badge kustom agar lebih menarik di dark mode */}
                            <Badge className="border-transparent bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800/50">
                                Praktis
                            </Badge>
                            <Badge variant="outline">Aman</Badge>
                            <Badge variant="secondary">Populer</Badge>
                        </div>
                    </div>
                    
                </div>
            </header>

            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tips.map((t, idx) => (
                    <Card key={t.title} className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
                                                border border-gray-100 dark:border-slate-800 
                                                bg-white dark:bg-slate-800/50 
                                                hover:border-gray-200 dark:hover:border-emerald-700/60 dark:hover:bg-slate-800">
                        {/* Aksen dekoratif dibuat lebih terang di dark mode */}
                        <div className="absolute -right-16 -top-10 w-48 h-48 rotate-12 opacity-10 dark:opacity-[0.15] pointer-events-none group-hover:opacity-20 transition-opacity duration-300" aria-hidden>
                            <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-400 dark:text-emerald-500 fill-current">
                                <circle cx="50" cy="50" r="50" />
                            </svg>
                        </div>
                        
                        {/* Struktur Card diperbaiki: Header hanya untuk Judul */}
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 z-10 relative">
                                        <span className="text-2xl">{idx === 0 ? '🏆' : idx < 3 ? '✨' : '•'}</span>
                                        {t.title}
                                    </CardTitle>
                                </div>
                                {idx < 2 && <Badge className="ml-2 z-10 relative bg-gradient-to-r from-amber-400 to-orange-400 text-black shadow-sm text-xs">Top</Badge>}
                            </div>
                        </CardHeader>
                        
                        {/* Content untuk Deskripsi */}
                        <CardContent className="z-10 relative">
                            <p className="text-sm text-gray-600 dark:text-gray-300">{t.body}</p>
                        </CardContent>

                        <CardFooter className="flex justify-between items-center z-10 relative">
                            {/* Tombol dibuat lebih menonjol di dark mode */}
                            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 px-0 hover:bg-transparent dark:hover:bg-transparent">
                                Baca Selengkapnya
                                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                            </Button>
                            <span className="text-xs text-muted-foreground">{idx % 2 === 0 ? 'Spot' : 'Teknik'}</span>
                        </CardFooter>
                    </Card>
                ))}
            </section>

            {/* Footer disesuaikan untuk dark mode */}
            <footer className="mt-6 text-sm text-muted-foreground border-t dark:border-slate-800 pt-4">
                <p className="m-0">Ingat: selalu utamakan keselamatan dan patuhi peraturan setempat saat memancing.</p>
            </footer>
        </main>
    )
}