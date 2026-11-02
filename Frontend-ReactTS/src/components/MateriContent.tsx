import { useMemo, useState } from "react";

type Question = { q: string; options: string[]; answer: number; explain: string };
type Topic = { 
  id: string; 
  title: string; 
  summary: string; 
  points: string[]; 
  example: string; 
  task: string; 
  steps: string[]; 
  questions: Question[];
};
type Chapter = { id: string; title: string; subtitle: string; topics: Topic[] };

// Pemetaan 23 file gambar di dalam folder public/image/materi/
const TOPIC_IMAGES: Record<string, string[]> = {
  "1.1": [
    "/image/materi/01_algoritma-luas.png"
  ],
  "1.2": [
    "/image/materi/02_percabangan-mie.png",
    "/image/materi/03_percabangan-kelulusan.png"
  ],
  "1.3": [
    "/image/materi/04_perulangan-for.png",
    "/image/materi/05_perulangan-while.png"
  ],
  "1.4": [
    "/image/materi/06_array-indeks.png",
    "/image/materi/07_array-loop.png"
  ],
  "1.5": [
    "/image/materi/08_sequential-search.png",
    "/image/materi/09_binary-search.png"
  ],
  "1.6": [
    "/image/materi/10_bubble-sort.png",
    "/image/materi/11_selection-sort.png",
    "/image/materi/12_insertion-sort.png",
    "/image/materi/13_quick-sort.png"
  ],
  "2.1": [
    "/image/materi/14_flowchart-konsep.png"
  ],
  "2.2": [
    "/image/materi/15_simbol-flowchart.png"
  ],
  "2.3": [
    "/image/materi/16_flowchart-percabangan.png"
  ],
  "2.4": [
    "/image/materi/17_flowchart-perulangan.png"
  ],
  "2.5": [
    "/image/materi/18_flowchart-array.png"
  ],
  "2.6": [
    "/image/materi/19_flowchart-sequential.png",
    "/image/materi/20_flowchart-binary.png"
  ],
  "2.7": [
    "/image/materi/21_flowchart-bubble.png",
    "/image/materi/22_flowchart-selection.png",
    "/image/materi/23_flowchart-quick.png"
  ],
};

const q = (question: string, options: string[], answer: number, explain: string): Question => ({ q: question, options, answer, explain });

