export interface SubTopicImage {
  url: string;
  alt: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Indeks jawaban benar (0=A, 1=B, 2=C, 3=D)
  explanation?: string;
}

export interface InteractiveTask {
  title: string;
  caseStudy: string;
  instructions: string[];
  referenceAnswer: string;
  criteria: string[];
}

export interface SubTopic {
  id: string;
  title: string;
  content: string;
  images: SubTopicImage[];
  interactiveTask?: InteractiveTask;
  quizzes: QuizQuestion[];
}

export interface Lesson {
  id: string;
  chapter: string;
  title: string;
  description: string;
  duration: string;
  subTopics: SubTopic[];
}

export const materiFlowPlayData: Lesson[] = [
  // ==================== BAB 1: ALGORITMA ====================
  {
    id: "bab-1",
    chapter: "BAB 1",
    title: "Algoritma Pemrograman",
    description: "Memahami konsep dasar algoritma, percabangan, perulangan, array, searching, dan sorting.",
    duration: "45 Menit",
    subTopics: [
      {
        id: "1-1",
        title: "Pengenalan Algoritma",
        content: `Algoritma adalah susunan langkah-langkah untuk menyelesaikan suatu persoalan secara logis, efisien, dan terstruktur. Artinya, menghasilkan solusi yang tepat untuk suatu masalah dengan menentukan langkah secara akurat.\n\nKarakteristik Algoritma yang Baik:\n• Tujuan Jelas: Memiliki kejelasan dalam menghasilkan solusi.\n• Tidak Ambigu: Setiap langkah spesifik dan tidak memiliki makna ganda.\n• Berhingga: Memiliki titik awal dan titik akhir yang pasti.\n• Efektif: Dapat diselesaikan dalam sejumlah langkah terbatas.`,
        images: [
          {
            url: "/images/materi/algoritma-luas.png",
            alt: "Flowchart Hitung Luas Persegi Panjang"
          }
        ],
        interactiveTask: {
          title: "Latihan Drag & Drop: Luas Persegi Panjang",
          caseStudy: "Contoh menghitung luas persegi: mulai → masukkan sisi → luas = sisi × sisi → tampilkan luas → selesai.",
          instructions: [
            "Tentukan input panjang dan lebar.",
            "Susun proses perhitungan luas.",
            "Tentukan output dan urutan langkah."
          ],
          referenceAnswer: "Mulai → Input Panjang & Lebar → Luas = Panjang * Lebar → Print Luas → End",
          criteria: ["Semua input terdefinisi", "Rumus perkalian tepat", "Alur berurutan"]
        },
        quizzes: [
          {
            id: 1,
            question: "Algoritma adalah ...",
            options: ["Kumpulan gambar", "Urutan langkah logis untuk menyelesaikan masalah", "Bahasa pemrograman tertentu", "Perangkat keras"],
            correctAnswer: 1,
            explanation: "Algoritma merupakan langkah penyelesaian masalah secara logis."
          },
          {
            id: 2,
            question: "Algoritma yang baik memiliki langkah ...",
            options: ["Ambigu", "Tidak terbatas", "Jelas dan berhingga", "Acak"],
            correctAnswer: 2,
            explanation: "Langkah algoritma harus didefinisikan secara jelas dan memiliki akhir."
          },
          {
            id: 3,
            question: "Data yang dimasukkan untuk menghitung luas persegi adalah ...",
            options: ["Luas", "Hasil", "Panjang sisi", "Simbol"],
            correctAnswer: 2,
            explanation: "Panjang sisi merupakan input awal yang diperlukan."
          }
        ]
      },
      {
        id: "1-2",
        title: "Percabangan (Conditional Statement)",
        content: `Percabangan atau conditional statement adalah penentuan keputusan berdasarkan kondisi tertentu. Percabangan membuat program mampu berpikir dan menentukan tindakan sesuai dengan logika/kondisi yang diberikan.\n\nJenis-jenis Percabangan:\n1. If: Hanya memiliki satu blok pilihan saat kondisi bernilai benar.\n2. If-Else: Memiliki dua blok pilihan (kondisi terpenuhi vs tidak terpenuhi).\n3. If-Else-If: Memiliki lebih dari dua blok pilihan kondisi.\n4. Nested If: Percabangan bersarang (di dalam if ada kondisi if lagi).\n5. Switch-Case: Alternatif if-else-if yang memisahkan pilihan menggunakan 'case'.`,
        images: [
          {
            url: "/images/materi/percabangan-mie.png",
            alt: "Contoh Percabangan Membuat Mie"
          },
          {
            url: "/images/materi/percabangan-kelulusan.png",
            alt: "Flowchart Percabangan Kelulusan Nilai"
          }
        ],
        interactiveTask: {
          title: "Latihan: Menentukan Bilangan Positif, Negatif, atau Nol",
          caseStudy: "Jika nilai ≥ 75, tampilkan Lulus. Jika tidak, tampilkan Belum Lulus.",
          instructions: [
            "Masukkan sebuah bilangan n.",
            "Periksa apakah n > 0.",
            "Jika tidak, periksa apakah n < 0.",
            "Tampilkan Positif, Negatif, atau Nol."
          ],
          referenceAnswer: "Input n → jika n > 0: Positif; jika tidak dan n < 0: Negatif; selain itu: Nol.",
          criteria: ["Semua kemungkinan ditangani", "Kondisi tepat", "Output sesuai kondisi"]
        },
        quizzes: [
          {
            id: 1,
            question: "Apa fungsi utama dari percabangan (conditional statement) dalam pemrograman?",
            options: ["Mengulang instruksi secara terus-menerus", "Menentukan keputusan dan tindakan berdasarkan kondisi tertentu", "Menyimpan banyak data dalam satu variabel", "Mengurutkan angka dari kecil ke besar"],
            correctAnswer: 1
          },
          {
            id: 2,
            question: "Bentuk percabangan yang merupakan alternatif dari if-else if dan menyediakan beberapa pilihan kondisi dipisahkan oleh case adalah...",
            options: ["Nested If", "If-Else", "Switch Case", "If Tunggal"],
            correctAnswer: 2
          },
          {
            id: 3,
            question: "Pada aturan nilai ≥ 75, angka 75 termasuk ...",
            options: ["Belum lulus", "Lulus", "Tidak diketahui", "Error"],
            correctAnswer: 1,
            explanation: "Tanda ≥ berarti lebih besar atau sama dengan."
          }
        ]
      },
      {
        id: "1-3",
        title: "Perulangan (Looping)",
        content: `Perulangan memungkinkan eksekusi perintah secara berulang kali sesuai kondisi yang ditentukan. Perulangan cocok untuk proses berkali-kali seperti menampilkan daftar angka atau memeriksa elemen array.\n\nJenis-jenis Perulangan:\n• For Loop: Digunakan ketika jumlah iterasi/pengulangan sudah diketahui sejak awal.\n• While Loop: Digunakan ketika jumlah iterasi bergantung pada kondisi (belum diketahui pasti).\n• Do-While Loop: Mirip while loop, namun eksekusi kode dijamin berjalan minimal satu kali.`,
        images: [
          {
            url: "/images/materi/perulangan-code.png",
            alt: "Contoh Kode Program C Perulangan For dan Output"
          },
          {
            url: "/images/materi/flowchart-loop-1-5.png",
            alt: "Flowchart Perulangan Cetak 1 Sampai 5"
          }
        ],
        interactiveTask: {
          title: "Latihan: Menjumlahkan Angka 1 Sampai 10",
          caseStudy: "Untuk menampilkan 1 sampai 5: tetapkan i=1; selama i≤5 tampilkan i lalu tambah i dengan 1.",
          instructions: [
            "Tetapkan i=1 dan total=0.",
            "Selama i≤10, tambahkan i ke total.",
            "Naikkan i satu angka (i = i + 1).",
            "Tampilkan total."
          ],
          referenceAnswer: "i=1, total=0; selama i≤10: total=total+i; i=i+1; tampilkan 55.",
          criteria: ["Inisialisasi benar", "Kondisi berhenti benar", "Hasil akhir 55"]
        },
        quizzes: [
          {
            id: 1,
            question: "Perulangan digunakan dalam pemrograman untuk...",
            options: ["Menentukan keputusan berdasarkan kondisi", "Menjalankan instruksi secara berulang", "Menyimpan banyak data dalam satu variabel", "Mengurutkan data dari kecil ke besar"],
            correctAnswer: 1
          },
          {
            id: 2,
            question: "Jika jumlah pengulangan sudah diketahui sejak awal, jenis perulangan yang tepat digunakan adalah...",
            options: ["While loop", "Do-while loop", "For loop", "If-else"],
            correctAnswer: 2
          },
          {
            id: 3,
            question: "Perhatikan algoritma: i=1; Selama i≤5, tampilkan i dan tambah i dengan 1. Hasil angka yang ditampilkan adalah...",
            options: ["1,2,3,4", "1,2,3,4,5", "2,3,4,5,6", "1,3,5,7,9"],
            correctAnswer: 1
          }
        ]
      },
      {
        id: "1-4",
        title: "Array (Larik)",
        content: `Array digunakan untuk menyimpan banyak nilai dalam satu variabel, sehingga kita tidak perlu membuat variabel terpisah untuk setiap nilai. Elemen di dalam array diakses melalui nomor indeks (pada umumnya dimulai dari indeks 0).\n\nKarakteristik Array:\n• Menyimpan kumpulan elemen bertipe sejenis.\n• Elemen diakses menggunakan nomor indeks.\n• Indeks harus berada dalam rentang yang valid.`,
        images: [
          {
            url: "/images/materi/array-syntax.png",
            alt: "Sintaks dan Deklarasi Array"
          },
          {
            url: "/images/materi/array-indeks.png",
            alt: "Ilustrasi Indeks dan Elemen Array"
          }
        ],
        interactiveTask: {
          title: "Latihan: Hitung Jumlah Elemen Array [4, 7, 2, 9]",
          caseStudy: "Array nilai = [78,85,90,72,88]. Indeks 0 berisi 78, indeks 2 berisi 90.",
          instructions: [
            "Mulai total=0 dan i=0.",
            "Selama i<4, tambahkan data[i] ke total.",
            "Naikkan i dan tampilkan total setelah selesai."
          ],
          referenceAnswer: "total=0; untuk i=0 sampai 3: total=total+data[i]; hasil akhir = 22.",
          criteria: ["Indeks 0 sampai 3 diperiksa", "Total diawali 0", "Hasil 22"]
        },
        quizzes: [
          {
            id: 1,
            question: "Array digunakan untuk ...",
            options: ["Menyimpan banyak nilai dalam satu variabel", "Menggambar diagram alur", "Menghentikan proses program", "Menentukan kondisi percabangan"],
            correctAnswer: 0
          },
          {
            id: 2,
            question: "Pada array [10, 20, 30, 40], nilai yang berada pada indeks 2 adalah...",
            options: ["10", "20", "30", "40"],
            correctAnswer: 2,
            explanation: "Indeks dimulai dari 0 (10), indeks 1 (20), indeks 2 (30)."
          },
          {
            id: 3,
            question: "Struktur yang umum digunakan untuk membaca semua elemen array satu per satu adalah ...",
            options: ["Percabangan", "Perulangan", "Terminator", "Input"],
            correctAnswer: 1
          }
        ]
      },
      {
        id: "1-5",
        title: "Searching (Pencarian Data)",
        content: `Searching adalah teknik untuk menemukan elemen tertentu dalam sebuah kumpulan data.\n\nMetode Pencarian Utama:\n1. Sequential Search (Linear Search): Memeriksa satu per satu elemen dari awal hingga akhir. Cocok untuk data yang tidak terurut.\n2. Binary Search (Pencarian Biner): Memerlukan data yang sudah terurut. Bekerja dengan membagi dua ruang pencarian secara berulang hingga data ditemukan.`,
        images: [
          {
            url: "/images/materi/search-sequential.png",
            alt: "Penerapan Sequential Search"
          },
          {
            url: "/images/materi/search-binary.png",
            alt: "Penerapan Binary Search"
          }
        ],
        interactiveTask: {
          title: "Latihan: Linear Search Mencari Angka 8 pada [3, 8, 2, 6]",
          caseStudy: "Data [12,7,19,5], target 19. Linear search memeriksa 12, lalu 7, lalu 19 (indeks 2).",
          instructions: [
            "Tuliskan elemen yang diperiksa secara berurutan.",
            "Tentukan indeks saat target ditemukan.",
            "Nyatakan hasil akhir."
          ],
          referenceAnswer: "Periksa 3 (indeks 0), lalu 8 (indeks 1). Target 8 ditemukan pada indeks 1.",
          criteria: ["Pemeriksaan berurutan", "Indeks benar", "Berhenti saat ditemukan"]
        },
        quizzes: [
          {
            id: 1,
            question: "Metode pencarian yang memeriksa data satu per satu dari awal hingga akhir disebut...",
            options: ["Binary search", "Sequential search", "Bubble sort", "Quick sort"],
            correctAnswer: 1
          },
          {
            id: 2,
            question: "Apa syarat utama agar Binary Search dapat digunakan?",
            options: ["Data harus terurut", "Data harus berjumlah genap", "Data tidak boleh memiliki angka yang sama", "Data harus berupa huruf"],
            correctAnswer: 0
          },
          {
            id: 3,
            question: "Jika semua elemen sudah diperiksa tetapi target tidak ditemukan, maka...",
            options: ["Target dinyatakan tidak ditemukan", "Target pasti ditemukan", "Data otomatis berubah", "Pencarian harus terus berjalan"],
            correctAnswer: 0
          }
        ]
      },
      {
        id: "1-6",
        title: "Sorting (Pengurutan Data)",
        content: `Sorting adalah proses mengurutkan kumpulan data berdasarkan aturan tertentu:\n• Ascending: Dari nilai terkecil ke terbesar (A-Z, 0-9).\n• Descending: Dari nilai terbesar ke terkecil (Z-A, 9-0).\n\nJenis Algoritma Sorting:\n1. Bubble Sort: Membandingkan dua elemen bersebelahan dan menukarnya jika urutannya salah.\n2. Selection Sort: Memilih elemen terkecil/terbesar dari bagian belum terurut lalu menempatkannya di posisi yang sesuai.\n3. Insertion Sort: Membandingkan elemen satu per satu dan menyisipkannya ke posisi yang tepat.\n4. Quick Sort: Membagi data menggunakan elemen 'pivot' menjadi sub-array kiri dan kanan.`,
        images: [
          {
            url: "/images/materi/sorting-asc-desc.png",
            alt: "Visualisasi Urutan Ascending dan Descending"
          }
        ],
        interactiveTask: {
          title: "Latihan: Urutkan [9, 3, 6, 1] secara Ascending (Bubble Sort)",
          caseStudy: "Data [5,2,4] ascending: tukar 5 dan 2 → [2,5,4]; tukar 5 dan 4 → [2,4,5].",
          instructions: [
            "Bandingkan pasangan elemen bersebelahan.",
            "Tukar jika elemen kiri lebih besar.",
            "Ulangi sampai seluruh data terurut."
          ],
          referenceAnswer: "Hasil akhir pengurutan ascending: [1, 3, 6, 9].",
          criteria: ["Hasil urut benar", "Aturan ascending diterapkan", "Proses tukar dijelaskan"]
        },
        quizzes: [
          {
            id: 1,
            question: "Apa yang dimaksud dengan sorting dalam pemrograman?",
            options: ["Proses mencari data tertentu", "Proses mengurutkan data berdasarkan aturan tertentu", "Proses menghapus data yang tidak diperlukan", "Proses memasukkan data ke dalam array"],
            correctAnswer: 1
          },
          {
            id: 2,
            question: "Jika data diurutkan dari nilai terbesar ke nilai terkecil, pengurutan tersebut disebut...",
            options: ["Ascending", "Sequential", "Descending", "Binary"],
            correctAnswer: 2
          },
          {
            id: 3,
            question: "Dalam algoritma Bubble Sort, elemen yang dibandingkan adalah...",
            options: ["Elemen yang bersebelahan", "Hanya elemen pertama", "Semua elemen sekaligus", "Hanya elemen terakhir"],
            correctAnswer: 0
          }
        ]
      }
    ]
  },

  // ==================== BAB 2: FLOWCHART ====================
  {
    id: "bab-2",
    chapter: "BAB 2",
    title: "Flowchart (Diagram Alir)",
    description: "Memvisualisasikan alur logika program menggunakan simbol-simbol standar internasional.",
    duration: "40 Menit",
    subTopics: [
      {
        id: "2-1",
        title: "Konsep Dasar Flowchart",
        content: `Flowchart atau diagram alir adalah representasi visual langkah-langkah algoritma menggunakan simbol standar yang dihubungkan oleh garis panah. Flowchart membantu pembaca memahami urutan proses, percabangan keputusan, dan perulangan sebelum kode program mulai ditulis.`,
        images: [
          {
            url: "/images/materi/flowchart-konsep-luas.png",
            alt: "Flowchart Konsep Luas Persegi Panjang dengan Loop"
          }
        ],
        interactiveTask: {
          title: "Latihan Drag & Drop: Flowchart Keliling Persegi",
          caseStudy: "Mulai → input sisi → keliling=4×sisi → tampilkan hasil → selesai.",
          instructions: [
            "Masukkan sisi.",
            "Hitung keliling = 4 × sisi.",
            "Tampilkan hasil dan selesai."
          ],
          referenceAnswer: "Mulai (Oval) → Input Sisi (Jajar Genjang) → Keliling = 4 * Sisi (Persegi Panjang) → Print Keliling (Jajar Genjang) → Selesai (Oval)",
          criteria: ["Simbol sesuai fungsi", "Rumus benar", "Alur terhubung panah"]
        },
        quizzes: [
          {
            id: 1,
            question: "Flowchart adalah ...",
            options: ["Bahasa mesin", "Diagram alur proses visual", "Database", "Perangkat keras"],
            correctAnswer: 1
          },
          {
            id: 2,
            question: "Arah proses dalam flowchart ditunjukkan oleh ...",
            options: ["Garis Panah", "Judul", "Warna", "Ukuran Simbol"],
            correctAnswer: 0
          },
          {
            id: 3,
            question: "Manfaat utama pembuatan flowchart adalah ...",
            options: ["Memahami alur logika dengan lebih mudah", "Menghapus kebutuhan algoritma", "Mengganti komponen komputer", "Menentukan merk laptop"],
            correctAnswer: 0
          }
        ]
      },
      {
        id: "2-2",
        title: "Simbol-Simbol Standard Flowchart",
        content: `Setiap bentuk simbol flowchart memiliki arti dan fungsi khusus baku:\n\n1. Terminator (Oval/Kapsul): Titik awal (Start) atau akhir (End) alur.\n2. Process (Persegi Panjang): Operasi pengolahan data atau perhitungan.\n3. Document (Kertas Bergelombang): Output berupa dokumen cetak.\n4. Decision (Belah Ketupat): Pengambilan keputusan bercabang berdasarkan kondisi.\n5. Data (Jajar Genjang): Operasi Input atau Output data.\n6. On-Page Connector (Lingkaran): Penghubung alur pada halaman yang sama.\n7. Off-Page Connector (Segilima): Penghubung alur pada halaman berbeda.\n8. Flow Line (Garis Panah): Menunjukkan arah jalurnya proses.`,
        images: [
          {
            url: "/images/materi/tabel-simbol-flowchart.png",
            alt: "Tabel Simbol Standard Flowchart"
          },
          {
            url: "/images/materi/flowchart-simbol-kelulusan.png",
            alt: "Contoh Penerapan Simbol Flowchart: Program Kelulusan"
          }
        ],
        interactiveTask: {
          title: "Latihan Simbol: Program Kelulusan",
          caseStudy: "Input nilai memakai jajar genjang, pemeriksaan nilai memakai belah ketupat, dan perhitungan memakai persegi panjang.",
          instructions: [
            "Pilih simbol yang tepat untuk setiap kegiatan.",
            "Hubungkan dengan garis panah.",
            "Beri label Ya / Tidak pada cabang keputusan."
          ],
          referenceAnswer: "Mulai (Oval) → Input Nilai (Jajar Genjang) → Hitung Rata-rata (Persegi Panjang) → Decision (Belah Ketupat) → Output (Jajar Genjang) → Selesai (Oval)",
          criteria: ["Simbol tepat", "Decision bercabang Ya/Tidak", "Arah panah jelas"]
        },
        quizzes: [
          {
            id: 1,
            question: "Simbol Terminator dalam flowchart berbentuk ...",
            options: ["Oval / Kapsul", "Belah Ketupat", "Persegi Panjang", "Jajar Genjang"],
            correctAnswer: 0
          },
          {
            id: 2,
            question: "Simbol Process (perhitungan/pengolahan) berbentuk ...",
            options: ["Oval", "Persegi Panjang", "Belah Ketupat", "Panah"],
            correctAnswer: 1
          },
          {
            id: 3,
            question: "Simbol untuk memasukkan data (Input) atau menampilkan hasil (Output) adalah ...",
            options: ["Lingkaran", "Belah Ketupat", "Jajar Genjang", "Persegi Panjang"],
            correctAnswer: 2
          }
        ]
      },
      {
        id: "2-3",
        title: "Flowchart Percabangan",
        content: `Flowchart percabangan menggunakan simbol Decision (belah ketupat) untuk memeriksa suatu kondisi. Setiap hasil pemeriksaan (misalnya 'Ya' atau 'Tidak') akan mengarahkan proses ke jalur cabang yang berbeda.\n\nAturan Penting:\n• Letakkan Decision setelah data masukan tersedia.\n• Wajib memberikan label 'Ya' dan 'Tidak' pada garis cabang.\n• Pastikan semua cabang akhirnya terhubung kembali menuju Selesai.`,
        images: [
          {
            url: "/images/materi/flowchart-mod2.png",
            alt: "Flowchart Percabangan Bilangan Genap/Ganjil Modulo 2"
          },
          {
            url: "/images/materi/flowchart-percabangan-kelulusan.png",
            alt: "Flowchart Percabangan Nilai Kelulusan >= 75"
          }
        ],
        interactiveTask: {
          title: "Latihan: Flowchart Kelayakan Usia Minimal 17 Tahun",
          caseStudy: "Input n → periksa n mod 2 = 0 → Ya: Genap; Tidak: Ganjil.",
          instructions: [
            "Input usia.",
            "Periksa apakah usia ≥ 17.",
            "Tampilkan 'Boleh' atau 'Belum Boleh'."
          ],
          referenceAnswer: "Mulai → Input Usia → Usia ≥ 17? → Ya: Tampilkan 'Boleh' / Tidak: Tampilkan 'Belum Boleh' → Selesai",
          criteria: ["Kondisi benar", "Cabang tidak tertukar", "Alur berakhir di Selesai"]
        },
        quizzes: [
          {
            id: 1,
            question: "Simbol yang digunakan untuk cabang keputusan (Decision) berbentuk...",
            options: ["Oval", "Jajar Genjang", "Belah Ketupat", "Persegi Panjang"],
            correctAnswer: 2
          },
          {
            id: 2,
            question: "Garis keluar dari simbol Decision sebaiknya diberi label...",
            options: ["Ya / Tidak", "Nama Pembuat", "Warna", "Nomor Halaman"],
            correctAnswer: 0
          },
          {
            id: 3,
            question: "Suatu bilangan dinyatakan genap apabila ...",
            options: ["Sisa bagi dengan 2 (mod 2) sama dengan 0", "Nilainya selalu diatas 100", "Bisa dibagi dengan 3", "Indeksnya bernilai 0"],
            correctAnswer: 0
          }
        ]
      },
      {
        id: "2-4",
        title: "Flowchart Perulangan",
        content: `Flowchart perulangan menggambarkan alur proses yang memutar kembali ke langkah sebelumnya. Simbol Decision bertugas memeriksa apakah proses perulangan masih perlu dilanjutkan.\n\nPrasyarat Perulangan:\n1. Tentukan nilai awal pencatat (Inisialisasi).\n2. Periksa syarat kondisi perulangan.\n3. Jalankan instruksi dan perbarui nilai pencatat (Increment).\n4. Pastikan ada titik di mana kondisi akhirnya bernilai Salah agar tidak terjadi infinite loop.`,
        images: [
          {
            url: "/images/materi/flowchart-loop-1-5.png",
            alt: "Flowchart Perulangan Menampilkan Angka 1 Sampai 5"
          }
        ],
        interactiveTask: {
          title: "Latihan: Flowchart Menampilkan Bilangan Genap 2 Sampai 10",
          caseStudy: "Mulai i=1 → selama i≤5 tampilkan i dan tambah 1 → kembali memeriksa kondisi.",
          instructions: [
            "Tetapkan i = 2.",
            "Periksa apakah i ≤ 10.",
            "Tampilkan i lalu tambah i dengan 2 (i = i + 2).",
            "Ulangi alur panah kembali ke Decision."
          ],
          referenceAnswer: "Mulai → i=2 → i≤10? → Ya: Tampilkan i → i=i+2 → Kembali ke Decision; Tidak: Selesai.",
          criteria: ["Nilai awal i=2", "Penambahan i+2", "Kondisi berhenti tepat pada i>10"]
        },
        quizzes: [
          {
            id: 1,
            question: "Ciri khas paling utama pada flowchart perulangan adalah ...",
            options: ["Adanya panah yang memutar kembali ke langkah sebelumnya", "Tidak memiliki garis panah", "Hanya terdiri dari simbol oval", "Tidak memiliki kondisi keputusan"],
            correctAnswer: 0
          },
          {
            id: 2,
            question: "Nilai variabel penghitung (counter) harus selalu diperbarui agar ...",
            options: ["Kondisi perulangan dapat berubah dan akhirnya berhenti", "Data di dalam memori terhapus", "Simbol flowchart berubah bentuk", "Program tidak membutuhkan input"],
            correctAnswer: 0
          },
          {
            id: 3,
            question: "Apa akibatnya jika nilai variabel pencatat perulangan tidak pernah berubah?",
            options: ["Terjadi perulangan tak terbatas (Infinite Loop)", "Program otomatis selesai", "Data array terurut otomatis", "File program terhapus"],
            correctAnswer: 0
          }
        ]
      },
      {
        id: "2-5",
        title: "Flowchart Array",
        content: `Flowchart array menggambarkan proses pengisian data, pengolahan, atau pembacaan elemen array. Struktur perulangan hampir selalu digunakan bersama array untuk mengakses setiap elemen dari indeks pertama hingga terakhir.`,
        images: [
          {
            url: "/images/materi/flowchart-array-sum.png",
            alt: "Flowchart Array Menjumlahkan 4 Nilai"
          },
          {
            url: "/images/materi/array-indeks.png",
            alt: "Ilustrasi Array dan Indeks"
          }
        ],
        interactiveTask: {
          title: "Latihan: Flowchart Mencari Nilai Terbesar 5 Elemen Array",
          caseStudy: "Untuk menjumlahkan 4 nilai: total=0, i=0; selama i<4, total=total+data[i], i=i+1.",
          instructions: [
            "Input 5 elemen array.",
            "Set max = data[0] dan indeks i = 1.",
            "Bandingkan data[i] dengan max, perbarui jika lebih besar.",
            "Tampilkan nilai max."
          ],
          referenceAnswer: "max=data[0], i=1; selama i<5: jika data[i]>max maka max=data[i]; i=i+1; tampilkan max.",
          criteria: ["Inisialisasi awal benar", "Semua elemen diperiksa", "Nilai max akhir tepat"]
        },
        quizzes: [
          {
            id: 1,
            question: "Dalam penulisan array data[i], huruf 'i' menunjukkan ...",
            options: ["Nomor indeks/posisi elemen", "Warna elemen", "Nama program", "Arah panah"],
            correctAnswer: 0
          },
          {
            id: 2,
            question: "Struktur alur terbaik untuk membaca seluruh elemen array secara berurutan adalah ...",
            options: ["Perulangan (Looping)", "Terminator saja", "Judul diagram", "Komentar"],
            correctAnswer: 0
          },
          {
            id: 3,
            question: "Sebelum mengakses elemen data[i], program harus memastikan bahwa...",
            options: ["Nilai 'i' berada dalam rentang indeks yang valid", "Warna monitor terang", "Nama akun aktif", "Ukuran font besar"],
            correctAnswer: 0
          }
        ]
      },
      {
        id: "2-6",
        title: "Flowchart Searching",
        content: `Flowchart Searching menggambarkan pemeriksaan elemen sampai target ditemukan atau seluruh data habis diperiksa. Linear Search memeriksa elemen satu per satu, sedangkan Binary Search membagi ruang pencarian menjadi dua bagian secara berulang (syarat data terurut).`,
        images: [
          {
            url: "/images/materi/flowchart-searching-all.png",
            alt: "Flowchart Linear Search, Binary Search, dan Bubble Sort"
          }
        ],
        quizzes: [
          {
            id: 1,
            question: "Metode pencarian yang memeriksa data satu per satu dari awal sampai akhir adalah ...",
            options: ["Binary Search", "Sequential Search / Linear Search", "Bubble Sort", "Quick Sort"],
            correctAnswer: 1
          },
          {
            id: 2,
            question: "Syarat utama agar Binary Search dapat digunakan pada flowchart searching adalah ...",
            options: ["Data harus terurut", "Data harus berjumlah genap", "Data tidak boleh angka", "Data bernilai positif"],
            correctAnswer: 0
          },
          {
            id: 3,
            question: "Metode yang paling tepat untuk data terurut dengan membagi dua ruang pencarian adalah ...",
            options: ["Sequential Search", "Binary Search", "Bubble Sort", "Insertion Sort"],
            correctAnswer: 1
          }
        ]
      },
      {
        id: "2-7",
        title: "Flowchart Sorting",
        content: `Flowchart Sorting menggambarkan algoritma perbandingan dan pertukaran elemen secara berulang hingga data tersusun secara Ascending (terkecil ke terbesar) atau Descending (terbesar ke terkecil). Contoh utama pada diagram alir ini adalah metode Bubble Sort.`,
        images: [
          {
            url: "/images/materi/flowchart-bubble-sort.png",
            alt: "Flowchart Sorting Bubble Sort"
          },
          {
            url: "/images/materi/sorting-before-after.png",
            alt: "Ilustrasi Data Sebelum dan Setelah Sorting Ascending"
          }
        ],
        quizzes: [
          {
            id: 1,
            question: "Metode sorting yang membandingkan elemen bersebelahan pada flowchart adalah ...",
            options: ["Selection Sort", "Insertion Sort", "Bubble Sort", "Binary Search"],
            correctAnswer: 2
          },
          {
            id: 2,
            question: "Selection Sort memilih ... pada setiap putaran ascending.",
            options: ["Nilai terbesar", "Nilai terkecil", "Nilai tengah", "Nilai pertama acak"],
            correctAnswer: 1
          },
          {
            id: 3,
            question: "Data [4, 2, 3] setelah diurutkan secara Ascending menjadi ...",
            options: ["[4, 3, 2]", "[2, 3, 4]", "[3, 2, 4]", "[2, 4, 3]"],
            correctAnswer: 1
          }
        ]
      }
    ]
  }
];