const chapters: Chapter[] = [
 { id:"01", title:"Algoritma", subtitle:"Mengenal langkah logis untuk menyelesaikan masalah dan mengolah data.", topics:[
  {id:"1.1",title:"Pengenalan Algoritma",summary:"Algoritma adalah susunan langkah-langkah untuk menyelesaikan suatu persoalan secara logis, efisien, dan terstruktur.",points:["Memiliki tujuan yang jelas.","Setiap langkah tidak ambigu.","Memiliki awal dan akhir.","Dapat diselesaikan dalam sejumlah langkah."],example:"Menghitung luas persegi panjang: mulai → masukkan panjang dan lebar → luas = panjang × lebar → tampilkan luas → selesai.",task:"Susun algoritma menghitung luas persegi panjang.",steps:["Mulai","Masukkan panjang dan lebar","Hitung luas = panjang × lebar","Tampilkan luas","Selesai"],questions:[q("Algoritma adalah ...",["Kumpulan gambar","Urutan langkah logis untuk menyelesaikan masalah","Bahasa pemrograman tertentu","Perangkat keras"],1,"Algoritma merupakan langkah penyelesaian masalah."),q("Data yang dimasukkan untuk menghitung luas persegi panjang adalah ...",["Luas","Hasil","Panjang dan lebar","Simbol"],2,"Panjang dan lebar merupakan input."),q("Algoritma yang baik memiliki langkah ...",["Ambigu","Tidak terbatas","Jelas dan berhingga","Acak"],2,"Langkah harus jelas dan berakhir.")]},
  {id:"1.2",title:"Percabangan",summary:"Percabangan (conditional statement) menentukan keputusan berdasarkan kondisi tertentu.",points:["If: satu blok pilihan saat kondisi benar.","If else: dua pilihan untuk kondisi benar dan salah.","If else if: lebih dari dua blok pilihan.","Nested if: percabangan di dalam percabangan.","Switch case: beberapa kondisi yang dipisahkan oleh case."],example:"Jika nilai ≥ 75, tampilkan “Lulus”. Jika tidak, tampilkan “Belum Lulus”.",task:"Susun algoritma untuk menentukan bilangan positif, negatif, atau nol.",steps:["Masukkan bilangan n","Periksa apakah n > 0","Jika benar, tampilkan Positif","Jika tidak, periksa apakah n < 0","Jika benar tampilkan Negatif, selain itu Nol"],questions:[q("Selection digunakan untuk ...",["Mengulang instruksi","Memilih tindakan berdasarkan kondisi","Menyimpan kumpulan data","Mengurutkan angka"],1,"Selection adalah struktur keputusan."),q("Pada aturan nilai ≥ 75, angka 75 termasuk ...",["Belum lulus","Lulus","Tidak diketahui","Error"],1,"Tanda ≥ berarti lebih besar atau sama dengan."),q("Jika nilai siswa 80 dan batas kelulusan 75, hasil percabangan if (nilai >= 75) adalah ...",["Belum lulus","Lulus","Tidak ada hasil","Perulangan"],1,"Kondisi nilai >= 75 bernilai benar, sehingga hasilnya Lulus.")]},
  {id:"1.3",title:"Perulangan",summary:"Perulangan menjalankan perintah berulang kali sesuai kondisi yang ditentukan.",points:["For loop digunakan ketika jumlah iterasi diketahui sebelumnya.","While loop digunakan ketika jumlah iterasi bergantung pada kondisi.","Do-while loop menjamin instruksi dijalankan setidaknya satu kali."],example:"Untuk menampilkan 1 sampai 5: tetapkan i=1; selama i≤5 tampilkan i, lalu tambah i dengan 1.",task:"Susun langkah menjumlahkan angka 1 sampai 10 menggunakan perulangan.",steps:["Tetapkan i = 1 dan total = 0","Periksa apakah i ≤ 10","Tambahkan i ke total","Naikkan i satu angka","Ulangi pemeriksaan hingga kondisi salah","Tampilkan total = 55"],questions:[q("Iteration berarti ...",["Instruksi berurutan saja","Instruksi diulang","Instruksi dihapus","Instruksi diacak"],1,"Iteration adalah perulangan."),q("Apa fungsi i=i+1?",["Mengurangi i","Menambah nilai penghitung","Menghapus data","Mengakhiri program langsung"],1,"Nilai penghitung bergerak menuju batas."),q("Jika kondisi selalu benar dan tidak ada perubahan, dapat terjadi ...",["Perulangan tak berujung","Sorting otomatis","Program pasti selesai","Array kosong"],0,"Kondisi tidak pernah menjadi salah.")]},
  {id:"1.4",title:"Array",summary:"Array menyimpan banyak nilai dalam satu variabel. Setiap elemen diakses melalui indeks.",points:["Menyimpan kumpulan elemen.","Elemen diakses menggunakan indeks.","Pada banyak bahasa pemrograman, indeks dimulai dari 0.","Indeks harus berada dalam rentang yang valid."],example:"Pada array [78,85,90,72,88], indeks 0 berisi 78, indeks 2 berisi 90, dan indeks 4 berisi 88.",task:"Hitung jumlah seluruh elemen array [4,7,2,9].",steps:["Mulai total = 0 dan i = 0","Periksa apakah i < 4","Tambahkan data[i] ke total","Naikkan i satu angka","Ulangi hingga semua elemen diperiksa","Tampilkan total = 22"],questions:[q("Array digunakan untuk ...",["Menyimpan kumpulan elemen","Menggambar diagram","Menghentikan program","Mengubah sistem operasi"],0,"Array mengelompokkan sejumlah data."),q("Pada [10,20,30], indeks 1 berisi ...",["10","20","30","1"],1,"Indeks dimulai dari 0 pada contoh ini."),q("Struktur yang umum digunakan untuk membaca semua elemen array adalah ...",["Perulangan","Terminator","Judul","Komentar"],0,"Loop dapat mengakses elemen satu per satu.")]},
  {id:"1.5",title:"Searching",summary:"Searching adalah teknik untuk menemukan elemen tertentu dalam sebuah koleksi data.",points:["Sequential Search memeriksa elemen satu per satu dari awal hingga akhir; cocok untuk data yang tidak terurut.","Binary Search membagi dua bagian data terurut secara berulang.","Binary Search memerlukan data dalam keadaan terurut."],example:"Data [12,7,19,5], target 19. Sequential Search memeriksa 12, lalu 7, kemudian 19. Target ditemukan pada indeks 2.",task:"Gunakan Linear Search untuk mencari 8 pada [3,8,2,6].",steps:["Mulai dari indeks 0","Periksa nilai 3 terhadap target 8","Lanjutkan ke indeks 1","Periksa nilai 8 terhadap target","Nyatakan target ditemukan pada indeks 1"],questions:[q("Sequential Search memeriksa data ...",["Satu per satu","Hanya dari tengah","Secara acak","Setelah dihapus"],0,"Sequential Search memeriksa elemen berurutan."),q("Binary Search membutuhkan data ...",["Terurut","Kosong","Selalu ganjil","Berupa teks"],0,"Binary Search mengandalkan data terurut."),q("Jika semua elemen sudah diperiksa dan target tidak ada ...",["Target dinyatakan tidak ditemukan","Target pasti ditemukan","Data otomatis berubah","Pencarian harus terus berjalan"],0,"Pencarian berakhir setelah seluruh elemen diperiksa.")]},
  {id:"1.6",title:"Sorting",summary:"Sorting adalah proses mengurutkan data berdasarkan aturan tertentu.",points:["Ascending mengurutkan data dari nilai terkecil ke terbesar atau abjad A ke Z.","Descending mengurutkan data dari nilai terbesar ke terkecil atau abjad Z ke A.","Bubble Sort membandingkan elemen berpasangan dan menukarnya jika diperlukan hingga urut.","Selection Sort menyeleksi data dari bagian yang belum terurut lalu memasukkannya ke bagian yang sudah terurut.","Insertion Sort mengurutkan dua elemen pertama, lalu memeriksa elemen berikutnya satu per satu dan menyisipkannya ke posisi yang tepat.","Quick Sort memilih elemen pivot, lalu membagi elemen yang lebih kecil ke kiri dan yang lebih besar ke kanan pivot."],example:"Data [5,2,4] secara ascending: bandingkan 5 dan 2 lalu tukar menjadi [2,5,4]; bandingkan 5 dan 4 lalu tukar menjadi [2,4,5].",task:"Urutkan [9,3,6,1] secara ascending menggunakan ide Bubble Sort.",steps:["Bandingkan 9 dan 3, lalu tukar","Bandingkan 9 dan 6, lalu tukar","Bandingkan 9 dan 1, lalu tukar","Ulangi perbandingan pada bagian yang belum urut","Hasil akhir [1,3,6,9]"],questions:[q("Sorting adalah ...",["Mencari data","Mengurutkan data","Menghapus data","Memasukkan data"],1,"Sorting menyusun data."),q("Ascending berarti ...",["Besar ke kecil","Kecil ke besar","Acak","Sama semua"],1,"Ascending dari nilai kecil ke besar."),q("Bubble Sort membandingkan ...",["Elemen bersebelahan","Hanya elemen pertama","Semua elemen sekaligus","Hanya elemen terakhir"],0,"Bubble Sort membandingkan pasangan berdekatan.")]},
 ]},
 { id:"02", title:"Flowchart", subtitle:"Mengubah langkah algoritma menjadi diagram alir yang mudah dipahami.", topics:[
  {id:"2.1",title:"Konsep Flowchart",summary:"Flowchart atau diagram alir adalah representasi visual langkah-langkah algoritma menggunakan simbol yang dihubungkan garis panah.",points:["Memudahkan pemahaman alur.","Membantu menemukan bagian yang belum jelas.","Mempermudah komunikasi ide program."],example:"Mulai → input sisi → hitung keliling = 4×sisi → tampilkan keliling → selesai.",task:"Susun flowchart untuk menghitung keliling persegi.",steps:["Mulai","Masukkan sisi","Hitung keliling = 4 × sisi","Tampilkan keliling","Selesai"],questions:[q("Flowchart adalah ...",["Bahasa mesin","Diagram alur proses","Database","Perangkat keras"],1,"Flowchart memvisualisasikan algoritma."),q("Arah proses ditunjukkan oleh ...",["Panah","Judul","Warna","Ukuran"],0,"Panah menunjukkan arah alur."),q("Flowchart membantu ...",["Memahami alur","Menghapus algoritma","Mengganti komputer","Menentukan merek"],0,"Diagram membuat alur lebih mudah dipahami.")]},
  {id:"2.2",title:"Simbol-Simbol Flowchart",summary:"Setiap simbol flowchart memiliki arti khusus. Simbol yang konsisten membuat diagram lebih mudah dibaca.",points:["Terminator (oval): mulai atau selesai.","Process (persegi panjang): proses/perhitungan.","Input/Output (jajar genjang): masukan atau keluaran.","Decision (belah ketupat): pemeriksaan kondisi.","Flowline (panah): arah alur."],example:"Pada program kelulusan, input nilai memakai jajar genjang, pemeriksaan nilai memakai belah ketupat, dan perhitungan memakai persegi panjang.",task:"Cocokkan kegiatan mulai, input angka, hitung total, periksa kondisi, dan selesai dengan simbolnya.",steps:["Mulai — oval/terminator","Input angka — jajar genjang","Hitung total — persegi panjang","Periksa kondisi — belah ketupat","Selesai — oval/terminator"],questions:[q("Terminator berbentuk ...",["Oval","Belah ketupat","Persegi panjang","Jajar genjang"],0,"Terminator berbentuk oval/kapsul."),q("Process berbentuk ...",["Oval","Persegi panjang","Belah ketupat","Panah"],1,"Persegi panjang menunjukkan proses."),q("Input/output berbentuk ...",["Lingkaran","Belah ketupat","Jajar genjang","Persegi panjang"],2,"Jajar genjang menunjukkan input/output.")]},
  {id:"2.3",title:"Flowchart Percabangan",summary:"Flowchart percabangan menggunakan decision untuk memeriksa kondisi dan mengarahkan alur ke jalur berbeda.",points:["Decision diletakkan setelah data tersedia.","Beri label pada cabang, misalnya Ya atau Tidak.","Pastikan semua cabang memiliki kelanjutan."],example:"Input n → periksa n mod 2 = 0 → Ya: Genap; Tidak: Ganjil.",task:"Buat flowchart menentukan kelayakan usia minimal 17 tahun.",steps:["Mulai","Input usia","Periksa apakah usia ≥ 17","Jika Ya, tampilkan Boleh","Jika Tidak, tampilkan Belum boleh","Selesai"],questions:[q("Decision berbentuk ...",["Oval","Jajar genjang","Belah ketupat","Persegi panjang"],2,"Belah ketupat menunjukkan keputusan."),q("Cabang sebaiknya diberi label ...",["Ya/Tidak","Nama pembuat","Warna saja","Nomor halaman"],0,"Label menunjukkan hasil kondisi."),q("Bilangan genap memiliki ...",["Sisa bagi 2 sama dengan 0","Nilai selalu positif","Nilai lebih dari 100","Indeks 0"],0,"Bilangan genap habis dibagi dua.")]},
  {id:"2.4",title:"Flowchart Perulangan",summary:"Flowchart perulangan menunjukkan proses yang kembali ke langkah sebelumnya sampai kondisi berhenti terpenuhi.",points:["Tentukan nilai awal.","Periksa kondisi.","Jalankan proses dan perbarui variabel.","Pastikan kondisi dapat menjadi salah."],example:"Mulai i=1 → selama i≤5 tampilkan i dan tambah 1 → kembali memeriksa kondisi → selesai saat kondisi salah.",task:"Buat flowchart menampilkan bilangan genap 2 sampai 10.",steps:["Mulai dan tetapkan i = 2","Periksa apakah i ≤ 10","Jika Ya, tampilkan i","Perbarui i = i + 2","Kembali periksa kondisi","Jika Tidak, selesai"],questions:[q("Ciri flowchart perulangan adalah ...",["Ada panah kembali","Tidak ada arah","Hanya oval","Tidak ada kondisi"],0,"Panah kembali menunjukkan pengulangan."),q("Penghitung diperbarui agar ...",["Kondisi dapat berubah","Data hilang","Simbol berubah","Program tidak punya input"],0,"Perubahan nilai membantu loop berhenti."),q("Jika i tidak berubah dan kondisi selalu benar ...",["Loop dapat terus berjalan","Loop pasti selesai","Array terurut","Data dihapus"],0,"Kondisi tidak pernah menjadi salah.")]},
  {id:"2.5",title:"Flowchart Array",summary:"Flowchart array menggambarkan pengisian, pembacaan, atau pengolahan elemen array.",points:["Tentukan array dan indeks.","Periksa batas indeks.","Proses elemen yang ditunjuk.","Naikkan indeks."],example:"Untuk menjumlahkan empat nilai: total=0, i=0; selama i<4, total=total+data[i], i=i+1.",task:"Buat flowchart mencari nilai terbesar dari lima elemen array.",steps:["Input lima nilai ke dalam array","Tetapkan max = data[0] dan i = 1","Periksa apakah i < 5","Jika data[i] > max, perbarui max","Naikkan i dan ulangi pemeriksaan","Tampilkan max"],questions:[q("Indeks menunjukkan ...",["Posisi elemen","Warna data","Nama program","Arah panah"],0,"Indeks menunjukkan posisi."),q("Untuk membaca seluruh array gunakan ...",["Perulangan","Terminator saja","Judul","Komentar"],0,"Loop dapat mengakses elemen satu per satu."),q("Sebelum akses elemen perlu memeriksa ...",["Batas indeks","Warna layar","Nama akun","Ukuran font"],0,"Indeks harus valid.")]},
  {id:"2.6",title:"Flowchart Searching",summary:"Flowchart searching menggambarkan pemeriksaan elemen sampai target ditemukan atau data habis.",points:["Searching memiliki target yang ingin ditemukan.","Linear/Sequential Search memeriksa elemen satu per satu.","Binary Search memerlukan data dalam keadaan terurut dan membagi ruang pencarian menjadi dua bagian secara berulang.","Alur berakhir ketika target ditemukan atau seluruh data sudah diperiksa."],example:"Linear Search: bandingkan data[i] dengan target; jika cocok, tampilkan ditemukan; jika tidak, naikkan i selama masih ada data.",task:"Susun alur Linear Search untuk menemukan target pada kumpulan data.",steps:["Mulai dan tentukan data serta target","Tetapkan i = 0","Periksa apakah i masih dalam batas data","Bandingkan data[i] dengan target","Jika cocok, tampilkan Ditemukan","Jika tidak cocok, naikkan i dan ulangi"],questions:[q("Metode pencarian yang memeriksa data satu per satu disebut ...",["Binary Search","Sequential Search","Bubble Sort","Quick Sort"],1,"Sequential Search memeriksa elemen satu per satu."),q("Apa syarat utama agar Binary Search dapat digunakan?",["Data harus terurut","Data harus berjumlah genap","Data tidak boleh memiliki angka sama","Data harus berupa huruf"],0,"Binary Search bekerja dengan membagi ruang pencarian pada data terurut."),q("Metode untuk data terurut yang membagi ruang pencarian menjadi dua adalah ...",["Sequential Search","Binary Search","Bubble Sort","Insertion Sort"],1,"Binary Search membagi ruang pencarian menjadi dua bagian.")]},
  {id:"2.7",title:"Flowchart Sorting",summary:"Flowchart sorting menggambarkan perbandingan dan pertukaran elemen berulang hingga data terurut.",points:["Ascending adalah pengurutan dari nilai terkecil ke terbesar atau dari abjad A ke Z.","Descending adalah pengurutan dari nilai terbesar ke terkecil atau dari abjad Z ke A.","Flowchart sorting menggambarkan perbandingan dan pertukaran elemen secara berulang hingga data terurut."],example:"Bubble Sort membandingkan data[j] dan data[j+1], lalu menukar jika urutannya salah.",task:"Susun alur umum pengurutan data secara ascending.",steps:["Mulai dan siapkan kumpulan data","Bandingkan elemen yang berdekatan","Periksa apakah urutannya salah","Jika salah, tukar posisi elemen","Ulangi sampai seluruh data terurut","Selesai"],questions:[q("Metode sorting yang membandingkan elemen bersebelahan disebut ...",["Selection Sort","Insertion Sort","Bubble Sort","Binary Search"],2,"Bubble Sort membandingkan elemen yang bersebelahan."),q("Selection Sort memilih ... pada setiap putaran ascending.",["Nilai terbesar","Nilai terkecil","Nilai tengah","Nilai pertama secara acak"],1,"Pada ascending, Selection Sort memilih nilai terkecil dari bagian yang belum terurut."),q("Data [4, 2, 3] setelah diurutkan ascending menjadi ...",["[4, 3, 2]","[2, 3, 4]","[3, 2, 4]","[2, 4, 3]"],1,"Ascending menyusun data dari nilai terkecil ke terbesar.")]},
 ]}
];

const diagramLabels: Record<string,string[]> = {
 "1.1":["Mulai","Input panjang & lebar","Luas = p × l","Tampilkan luas","Selesai"],
 "1.2":["Input bilangan","n > 0?","Positif / Negatif / Nol"],
 "1.3":["i = 1, total = 0","i ≤ 10?","total = total + i","i = i + 1","Tampilkan total"],
 "1.4":["Array [4,7,2,9]","Ambil data[i]","Tambahkan ke total","Total = 22"],
 "1.5":["Data [3,8,2,6]","Periksa 3","Periksa 8","Target ditemukan"],
 "1.6":["[5,2,4]","Bandingkan 5 dan 2","Tukar → [2,5,4]","Tukar → [2,4,5]"],
 "2.1":["Mulai","Input sisi","Keliling = 4 × sisi","Tampilkan hasil","Selesai"],
 "2.2":["Oval: Mulai/Selesai","Jajar genjang: Input/Output","Persegi panjang: Proses","Belah ketupat: Decision"],
 "2.3":["Input usia","Usia ≥ 17?","Ya: Boleh","Tidak: Belum boleh"],
 "2.4":["i = 2","i ≤ 10?","Tampilkan i","i = i + 2","Kembali ke kondisi"],
 "2.5":["Input 5 nilai","max = data[0]","Bandingkan data[i]","Perbarui max","Tampilkan max"],
 "2.6":["Ambil data[i]","Cocok dengan target?","Ya: Ditemukan","Tidak: i = i + 1"],
 "2.7":["Data awal","Bandingkan elemen","Tukar jika salah urut","Ulangi hingga terurut"]
};

function ExampleDiagram({topicId}:{topicId:string}) {
 const labels=diagramLabels[topicId]||[];
 return <div role="img" aria-label={`Ilustrasi contoh penerapan ${topicId}`} className="mt-3 overflow-x-auto rounded-xl bg-white p-3">
  <div className="flex min-w-max items-center gap-2">
   {labels.map((label,i)=><div key={label} className="flex items-center gap-2">
    <div className={`max-w-40 rounded-xl border-2 px-3 py-3 text-center text-xs font-bold leading-relaxed ${i===0||i===labels.length-1?"rounded-full border-violet-300 bg-violet-50 text-violet-800":topicId==="2.3"&&i===1?"border-amber-300 bg-amber-50 text-amber-800":"border-sky-200 bg-sky-50 text-slate-700"}`}>{label}</div>
    {i<labels.length-1&&<span className="text-xl font-bold text-violet-400">→</span>}
   </div>)}
  </div>
 </div>;
}

export function MateriCatalog({ completedTopicIds, onOpen }: { completedTopicIds: string[]; onOpen: (index: number) => void }) {
 const total = chapters.reduce((n,c)=>n+c.topics.length,0);
 const percent = Math.round(completedTopicIds.length/total*100);
 return <main className="mx-auto max-w-7xl px-5 pb-28 pt-9 lg:px-8">
  <section className="galaxy-hero rounded-[2rem] p-7 text-white shadow-xl md:p-10">
   <div className="text-xs font-extrabold tracking-[.2em] text-white/75">MODUL PEMBELAJARAN FLOWPLAY</div>
   <h1 className="mt-3 max-w-2xl font-display text-3xl font-extrabold md:text-4xl">Belajar Algoritma dan Flowchart</h1>
   <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">Pelajari konsep, coba latihan interaktif, lalu uji pemahamanmu di setiap subbab.</p>
   <div className="mt-7 max-w-lg"><div className="mb-2 flex justify-between text-xs font-bold"><span>{completedTopicIds.length} dari {total} subbab selesai</span><span>{percent}%</span></div><div className="h-2.5 overflow-hidden rounded-full bg-white/25"><div className="h-full rounded-full bg-white" style={{width:`${percent}%`}}/></div></div>
  </section>
  <p className="mt-5 text-sm text-slate-500">Bab 1 dipelajari berurutan, sedangkan Bab 2.1 (Konsep Flowchart) sudah terbuka sejak awal agar kedua materi dapat dipelajari secara terintegrasi.</p>
  <div className="mt-8 grid gap-7">
   {chapters.map((chapter,ci)=><section key={chapter.id} className="rounded-[2rem] border border-violet-100 bg-white/90 p-5 shadow-sm md:p-7">
    <div className="flex flex-wrap items-start gap-4">
     <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-sky-400 font-display text-xl font-extrabold text-white shadow-lg">{chapter.id}</div>
     <div className="min-w-0 flex-1"><div className="text-xs font-extrabold tracking-[.18em] text-violet-500">BAB {chapter.id}</div><h2 className="mt-1 font-display text-2xl font-extrabold text-slate-900">{chapter.title}</h2><p className="mt-1 text-sm text-slate-500">{chapter.subtitle}</p></div>
     <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-600">{chapter.topics.length} subbab</span>
    </div>
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
     {chapter.topics.map((topic,ti)=>{const index=ci===0?ti:chapters[0].topics.length+ti; const done=completedTopicIds.includes(topic.id); const previousTopic=ci===0?chapters[0].topics[ti-1]:chapters[1].topics[ti-1]; const locked=ci===0? (ti>0 && !completedTopicIds.includes(previousTopic.id)) : (ti===0?false:!completedTopicIds.includes(previousTopic.id)); return <button key={topic.id} disabled={locked} onClick={()=>onOpen(index)} className={`group rounded-2xl border p-4 text-left transition ${locked?"cursor-not-allowed border-slate-200 bg-slate-100/80 opacity-65":"border-violet-100 bg-gradient-to-br from-white to-violet-50/70 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"}`}>
      <div className="flex items-center justify-between"><span className="rounded-lg bg-violet-100 px-2.5 py-1 text-xs font-extrabold text-violet-700">{topic.id}</span><span className={`text-xs font-extrabold ${done?"text-emerald-600":locked?"text-slate-500":"text-violet-600"}`}>{done?"✓ Selesai":locked?"🔒 Terkunci":"Pelajari →"}</span></div>
      <h3 className="mt-4 font-display text-base font-extrabold leading-snug text-slate-900 group-hover:text-violet-700">{topic.title}</h3>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">{topic.summary}</p>
      <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-violet-500">{locked?"Selesaikan subbab sebelumnya untuk membuka materi ini":<><span>Materi</span><span>•</span><span>Latihan</span><span>•</span><span>Kuis</span></>}</div>
     </button>})}
    </div>
   </section>)}
  </div>
 </main>;
}

export function MateriReader({ index, completedTopicIds, onBack, onComplete }: { index: number; completedTopicIds: string[]; onBack: () => void; onComplete: (index:number, topicId:string) => void }) {
 const flat = useMemo(()=>chapters.flatMap(c=>c.topics.map(t=>({...t,chapter:c}))),[]);
 const topic = flat[index] || flat[0];
 const [answers,setAnswers] = useState<Record<number,number>>({});
 const [checked,setChecked] = useState<Record<number,boolean>>({});
 const [activityChecked,setActivityChecked] = useState(false);
 const score = topic.questions.filter((item,i)=>checked[i] && answers[i]===item.answer).length;
 const quizDone = topic.questions.every((_,i)=>checked[i] && answers[i]===topic.questions[i].answer);
 const isDone = completedTopicIds.includes(topic.id);
 const shuffleSteps=(steps:string[])=>{
  const items=[...steps];
  for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}
  return items;
 };
 const shuffled = useMemo(()=>shuffleSteps(topic.steps),[topic.id]);
 const [dragItems,setDragItems]=useState<string[]>(shuffled);
 const [dragIndex,setDragIndex]=useState<number|null>(null);
 const moveItem=(from:number,to:number)=>{
  if(from===to)return;
  setDragItems(prev=>{const next=[...prev];const [picked]=next.splice(from,1);next.splice(to,0,picked);return next;});
  setActivityChecked(false);
 };
 const orderedCorrect=dragItems.length===topic.steps.length && dragItems.every((step,i)=>step===topic.steps[i]);

 return <main className="mx-auto max-w-5xl px-5 pb-28 pt-8 lg:px-8">
  <button onClick={onBack} className="mb-5 text-sm font-bold text-violet-600 hover:text-violet-800">← Kembali ke daftar materi</button>
  <section className="overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-sm">
   <div className="galaxy-hero p-6 text-white md:p-8"><div className="text-xs font-extrabold tracking-widest text-white/70">BAB {topic.chapter.id} · SUBBAB {topic.id}</div><h1 className="mt-2 font-display text-3xl font-extrabold">{topic.title}</h1><p className="mt-2 max-w-2xl text-sm text-white/80">{topic.summary}</p></div>
   <div className="p-6 md:p-8">
    <section>
      <div className="mb-3 text-xs font-extrabold tracking-widest text-violet-600">MATERI PEMBELAJARAN</div>
      <p className="text-sm leading-7 text-slate-600">{topic.summary}</p>
      
      <ul className="mt-4 space-y-2">
        {topic.points.map(p=><li key={p} className="flex gap-3 text-sm leading-relaxed text-slate-700"><span className="mt-1 text-violet-500">✦</span><span>{p}</span></li>)}
      </ul>

      {/* Menampilkan Gambar dari TOPIC_IMAGES (/image/materi/...) */}
      {TOPIC_IMAGES[topic.id] && TOPIC_IMAGES[topic.id].length > 0 && (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TOPIC_IMAGES[topic.id].map((imgSrc, imgIndex) => (
            <div key={imgIndex} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm">
              <img
                src={imgSrc}
                alt={`Gambar ${topic.title} ${imgIndex + 1}`}
                className="h-auto w-full rounded-xl object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50/70 p-5">
        <div className="text-xs font-extrabold tracking-widest text-sky-700">CONTOH PENERAPAN · ILUSTRASI</div>
        <ExampleDiagram topicId={topic.id} />
      </div>
    </section>

    <section className="mt-8 rounded-2xl border border-violet-100 bg-violet-50/60 p-5">
     <div className="flex flex-wrap items-center justify-between gap-2"><div><div className="text-xs font-extrabold tracking-widest text-violet-600">LATIHAN INTERAKTIF · DRAG & DROP</div><h2 className="mt-1 font-display text-xl font-extrabold text-slate-900">{topic.task}</h2></div><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-violet-600">Seret untuk mengurutkan</span></div>
     <p className="mt-2 text-sm text-slate-500">Tarik setiap kartu ke posisi yang benar hingga membentuk alur sesuai materi.</p>
     <div className="mt-4 grid gap-2">{dragItems.map((step,i)=><div key={step} draggable onDragStart={()=>setDragIndex(i)} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();if(dragIndex!==null)moveItem(dragIndex,i);setDragIndex(null);}} onDragEnd={()=>setDragIndex(null)} className="flex cursor-grab items-center gap-3 rounded-xl border border-violet-200 bg-white p-3 text-sm font-semibold text-slate-700 shadow-sm active:cursor-grabbing"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-violet-100 text-violet-700">{i+1}</span><span className="flex-1">{step}</span><span className="text-lg text-violet-400">⠿</span></div>)}</div>
     <div className="mt-4 flex flex-wrap gap-2"><button onClick={()=>{setDragItems(shuffleSteps(topic.steps));setActivityChecked(false)}} className="rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-bold text-violet-700">Acak ulang</button><button onClick={()=>setActivityChecked(true)} className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white">Periksa urutan</button></div>
     {activityChecked&&<div className={`mt-3 rounded-xl p-3 text-sm font-semibold ${orderedCorrect?"bg-emerald-50 text-emerald-700":"bg-rose-50 text-rose-700"}`}>{orderedCorrect?"Hebat! Urutan langkahmu sudah tepat.":"Urutannya belum tepat. Tekan Acak ulang dan coba lagi."}</div>}
    </section>

    <section className="mt-8"><div className="text-xs font-extrabold tracking-widest text-violet-600">KUIS PEMAHAMAN</div><h2 className="mt-1 font-display text-2xl font-extrabold text-slate-900">Uji pemahaman subbab ini</h2><p className="mt-1 text-sm text-slate-500">Jawab semua pertanyaan untuk menyelesaikan subbab.</p>
     <div className="mt-5 space-y-4">{topic.questions.map((item,i)=><article key={i} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="text-xs font-extrabold text-violet-500">PERTANYAAN {i+1} DARI 3</div><h3 className="mt-2 font-bold leading-relaxed text-slate-800">{item.q}</h3><div className="mt-3 grid gap-2 sm:grid-cols-2">{item.options.map((option,oi)=><button key={option} onClick={()=>{setAnswers(prev=>({...prev,[i]:oi}));setChecked(prev=>({...prev,[i]:false}))}} className={`rounded-xl border p-3 text-left text-sm transition ${answers[i]===oi?"border-violet-500 bg-violet-50 text-violet-800 ring-2 ring-violet-100":"border-slate-200 bg-slate-50 text-slate-700 hover:border-violet-300"}`}>{String.fromCharCode(65+oi)}. {option}</button>)}</div>
      <div className="mt-3 flex flex-wrap items-center gap-3"><button disabled={answers[i]===undefined} onClick={()=>setChecked(prev=>({...prev,[i]:true}))} className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white disabled:opacity-40">Periksa jawaban</button>{checked[i]&&<span className={`text-xs font-semibold ${answers[i]===item.answer?"text-emerald-600":"text-rose-600"}`}>{answers[i]===item.answer?"Benar!":"Belum tepat."} {item.explain}</span>}</div>
     </article>)}</div>
    </section>

    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6"><div className="text-sm text-slate-500">Kuis benar: <strong className="text-violet-700">{score}/3</strong> · Latihan: <strong className={orderedCorrect?"text-emerald-600":"text-slate-500"}>{orderedCorrect?"Selesai":"Belum selesai"}</strong></div><button disabled={!quizDone||!orderedCorrect||isDone} onClick={()=>{onComplete(index,topic.id);onBack();}} className="rounded-xl bg-gradient-to-r from-violet-600 to-sky-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-500/20 disabled:cursor-not-allowed disabled:opacity-40">{isDone?"Subbab sudah selesai":"Tandai subbab selesai (+50 XP)"}</button></div>
    {!quizDone||!orderedCorrect?<p className="mt-2 text-right text-xs text-slate-400">Selesaikan latihan interaktif dan jawab benar semua kuis untuk memperoleh XP.</p>:null}
   </div>
  </section>
 </main>;
}