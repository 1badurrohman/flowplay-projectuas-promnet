import { useEffect, useState, type ReactNode } from "react";
import { flowPlayApi, type UserProgress } from "./services/api";

type Screen =
  | "register"
  | "login"
  | "dashboard"
  | "materi"
  | "materi-detail"
  | "latihan-hub"
  | "challenge"
  | "quiz"
  | "score"
  | "leaderboard"
  | "progress"
  | "profile";

type IconName =
  | "arrow"
  | "award"
  | "book"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "home"
  | "lock"
  | "medal"
  | "play"
  | "profile"
  | "spark"
  | "star"
  | "target"
  | "trophy"
  | "game"
  | "flow";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="m15 18-6-6 6-6" /></>,
    award: <><circle cx="12" cy="8" r="5" /><path d="m8.5 12-1 9 4.5-2.5 4.5 2.5-1-9" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    medal: <><circle cx="12" cy="15" r="6" /><path d="M8 3h8l-2 7h-4L8 3Z" /><path d="m12 12 1 2 2 .5-1.5 1.5.5 2-2-1-2 1 .5-2L9 14.5l2-.5 1-2Z" /></>,
    play: <path d="m9 7 8 5-8 5V7Z" />,
    profile: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    spark: <><path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
    trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v5M8 21h8M9 18h6" /></>,
    game: <><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 12h4m-2-2v4M15 11h.01M18 13h.01" /></>,
    flow: <><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M6 9v3a3 3 0 0 0 3 3h3" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-10 rotate-3 place-items-center rounded-xl bg-orange-500 text-white shadow-md">
        <Icon name="play" size={22} />
      </div>
      <div className="font-display text-2xl font-extrabold tracking-tight text-stone-900">
        Flow<span className="text-orange-500">Play</span>
      </div>
    </div>
  );
}

function Button({ children, onClick, variant = "primary", className = "", type = "button", disabled = false }: { children: ReactNode; onClick?: () => void; variant?: "primary" | "dark" | "light" | "outline" | "ghost"; className?: string; type?: "button" | "submit"; disabled?: boolean }) {
  const styles = {
    primary: "bg-orange-500 text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600",
    dark: "bg-stone-900 text-white shadow-md hover:bg-stone-800",
    light: "bg-white text-stone-900 hover:bg-stone-100",
    outline: "border border-stone-200 bg-white text-stone-900 hover:border-orange-500 hover:text-orange-500",
    ghost: "bg-transparent text-stone-500 hover:bg-stone-100 hover:text-stone-900",
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-6 font-bold transition-all active:translate-y-0.5 ${disabled ? "opacity-50 cursor-not-allowed bg-stone-200 text-stone-400" : styles[variant]} ${className}`}>
      {children}
    </button>
  );
}

function Field({ label, placeholder, type = "text", value, onChange, icon }: { label: string; placeholder: string; type?: string; value?: string; onChange?: (value: string) => void; icon?: IconName }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-stone-800">{label}</span>
      <div className="relative flex items-center">
        {icon && <span className="absolute left-4 text-stone-400"><Icon name={icon} size={18} /></span>}
        <input required type={type} value={value} onChange={(event) => onChange?.(event.target.value)} placeholder={placeholder} className={`h-13 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 ${icon ? "pl-11" : ""}`} />
      </div>
    </label>
  );
}

function NotificationToast({ badgeName, onClose }: { badgeName: string | null; onClose: () => void }) {
  if (!badgeName) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 rounded-2xl bg-stone-900 p-4 text-white shadow-2xl animate-bounce">
      <div className="grid size-12 place-items-center rounded-xl bg-orange-500 text-white font-extrabold">
        <Icon name="award" size={26} />
      </div>
      <div>
        <div className="text-xs font-bold text-orange-400">BADGE BARU DIDAPATKAN!</div>
        <div className="font-display font-extrabold text-white text-base">{badgeName}</div>
      </div>
      <button onClick={onClose} className="ml-2 text-white/50 hover:text-white"><Icon name="close" size={18} /></button>
    </div>
  );
}

function AuthLayout({ children, screen, setScreen }: { children: ReactNode; screen: Screen; setScreen: (s: Screen) => void }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50/60 via-amber-50/30 to-stone-100 p-4 md:p-8 flex items-center justify-center">
      <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border border-stone-100 lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* SISI KIRI (HERO SECTION SESUAI REFERENSI TANPA TEKS TERSEBUT) */}
        <section className="relative flex flex-col justify-between p-8 md:p-14 bg-gradient-to-b from-transparent via-orange-50/20 to-stone-50/50">
          <Logo />
          
          <div className="my-auto py-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100/80 px-4 py-1.5 text-xs font-extrabold text-orange-600 mb-6 shadow-sm">
              <Icon name="spark" size={15} /> Belajar Pemrograman Jadi Lebih Seru!
            </div>
            
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
              Logika jadi lebih mudah saat kamu <span className="text-orange-500 underline decoration-orange-300 decoration-wavy underline-offset-8">memainkannya.</span>
            </h1>

            {/* 4 KOTAK FITUR KECIL DI BAWAH */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm border border-stone-100 flex flex-col items-center text-center">
                <div className="grid size-10 place-items-center rounded-xl bg-orange-100 text-orange-600 mb-2"><Icon name="book" size={20} /></div>
                <span className="text-xs font-bold text-stone-800">Materi Terstruktur</span>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm border border-stone-100 flex flex-col items-center text-center">
                <div className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-600 mb-2"><Icon name="flow" size={20} /></div>
                <span className="text-xs font-bold text-stone-800">Simulasi Alur</span>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm border border-stone-100 flex flex-col items-center text-center">
                <div className="grid size-10 place-items-center rounded-xl bg-orange-100 text-orange-600 mb-2"><Icon name="game" size={20} /></div>
                <span className="text-xs font-bold text-stone-800">Gamifikasi</span>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm border border-stone-100 flex flex-col items-center text-center">
                <div className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-600 mb-2"><Icon name="spark" size={20} /></div>
                <span className="text-xs font-bold text-stone-800">Poin XP</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-stone-400 pt-6 border-t border-stone-100">
            <span>Belajar</span> • <span>Berlatih</span> • <span className="text-orange-500">Naik Level 🚀</span>
          </div>
        </section>

        {/* SISI KANAN (FORM KARTU UTAMA) */}
        <section className="flex items-center justify-center p-8 md:p-14 bg-white border-t lg:border-t-0 lg:border-l border-stone-100">
          <div className="w-full max-w-md">
            {children}
            <div className="mt-8 text-center text-sm text-stone-500">
              {screen === "register" ? "Sudah punya akun?" : "Belum punya akun?"}
              <button className="ml-1 font-extrabold text-orange-500 hover:underline" onClick={() => setScreen(screen === "register" ? "login" : "register")}>
                {screen === "register" ? "Masuk di sini" : "Daftar sekarang"}
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

function Register({ setScreen, userName, setUserName, onRegister }: { setScreen: (s: Screen) => void; userName: string; setUserName: (name: string) => void; onRegister: (fullName: string, username: string, password: string) => Promise<void> }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !fullName.trim() || !email.trim() || !password) {
      alert("Semua kolom harus diisi!");
      return;
    }
    setSubmitting(true);
    try {
      await onRegister(fullName, userName, password);
      alert("Pendaftaran berhasil! Silakan masuk.");
      setScreen("login");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Pendaftaran gagal.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout screen="register" setScreen={setScreen}>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="grid size-12 place-items-center rounded-2xl bg-orange-100 text-orange-600">
            <Icon name="profile" size={24} />
          </div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">Mulai petualanganmu</h2>
        </div>
        <p className="text-sm leading-relaxed text-stone-500">Buat akun untuk menyimpan progres dan pencapaian belajarmu.</p>
      </div>
      <form className="space-y-4" onSubmit={handleRegister}>
        <Field label="Nama lengkap" placeholder="Masukkan nama lengkap" value={fullName} onChange={setFullName} icon="profile" />
        <Field label="Email" placeholder="Masukkan alamat email" type="email" value={email} onChange={setEmail} icon="profile" />
        <Field label="Username" placeholder="Pilih username unik" value={userName} onChange={setUserName} icon="profile" />
        <Field label="Password" placeholder="Minimal 8 karakter" type="password" value={password} onChange={setPassword} icon="lock" />
        <Button type="submit" disabled={submitting} className="mt-4 w-full">
          {submitting ? "Mendaftarkan..." : "Daftar Sekarang"} {!submitting && <Icon name="chevron" />}
        </Button>
      </form>
    </AuthLayout>
  );
}

function Login({ setScreen, userName, setUserName, onLogin }: { setScreen: (s: Screen) => void; userName: string; setUserName: (name: string) => void; onLogin: (username: string, password: string) => Promise<void> }) {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onLogin(userName, password);
      setScreen("dashboard");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Login gagal.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout screen="login" setScreen={setScreen}>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="grid size-12 place-items-center rounded-2xl bg-orange-100 text-orange-600">
            <Icon name="profile" size={24} />
          </div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">Selamat datang kembali</h2>
        </div>
        <p className="text-sm leading-relaxed text-stone-500">Lanjutkan perjalanan belajarmu yang sempat tertunda.</p>
      </div>
      <form className="space-y-5" onSubmit={handleLogin}>
        <Field label="Username" placeholder="Masukkan username" value={userName} onChange={setUserName} icon="profile" />
        <div>
          <Field label="Password" placeholder="Masukkan password" type="password" value={password} onChange={setPassword} icon="lock" />
          <button type="button" onClick={() => window.alert("Tautan reset password telah dikirim.")} className="mt-2 block w-full text-right text-xs font-bold text-orange-500 hover:underline">Lupa password?</button>
        </div>
        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Menghubungkan..." : "Masuk ke FlowPlay"} {!submitting && <Icon name="chevron" />}
        </Button>
      </form>
    </AuthLayout>
  );
}

const navItems: { label: string; screen: Screen; icon: IconName }[] = [
  { label: "Beranda", screen: "dashboard", icon: "home" },
  { label: "Materi", screen: "materi", icon: "book" },
  { label: "Latihan", screen: "latihan-hub", icon: "spark" },
  { label: "Peringkat", screen: "leaderboard", icon: "trophy" },
  { label: "Progress", screen: "progress", icon: "target" },
  { label: "Profil", screen: "profile", icon: "profile" },
];

function getInitials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "FP";
}

function AppShell({ children, active, setScreen, userName }: { children: ReactNode; active: Screen; setScreen: (s: Screen) => void; userName: string }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-20 border-b border-stone-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button key={item.label} onClick={() => setScreen(item.screen)} className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${active === item.screen ? "bg-orange-50 text-orange-600 shadow-sm" : "text-stone-500 hover:text-stone-900"}`}>
                <Icon name={item.icon} size={18} /> {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button aria-label="Buka profil" onClick={() => setScreen("profile")} className="grid size-10 place-items-center rounded-full bg-orange-500 text-xs font-extrabold text-white shadow-sm">{getInitials(userName)}</button>
          </div>
        </div>
      </header>
      {children}
      <nav className="fixed bottom-3 left-1/2 z-30 flex w-[calc(100%-1.5rem)] -translate-x-1/2 items-center justify-around rounded-2xl border border-stone-200 bg-white/95 p-2 shadow-xl backdrop-blur md:hidden">
        {navItems.map((item) => (
          <button key={item.label} onClick={() => setScreen(item.screen)} className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-bold ${active === item.screen ? "bg-orange-50 text-orange-600" : "text-stone-400"}`}>
            <Icon name={item.icon} size={19} />{item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function ProgressBar({ value, dark = false }: { value: number; dark?: boolean }) {
  return <div className={`h-2.5 overflow-hidden rounded-full ${dark ? "bg-white/20" : "bg-stone-200"}`}><div className="h-full rounded-full bg-orange-500" style={{ width: `${value}%` }} /></div>;
}

function Dashboard({ setScreen, userName, xp, completedLessons }: { setScreen: (s: Screen) => void; userName: string; xp: number; completedLessons: number }) {
  const percent = (completedLessons / 6) * 100;

  const todayFormatted = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).toUpperCase();

  return (
    <AppShell active="dashboard" setScreen={setScreen} userName={userName}>
      <main className="mx-auto max-w-7xl px-5 pb-28 pt-8 lg:px-8 lg:pt-11">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="text-sm font-bold text-orange-500">{todayFormatted}</div>
            <div className="mt-2 font-display text-3xl font-extrabold tracking-tight text-stone-900 md:text-4xl">Halo, {userName}!</div>
            <p className="mt-2 text-stone-500">Siap belajar konsep algoritma hari ini?</p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm border border-stone-100"><div className="text-xs font-bold text-stone-400">LEVEL</div><div className="mt-1 flex items-center gap-2 font-extrabold text-stone-900"><span className="grid size-6 place-items-center rounded-lg bg-orange-100 text-orange-600 text-xs">{completedLessons >= 3 ? 2 : 1}</span> Pemula</div></div>
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm border border-stone-100"><div className="text-xs font-bold text-stone-400">TOTAL XP</div><div className="mt-1 flex items-center gap-2 font-extrabold text-stone-900"><Icon name="spark" size={17} /><span className="text-orange-500">{xp}</span> XP</div></div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.55fr_0.8fr]">
          <section className="relative overflow-hidden rounded-[2rem] bg-stone-900 p-7 text-white shadow-xl sm:p-9">
            <div className="relative max-w-lg">
              <span className="inline-flex rounded-full bg-orange-500 px-3 py-1 text-xs font-extrabold text-white">MODUL BACAAN</span>
              <div className="mt-5 font-display text-3xl font-extrabold leading-tight">Pelajari Materi Algoritma</div>
              <p className="mt-3 text-sm leading-relaxed text-stone-400">Pahami penjelasan terstruktur lengkap dengan ilustrasi diagram alur interaktif.</p>
              <div className="mt-7 max-w-sm"><div className="mb-2 flex justify-between text-xs font-bold"><span>Progress Materi</span><span>{percent}%</span></div><ProgressBar value={percent} dark /></div>
              <Button variant="light" className="mt-7" onClick={() => setScreen("materi")}><Icon name="book" size={18} /> Baca Materi</Button>
            </div>
          </section>

          <section className="rounded-[2rem] bg-orange-500 p-7 text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between"><div className="grid size-12 place-items-center rounded-2xl bg-white/15"><Icon name="trophy" size={26} /></div><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">+150 XP</span></div>
              <div className="mt-8 font-display text-2xl font-extrabold">Pusat Latihan</div>
              <p className="mt-2 text-sm leading-relaxed text-white/90">Uji kemampuan logikamu dengan menyusun flowchart atau menjawab kuis evaluasi.</p>
            </div>
            <Button variant="light" className="mt-6 w-full" onClick={() => setScreen("latihan-hub")}>Mulai Latihan <Icon name="chevron" /></Button>
          </section>
        </div>
      </main>
    </AppShell>
  );
}

const lessonsData = [
  {
    n: "01",
    title: "Mengenal Algoritma & Logika Pemrograman",
    detail: "Pengertian dasar, ciri-ciri algoritma yang baik, dan contoh kehidupan nyata.",
    duration: "10 menit",
    subTopics: [
      {
        id: "1.1",
        title: "1. Pengertian Algoritma",
        content: (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-stone-600">
              Algoritma adalah deretan langkah-langkah logis dan terstruktur yang disusun secara sistematis untuk memecahkan suatu masalah atau menyelesaikan suatu tugas tertentu. Dalam dunia ilmu komputer, algoritma adalah cetak biru (*blueprint*) sebelum program komputer ditulis.
            </p>
            <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-100 text-xs space-y-1">
              <span className="font-extrabold text-orange-600 block">Analogi Sederhana:</span>
              <p className="text-stone-600">Resep membuat mi instan adalah algoritma di dunia nyata. Jika langkah-langkahnya diacak, hasilnya tidak akan sempurna.</p>
            </div>
          </div>
        ),
        question: {
          q: "Apa definisi paling mendasar dari sebuah algoritma?",
          options: ["Bahasa pemrograman tingkat tinggi", "Urutan langkah-langkah logis untuk memecahkan masalah", "Komponen fisik di dalam CPU", "Sistem operasi komputer"],
          correct: 1,
          explanation: "Algoritma pada dasarnya adalah alur urutan langkah logis yang dirancang untuk menyelesaikan tugas/masalah."
        }
      },
      {
        id: "1.2",
        title: "2. Ciri-Ciri Algoritma yang Baik",
        content: (
          <div className="bg-orange-50/60 p-5 rounded-2xl border border-orange-100 space-y-2 text-sm">
            <strong className="text-orange-600 block font-extrabold">Ciri Utama Menurut Donald Knuth:</strong>
            <ul className="list-disc list-inside text-stone-600 space-y-1">
              <li><strong>Finiteness (Keterbatasan):</strong> Harus berhenti setelah melakukan sejumlah langkah terbatas.</li>
              <li><strong>Definiteness (Kepastian):</strong> Setiap langkah harus didefinisikan secara jelas tanpa ambiguitas.</li>
              <li><strong>Input (Masukan):</strong> Memiliki nol atau lebih masukan data untuk diproses.</li>
              <li><strong>Output (Keluaran):</strong> Menghasilkan setidaknya satu keluaran atau hasil akhir.</li>
            </ul>
          </div>
        ),
        question: {
          q: "Ciri 'Definiteness' dalam algoritma berarti bahwa...",
          options: ["Algoritma tidak boleh berhenti", "Setiap langkah harus jelas dan tidak menimbulkan makna ganda", "Algoritma harus memakai bahasa Inggris", "Algoritma harus memiliki banyak input"],
          correct: 1,
          explanation: "Definiteness menekankan bahwa setiap instruksi harus bernilai pasti/jelas tanpa ada ketidakpastian (ambiguitas)."
        }
      },
      {
        id: "1.3",
        title: "3. Diagram Alur Pemrosesan Data",
        content: (
          <div>
            <p className="text-sm text-stone-600 mb-3">Setiap algoritma menerima input, memprosesnya, dan menghasilkan output:</p>
            <div className="rounded-3xl bg-stone-900 p-6 text-white shadow-md flex justify-center overflow-x-auto">
              <svg width="100%" height="140" viewBox="0 0 600 140" className="min-w-[480px] max-w-xl">
                <rect x="20" y="40" width="140" height="60" rx="15" fill="#F97316" />
                <text x="90" y="75" fill="#FFF" textAnchor="middle" fontWeight="bold" fontSize="14">INPUT (Bahan)</text>
                <line x1="160" y1="70" x2="220" y2="70" stroke="#FFF" strokeWidth="3" />

                <rect x="230" y="40" width="140" height="60" rx="15" fill="#10B981" />
                <text x="300" y="75" fill="#FFF" textAnchor="middle" fontWeight="bold" fontSize="14">PROSES (Logika)</text>
                <line x1="370" y1="70" x2="430" y2="70" stroke="#FFF" strokeWidth="3" />

                <rect x="440" y="40" width="140" height="60" rx="15" fill="#3B82F6" />
                <text x="510" y="75" fill="#FFF" textAnchor="middle" fontWeight="bold" fontSize="14">OUTPUT (Hasil)</text>
              </svg>
            </div>
          </div>
        ),
        question: {
          q: "Manakah urutan pemrosesan data komputer yang paling tepat?",
          options: ["Proses -> Output -> Input", "Input -> Proses -> Output", "Output -> Input -> Proses", "Proses -> Input -> Output"],
          correct: 1,
          explanation: "Urutan alur pemrosesan data selalu diawali Input (masukan), lalu Proses (pengolahan), dan diakhiri Output (hasil)."
        }
      }
    ]
  },
  {
    n: "02",
    title: "Simbol Standar Flowchart (Diagram Alur)",
    detail: "Mengenal bentuk geometri baku seperti Terminator, Process, Decision, dan I/O.",
    duration: "12 menit",
    subTopics: [
      {
        id: "2.1",
        title: "1. Konsep Diagram Alur",
        content: (
          <p className="text-sm leading-relaxed text-stone-600">
            Flowchart menggambarkan alur eksekusi logika menggunakan simbol-simbol grafik standar yang disepakati secara internasional oleh standar ANSI/ISO.
          </p>
        ),
        question: {
          q: "Apa fungsi utama dari penggunaan flowchart dibanding teks biasa?",
          options: ["Membuat ukuran file program jadi lebih kecil", "Mempermudah visualisasi alur logika secara grafis", "Membuat program berjalan lebih cepat", "Menghapus kebutuhan bahasa pemrograman"],
          correct: 1,
          explanation: "Flowchart mempermudah pemahaman logika kompleks melalui diagram visual berbasis bentuk geometri standar."
        }
      },
      {
        id: "2.2",
        title: "2. Simbol-Simbol Geometri Baku",
        content: (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50 flex items-center gap-4">
              <div className="w-24 shrink-0 text-center">
                <svg width="80" height="40" viewBox="0 0 100 50">
                  <rect x="5" y="10" width="90" height="30" rx="15" fill="#FED7AA" stroke="#C2410C" strokeWidth="2" />
                  <text x="50" y="30" fill="#000" fontSize="10" textAnchor="middle" fontWeight="bold">Start / End</text>
                </svg>
              </div>
              <div>
                <span className="font-bold text-orange-600 block text-sm">Terminator (Kapsul/Oval)</span>
                <span className="text-xs text-stone-500">Menandai awal atau akhir dari alur program.</span>
              </div>
            </div>

            <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50 flex items-center gap-4">
              <div className="w-24 shrink-0 text-center">
                <svg width="80" height="40" viewBox="0 0 100 50">
                  <rect x="5" y="10" width="90" height="30" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
                  <text x="50" y="28" fill="#000" fontSize="10" textAnchor="middle" fontWeight="bold">Proses</text>
                </svg>
              </div>
              <div>
                <span className="font-bold text-orange-600 block text-sm">Process (Kotak)</span>
                <span className="text-xs text-stone-500">Menunjukkan kegiatan pengolahan data atau kalkulasi.</span>
              </div>
            </div>

            <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50 flex items-center gap-4">
              <div className="w-24 shrink-0 text-center">
                <svg width="80" height="40" viewBox="0 0 100 50">
                  <polygon points="50,5 90,25 50,45 10,25" fill="#FECDD3" stroke="#BE123C" strokeWidth="2" />
                  <text x="50" y="28" fill="#000" fontSize="9" textAnchor="middle" fontWeight="bold">Kondisi?</text>
                </svg>
              </div>
              <div>
                <span className="font-bold text-orange-600 block text-sm">Decision (Belah Ketupat)</span>
                <span className="text-xs text-stone-500">Pengambilan keputusan bercabang berdasarkan kondisi.</span>
              </div>
            </div>

            <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50 flex items-center gap-4">
              <div className="w-24 shrink-0 text-center">
                <svg width="80" height="40" viewBox="0 0 100 50">
                  <polygon points="20,10 95,10 80,40 5,40" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
                  <text x="50" y="28" fill="#000" fontSize="10" textAnchor="middle" fontWeight="bold">Input/Output</text>
                </svg>
              </div>
              <div>
                <span className="font-bold text-orange-600 block text-sm">Input / Output (Jajar Genjang)</span>
                <span className="text-xs text-stone-500">Menerima masukan data atau menampilkan hasil.</span>
              </div>
            </div>
          </div>
        ),
        question: {
          q: "Simbol berbentuk Persegi Panjang dalam flowchart digunakan untuk...",
          options: ["Menandai titik awal dan akhir", "Proses pengolahan atau perhitungan", "Membaca input data dari keyboard", "Menentukan percabangan Ya/Tidak"],
          correct: 1,
          explanation: "Persegi panjang melambangkan simbol Process (Proses pengolahan kalkulasi data internal)."
        }
      }
    ]
  },
  {
    n: "03",
    title: "Variabel & Tipe Data Pemrograman",
    detail: "Mengenal wadah penyimpanan data seperti int, string, boolean, dan float.",
    duration: "14 menit",
    subTopics: [
      {
        id: "3.1",
        title: "1. Apa itu Variabel?",
        content: (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-stone-600">
              Variabel adalah wadah atau tempat di dalam memori komputer yang digunakan untuk menyimpan suatu nilai data. Nilai di dalam variabel dapat diubah sewaktu-waktu selama program berjalan.
            </p>
            <div className="bg-stone-100 p-4 rounded-2xl border border-stone-200 text-xs font-mono">
              <span className="text-orange-600 font-bold block mb-1">Contoh Penulisan (Deklarasi):</span>
              <span>int umur = 18;</span><br />
              <span>string nama = "Budi";</span>
            </div>
          </div>
        ),
        question: {
          q: "Mengapa variabel di dalam program disebut bersifat dinamis?",
          options: ["Karena tipe datanya selalu berubah sendiri", "Karena nilainya dapat diubah sewaktu-waktu saat program berjalan", "Karena nilainya tidak bisa diganti sama sekali", "Karena hanya bisa menyimpan angka"],
          correct: 1,
          explanation: "Variabel berfungsi sebagai wadah penyimpanan memori yang nilainya dapat diperbarui/diubah saat alur program dieksekusi."
        }
      },
      {
        id: "3.2",
        title: "2. Macam-Macam Tipe Data",
        content: (
          <div className="grid gap-3 sm:grid-cols-2 text-sm">
            <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50">
              <strong className="text-orange-600 block font-extrabold mb-1">int (Integer)</strong>
              <p className="text-xs text-stone-500">Menyimpan angka bulat, contoh: <code className="bg-white px-1.5 py-0.5 rounded border">10</code>, <code className="bg-white px-1.5 py-0.5 rounded border">-5</code>.</p>
            </div>
            <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50">
              <strong className="text-orange-600 block font-extrabold mb-1">string</strong>
              <p className="text-xs text-stone-500">Menyimpan teks atau karakter, contoh: <code className="bg-white px-1.5 py-0.5 rounded border">"Halo"</code>.</p>
            </div>
            <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50">
              <strong className="text-orange-600 block font-extrabold mb-1">float / double</strong>
              <p className="text-xs text-stone-500">Menyimpan angka desimal, contoh: <code className="bg-white px-1.5 py-0.5 rounded border">3.14</code>.</p>
            </div>
            <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50">
              <strong className="text-orange-600 block font-extrabold mb-1">boolean</strong>
              <p className="text-xs text-stone-500">Menyimpan nilai kebenaran: <code className="bg-white px-1.5 py-0.5 rounded border">true</code> / <code className="bg-white px-1.5 py-0.5 rounded border">false</code>.</p>
            </div>
          </div>
        ),
        question: {
          q: "Manakah tipe data yang paling tepat untuk menyimpan status saklar lampu (Menyala / Mati)?",
          options: ["string", "int", "boolean", "float"],
          correct: 2,
          explanation: "Tipe data boolean khusus digunakan untuk kondisi dua nilai saja (True/False)."
        }
      }
    ]
  },
  {
    n: "04",
    title: "Percabangan Logika (IF-ELSE)",
    detail: "Mengontrol jalurnya alur instruksi berdasarkan kondisi pemenuhan syarat.",
    duration: "15 menit",
    subTopics: [
      {
        id: "4.1",
        title: "1. Pengertian Logika Percabangan",
        content: (
          <p className="text-sm leading-relaxed text-stone-600">
            Percabangan memungkinkan komputer mengambil jalan eksekusi yang berbeda tergantung dari hasil evaluasi syarat.
          </p>
        ),
        question: {
          q: "Kapan baris instruksi di dalam blok IF akan dijalankan oleh program?",
          options: ["Saat kondisi bernilai False", "Saat kondisi bernilai True", "Setiap kali perulangan selesai", "Hanya saat program error"],
          correct: 1,
          explanation: "Blok instruksi IF hanya dieksekusi jika evaluasi kondisi menghasilkan nilai True."
        }
      },
      {
        id: "4.2",
        title: "2. Visualisasi Percabangan dalam Flowchart",
        content: (
          <div className="rounded-3xl bg-stone-900 p-6 text-white shadow-md flex justify-center">
            <svg width="100%" height="200" viewBox="0 0 500 200" className="max-w-md">
              <polygon points="250,20 350,70 250,120 150,70" fill="#F43F5E" />
              <text x="250" y="75" fill="#FFF" textAnchor="middle" fontWeight="bold" fontSize="12">Nilai &gt;= 75 ?</text>
              <line x1="350" y1="70" x2="420" y2="70" stroke="#10B981" strokeWidth="3" />
              <text x="385" y="60" fill="#10B981" fontWeight="bold" fontSize="11">YA</text>
              <rect x="370" y="110" width="100" height="40" fill="#10B981" rx="8" />
              <text x="420" y="134" fill="#FFF" textAnchor="middle" fontSize="11" fontWeight="bold">Cetak LULUS</text>
              <line x1="420" y1="70" x2="420" y2="110" stroke="#10B981" strokeWidth="3" />
              <line x1="150" y1="70" x2="80" y2="70" stroke="#EF4444" strokeWidth="3" />
              <text x="105" y="60" fill="#EF4444" fontWeight="bold" fontSize="11">TIDAK</text>
              <rect x="30" y="110" width="100" height="40" fill="#EF4444" rx="8" />
              <text x="80" y="134" fill="#FFF" textAnchor="middle" fontSize="11" fontWeight="bold">Cetak REMIDI</text>
              <line x1="80" y1="70" x2="80" y2="110" stroke="#EF4444" strokeWidth="3" />
            </svg>
          </div>
        ),
        question: {
          q: "Berapa banyak pilihan jalan cabang keluaran minimal yang berasal dari simbol Decision?",
          options: ["1 jalan", "2 jalan (Ya & Tidak)", "3 jalan", "4 jalan"],
          correct: 1,
          explanation: "Simbol Decision bercabang minimal 2 arah (Ya & Tidak)."
        }
      }
    ]
  },
  {
    n: "05",
    title: "Perulangan Terstruktur (Looping)",
    detail: "Mekanisme mengulang sekumpulan instruksi otomatis hingga kondisi terpenuhi.",
    duration: "18 menit",
    subTopics: [
      {
        id: "5.1",
        title: "1. Mengapa Perulangan Dibutuhkan?",
        content: (
          <p className="text-sm leading-relaxed text-stone-600">
            Perulangan digunakan untuk menjalankan baris instruksi yang sama berulang kali secara efisien.
          </p>
        ),
        question: {
          q: "Apa keuntungan utama memakai looping untuk mencetak kalimat 'Halo' 100 kali?",
          options: ["Ukuran layar bertambah besar", "Cukup menulis 1 baris perintah perulangan", "Kecepatan internet meningkat", "Menghemat RAM server"],
          correct: 1,
          explanation: "Looping membuat penulisan instruksi berulang menjadi sangat ringkas."
        }
      },
      {
        id: "5.2",
        title: "2. Struktur Siklus Looping",
        content: (
          <div className="rounded-3xl bg-stone-100 p-6 border border-stone-200 flex flex-col items-center">
            <span className="text-xs font-bold text-orange-600 mb-3">ILUSTRASI SIKLUS LOOPING</span>
            <svg width="280" height="150" viewBox="0 0 280 150">
              <rect x="90" y="10" width="100" height="40" fill="#3B82F6" rx="10" />
              <text x="140" y="34" fill="#FFF" textAnchor="middle" fontSize="11" fontWeight="bold">Hitung +1</text>
              <polygon points="140,70 190,100 140,130 90,100" fill="#F59E0B" />
              <text x="140" y="104" fill="#FFF" textAnchor="middle" fontSize="9" fontWeight="bold">Hitung &lt; 10?</text>
              <path d="M 90 100 C 30 100, 30 30, 90 30" fill="none" stroke="#3B82F6" strokeWidth="3" />
              <text x="50" y="70" fill="#3B82F6" fontSize="10" fontWeight="bold">YA</text>
            </svg>
          </div>
        ),
        question: {
          q: "Komponen apa yang berfungsi untuk memperbarui penambah nilai putaran pada perulangan?",
          options: ["Inisialisasi", "Kondisi Henti", "Increment / Decrement", "Terminator"],
          correct: 2,
          explanation: "Increment/Decrement bertugas mengubah nilai variabel pencatat perulangan."
        }
      }
    ]
  },
  {
    n: "06",
    title: "Array (Larik) & Struktur Data Majemuk",
    detail: "Menyimpan banyak nilai data dalam satu variabel menggunakan indeks bernomor.",
    duration: "20 menit",
    subTopics: [
      {
        id: "6.1",
        title: "1. Konsep Dasar Array",
        content: (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-stone-600">
              Array (larik) adalah struktur data yang mampu menyimpan banyak nilai sekaligus dalam satu nama variabel tunggal dengan nomor urut indeks mulai dari <code className="bg-stone-100 px-1 rounded font-bold">0</code>.
            </p>
            <div className="bg-stone-100 p-4 rounded-2xl border border-stone-200 text-xs font-mono">
              <span className="text-orange-600 font-bold block mb-1">Contoh Array:</span>
              <span>string[] buah = ["Apel", "Jeruk", "Mangga"];</span>
            </div>
          </div>
        ),
        question: {
          q: "Apa perbedaan antara variabel biasa dan array?",
          options: ["Array hanya di flowchart", "Variabel biasa menyimpan jutaan data", "Array menampung banyak kumpulan nilai dalam satu wadah", "Variabel biasa tidak punya tipe data"],
          correct: 2,
          explanation: "Array menyimpan banyak nilai sekaligus."
        }
      },
      {
        id: "6.2",
        title: "2. Ilustrasi Indeks Array di Memori",
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-100 text-stone-800">
                  <th className="border border-stone-200 p-2.5">Indeks</th>
                  <th className="border border-stone-200 p-2.5">0</th>
                  <th className="border border-stone-200 p-2.5">1</th>
                  <th className="border border-stone-200 p-2.5">2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-stone-200 p-2.5 font-bold bg-stone-50">Nilai</td>
                  <td className="border border-stone-200 p-2.5 font-mono text-orange-600 font-bold">80</td>
                  <td className="border border-stone-200 p-2.5 font-mono text-orange-600 font-bold">95</td>
                  <td className="border border-stone-200 p-2.5 font-mono text-orange-600 font-bold">70</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        question: {
          q: "Jika terdapat array `angka = [10, 20, 30]`, berapa nilai dari `angka[1]`?",
          options: ["10", "20", "30", "0"],
          correct: 1,
          explanation: "Indeks 1 bernilai 20."
        }
      }
    ]
  }
];

function Materi({ setScreen, userName, completedLessons, setSelectedLesson }: { setScreen: (s: Screen) => void; userName: string; completedLessons: number; setSelectedLesson: (idx: number) => void }) {
  const percent = (completedLessons / 6) * 100;

  return (
    <AppShell active="materi" setScreen={setScreen} userName={userName}>
      <main className="mx-auto max-w-7xl px-5 pb-28 pt-8 lg:px-8">
        <button onClick={() => setScreen("dashboard")} className="mb-6 flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-stone-900"><Icon name="arrow" /> Kembali ke beranda</button>
        <section className="grid overflow-hidden rounded-[2rem] bg-stone-900 text-white shadow-xl lg:grid-cols-[1.3fr_0.7fr]">
          <div className="p-7 sm:p-10">
            <div className="text-xs font-extrabold tracking-widest text-orange-400">MODUL PEMBELAJARAN (+50 XP/Modul)</div>
            <div className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Fundamental Algoritma & Flowchart</div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-400">Selesaikan bacaan modul untuk mendapatkan XP dan membuka materi berikutnya.</p>
            <div className="mt-7 max-w-xl"><div className="mb-2 flex justify-between text-xs font-bold"><span>{completedLessons} dari 6 materi dipelajari</span><span>{percent}%</span></div><ProgressBar value={percent} dark /></div>
          </div>
          <div className="flex items-center justify-center bg-orange-500/20 p-8"><div className="relative grid size-44 place-items-center rounded-full border border-white/10"><div className="grid size-20 place-items-center rounded-3xl bg-orange-500 text-white shadow-lg"><Icon name="book" size={36} /></div></div></div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
          <section className="space-y-4">
            {lessonsData.map((item, index) => {
              const isDone = index < completedLessons;
              const isActive = index === completedLessons;
              const isUnlocked = index <= completedLessons;

              return (
                <article key={item.n} className={`flex flex-col gap-5 rounded-3xl border bg-white p-6 sm:flex-row sm:items-center ${isActive ? "border-orange-500 shadow-md ring-2 ring-orange-500/10" : "border-stone-200"}`}>
                  <div className={`grid size-14 shrink-0 place-items-center rounded-2xl font-display text-lg font-extrabold ${isDone ? "bg-emerald-100 text-emerald-600" : isActive ? "bg-orange-500 text-white" : "bg-stone-100 text-stone-400"}`}>
                    {isDone ? <Icon name="check" /> : isUnlocked ? item.n : <Icon name="lock" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-lg font-extrabold text-stone-900">{item.title}</div>
                    <p className="mt-1 text-sm text-stone-500">{item.detail}</p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-stone-400"><Icon name="clock" size={15} /> Estimasi {item.duration} • {item.subTopics.length} Sub-bab</div>
                  </div>
                  {isUnlocked ? (
                    <Button onClick={() => { setSelectedLesson(index); setScreen("materi-detail"); }}>
                      Baca Materi <Icon name="chevron" size={18} />
                    </Button>
                  ) : (
                    <span className="px-4 text-sm font-bold text-stone-400">Terkunci</span>
                  )}
                </article>
              );
            })}
          </section>
          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm border border-stone-200">
            <div className="grid size-12 place-items-center rounded-2xl bg-orange-100 text-orange-600"><Icon name="book" /></div>
            <div className="mt-5 font-display text-lg font-extrabold text-stone-900">Status Pembelajaran</div>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">Selesaikan bacaan modul secara berurutan untuk membuka materi berikutnya.</p>
            <div className="mt-5"><div className="mb-2 flex justify-between text-xs font-bold"><span>{completedLessons} / 6 Modul</span><span>{percent}%</span></div><ProgressBar value={percent} /></div>
          </aside>
        </div>
      </main>
    </AppShell>
  );
}

function MateriDetail({ setScreen, userName, lessonIndex, completedLessons, onCompleteLesson }: { setScreen: (s: Screen) => void; userName: string; lessonIndex: number; completedLessons: number; onCompleteLesson: (index: number) => void }) {
  const lesson = lessonsData[lessonIndex] || lessonsData[0];
  const isAlreadyCompleted = lessonIndex < completedLessons;

  const [activeTab, setActiveTab] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});

  const currentSub = lesson.subTopics[activeTab];
  const currentSubQuestion = currentSub.question;

  const currentSelectedOpt = selectedAnswers[activeTab];
  const isSubmitted = submittedAnswers[activeTab] === true;
  
  const isCurrentSubCorrect = isSubmitted && currentSelectedOpt !== undefined && currentSubQuestion && currentSelectedOpt === currentSubQuestion.correct;

  const totalSubTopics = lesson.subTopics.length;
  const correctSubTopicsCount = lesson.subTopics.filter((sub, idx) => {
    const isSubSubmitted = submittedAnswers[idx] === true;
    const selectedOpt = selectedAnswers[idx];
    return isSubSubmitted && sub.question && selectedOpt === sub.question.correct;
  }).length;

  const allSubTopicsCorrect = totalSubTopics > 0 && correctSubTopicsCount === totalSubTopics;

  const handleSelectAnswer = (optIdx: number) => {
    if (isSubmitted) {
      setSubmittedAnswers((prev) => ({ ...prev, [activeTab]: false }));
    }
    setSelectedAnswers((prev) => ({ ...prev, [activeTab]: optIdx }));
  };

  const handleSubmitAnswer = () => {
    if (currentSelectedOpt === undefined) {
      alert("Pilih salah satu jawaban terlebih dahulu!");
      return;
    }
    setSubmittedAnswers((prev) => ({ ...prev, [activeTab]: true }));
  };

  return (
    <AppShell active="materi" setScreen={setScreen} userName={userName}>
      <main className="mx-auto max-w-4xl px-5 pb-28 pt-8 lg:px-8">
        <button onClick={() => setScreen("materi")} className="mb-6 flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-stone-900"><Icon name="arrow" /> Kembali ke daftar materi</button>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3 text-xs font-extrabold text-orange-600 mb-2">
            <span className="rounded-lg bg-orange-50 px-3 py-1">MODUL {lesson.n} (+50 XP)</span>
            <span><Icon name="clock" size={14} /> {lesson.duration}</span>
            <span className="ml-auto rounded-lg bg-stone-100 px-3 py-1 text-stone-800 font-bold">
              Soal Dijawab: {correctSubTopicsCount}/{totalSubTopics}
            </span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-stone-900 mb-6">{lesson.title}</h1>

          <div className="mb-8 flex flex-wrap gap-2 border-b border-stone-200 pb-4">
            {lesson.subTopics.map((sub, idx) => {
              const answered = submittedAnswers[idx];
              const selectedOpt = selectedAnswers[idx];
              const isCorrect = answered && sub.question && selectedOpt === sub.question.correct;

              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${activeTab === idx ? "bg-orange-500 text-white shadow-sm" : "bg-stone-100 text-stone-500 hover:text-stone-900"}`}
                >
                  {sub.title}
                  {isCorrect && <span className="text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded font-extrabold">✓</span>}
                </button>
              );
            })}
          </div>

          <div className="mb-10 min-h-[160px]">
            <h3 className="text-xl font-extrabold text-stone-900 mb-3">{currentSub.title}</h3>
            {currentSub.content}
          </div>

          {currentSubQuestion && (
            <div className="mb-8 rounded-3xl border border-stone-200 bg-stone-50 p-6">
              <div className="flex items-center gap-2 text-xs font-extrabold text-orange-600 mb-2">
                <Icon name="spark" size={16} /> LATIHAN SOAL PEMAHAMAN ({currentSub.title})
              </div>
              <div className="font-display font-extrabold text-stone-900 text-base mb-4">{currentSubQuestion.q}</div>
              <div className="space-y-2 mb-4">
                {currentSubQuestion.options.map((opt, oIdx) => {
                  const isSelected = currentSelectedOpt === oIdx;
                  let btnStyle = "border-stone-200 bg-white hover:border-orange-500 text-stone-800";

                  if (isSubmitted) {
                    if (isCurrentSubCorrect && isSelected) {
                      btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-700 font-extrabold";
                    } else if (!isCurrentSubCorrect && isSelected) {
                      btnStyle = "border-rose-500 bg-rose-50 text-rose-700 font-extrabold";
                    } else {
                      btnStyle = "border-stone-200 bg-white text-stone-400";
                    }
                  } else if (isSelected) {
                    btnStyle = "border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-500/20";
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectAnswer(oIdx)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition font-bold text-xs ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {!isSubmitted ? (
                <div className="mt-4 flex justify-end">
                  <Button variant="dark" onClick={handleSubmitAnswer} disabled={currentSelectedOpt === undefined}>
                    Submit Jawaban
                  </Button>
                </div>
              ) : (
                <div className={`p-4 rounded-2xl text-xs font-medium ${isCurrentSubCorrect ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"}`}>
                  {isCurrentSubCorrect ? (
                    <>
                      <strong>Jawaban Tepat! 🎉</strong>
                      <p className="mt-1">{currentSubQuestion.explanation}</p>
                    </>
                  ) : (
                    <>
                      <strong>Jawaban kamu belum tepat! ❌</strong>
                      <p className="mt-1">Silakan klik opsi pilihan lain di atas lalu Submit Jawaban kembali.</p>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="pt-6 border-t border-stone-200 flex justify-between items-center">
            <Button variant="outline" onClick={() => setScreen("materi")}>Tutup</Button>

            {isAlreadyCompleted ? (
              <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50" onClick={() => { onCompleteLesson(lessonIndex); setScreen("materi"); }}>
                <Icon name="check" size={18} /> Materi Sudah Selesai
              </Button>
            ) : (
              <div className="flex flex-col items-end gap-1">
                <Button 
                  disabled={!allSubTopicsCorrect} 
                  onClick={() => { 
                    if (allSubTopicsCorrect) {
                      onCompleteLesson(lessonIndex); 
                      setScreen("materi"); 
                    }
                  }}
                >
                  Selesai Membaca & Jawab Benar Semua (+50 XP) <Icon name="check" size={18} />
                </Button>
                {!allSubTopicsCorrect && (
                  <span className="text-[11px] font-bold text-amber-600">
                    Kamu harus menjawab BENAR semua soal ({correctSubTopicsCount}/{totalSubTopics} selesai) di setiap sub-bab!
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </AppShell>
  );
}

function LatihanHub({ setScreen, userName }: { setScreen: (s: Screen) => void; userName: string }) {
  return (
    <AppShell active="latihan-hub" setScreen={setScreen} userName={userName}>
      <main className="mx-auto max-w-5xl px-5 pb-28 pt-8 lg:px-8">
        <div>
          <div className="font-display text-3xl font-extrabold text-stone-900">Pusat Latihan Interaktif</div>
          <p className="mt-2 text-stone-500">Pilih jenis latihan di bawah ini untuk menguji pemahaman logika dan algoritma Anda.</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
            <div>
              <div className="grid size-14 place-items-center rounded-2xl bg-orange-100 text-orange-600 mb-5"><Icon name="spark" size={28} /></div>
              <span className="text-xs font-bold text-orange-600 tracking-widest">DIAGRAM FLOWCHART (4 TANTANGAN)</span>
              <h2 className="font-display text-2xl font-extrabold text-stone-900 mt-2">Susun Flowchart</h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">Latih logika dengan menyusun simbol diagram alur secara runtut dan terhubung dengan garis panah.</p>
            </div>
            <div className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-bold text-orange-600">+150 XP</span>
              <Button onClick={() => setScreen("challenge")}>Mulai Challenge <Icon name="chevron" /></Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
            <div>
              <div className="grid size-14 place-items-center rounded-2xl bg-amber-100 text-amber-600 mb-5"><Icon name="star" size={28} /></div>
              <span className="text-xs font-bold text-orange-600 tracking-widest">EVALUASI MATERI (6 KUIS)</span>
              <h2 className="font-display text-2xl font-extrabold text-stone-900 mt-2">Kuis Pilihan Ganda</h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">Uji pengetahuan Anda melalui serangkaian pertanyaan kuis dari seluruh modul.</p>
            </div>
            <div className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-bold text-orange-600">+100 XP</span>
              <Button onClick={() => setScreen("quiz")}>Mulai Kuis <Icon name="chevron" /></Button>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

const flowchartChallenges = [
  {
    title: "Soal 1: Menentukan Bilangan Ganjil / Genap (Materi Percabangan)",
    correct: ["Mulai", "Masukkan sebuah bilangan", "Apakah bilangan habis dibagi 2?", "Tampilkan hasil", "Selesai"],
    shuffled: ["Tampilkan hasil", "Masukkan sebuah bilangan", "Mulai", "Apakah bilangan habis dibagi 2?", "Selesai"],
    shapes: ["pill", "parallelogram", "diamond", "parallelogram", "pill"]
  },
  {
    title: "Soal 2: Menentukan Kelulusan Nilai Ujian (Materi Percabangan)",
    correct: ["Mulai", "Input nilai ujian", "Apakah nilai >= 75?", "Cetak 'Lulus'", "Selesai"],
    shuffled: ["Apakah nilai >= 75?", "Mulai", "Input nilai ujian", "Selesai", "Cetak 'Lulus'"],
    shapes: ["pill", "parallelogram", "diamond", "rectangle", "pill"]
  },
  {
    title: "Soal 3: Perulangan Mendorong Mobil (Materi Looping)",
    correct: ["Mulai", "Dorong mobil sejauh 1 meter", "Apakah mobil sudah menyala?", "Cetak 'Selesai Berhasil'", "Selesai"],
    shuffled: ["Apakah mobil sudah menyala?", "Mulai", "Selesai", "Dorong mobil sejauh 1 meter", "Cetak 'Selesai Berhasil'"],
    shapes: ["pill", "rectangle", "diamond", "parallelogram", "pill"]
  },
  {
    title: "Soal 4: Mencetak Elemen Array Buah (Materi Array & Loop)",
    correct: ["Mulai", "Set indeks i = 0", "Cetak buah[i]", "Tambahkan i + 1", "Selesai"],
    shuffled: ["Tambahkan i + 1", "Mulai", "Cetak buah[i]", "Set indeks i = 0", "Selesai"],
    shapes: ["pill", "rectangle", "parallelogram", "rectangle", "pill"]
  }
];

function Challenge({ setScreen, onComplete }: { setScreen: (s: Screen) => void; onComplete: (score: number, xp: number, hasNext: boolean, type: "challenge" | "quiz") => void }) {
  const [activeStage, setActiveStage] = useState(0);
  const currentChallenge = flowchartChallenges[activeStage];
  
  const [stagesBlocks, setStagesBlocks] = useState<Record<number, string[]>>({
    0: flowchartChallenges[0].shuffled,
    1: flowchartChallenges[1].shuffled,
    2: flowchartChallenges[2].shuffled,
    3: flowchartChallenges[3].shuffled,
  });

  const blocks = stagesBlocks[activeStage];
  const [selected, setSelected] = useState<number | null>(null);

  const choose = (index: number) => {
    if (selected === null) return setSelected(index);
    const next = [...blocks];
    [next[selected], next[index]] = [next[index], next[selected]];
    setStagesBlocks((prev) => ({ ...prev, [activeStage]: next }));
    setSelected(null);
  };

  const handleSubmit = () => {
    const isCorrect = blocks.every((val, i) => val === currentChallenge.correct[i]);
    if (!isCorrect) {
      alert("Urutan flowchart masih SALAH! Perhatikan alur hubungan antar simbol dari atas ke bawah.");
      return;
    }

    const hasMore = activeStage < flowchartChallenges.length - 1;
    if (hasMore) {
      alert(`Hebat! Soal ${activeStage + 1} selesai (+150 XP). Lanjut ke soal berikutnya.`);
      setActiveStage(activeStage + 1);
      onComplete(90, 150, true, "challenge");
    } else {
      alert("Luar biasa! Semua tantangan flowchart berhasil diselesaikan.");
      onComplete(95, 150, false, "challenge");
      setScreen("score");
    }
  };

  const handlePrev = () => {
    if (activeStage > 0) {
      setActiveStage(activeStage - 1);
      setSelected(null);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 pb-10">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <button onClick={() => setScreen("latihan-hub")} className="flex items-center gap-2 font-bold text-stone-500 hover:text-stone-900"><Icon name="close" /> Keluar</button>
          <div className="text-center"><div className="text-xs font-extrabold text-orange-600">TANTANGAN {activeStage + 1} dari {flowchartChallenges.length}</div><div className="mt-1 font-display font-extrabold text-stone-900">{currentChallenge.title}</div></div>
          <div className="flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 text-sm font-extrabold text-orange-600"><Icon name="spark" size={17} /> 150 XP</div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-5 pt-8 lg:px-8">
        <div className="mb-7 flex items-start gap-4 rounded-3xl bg-white p-5 shadow-sm border border-stone-200">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-600 font-extrabold">?</div>
          <div><div className="font-display text-lg font-extrabold text-stone-900">Susun Simbol Flowchart Berurutan</div><p className="mt-1 text-sm leading-relaxed text-stone-500">Klik kotak simbol pertama lalu klik simbol kedua untuk menukar posisinya hingga terhubung sempurna dengan garis panah ke bawah.</p></div>
        </div>

        <div className="relative flex flex-col items-center rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm space-y-4">
          {blocks.map((block, i) => {
            const shapeType = currentChallenge.shapes[i];
            let shapeStyle = "rounded-2xl px-6 py-4";
            if (shapeType === "pill") shapeStyle = "rounded-full px-8 py-3 bg-orange-100 border-orange-300 text-orange-900";
            if (shapeType === "parallelogram") shapeStyle = "skew-x-[-10deg] rounded-xl px-8 py-3 bg-amber-100 border-amber-300 text-amber-900";
            if (shapeType === "diamond") shapeStyle = "rotate-0 rounded-xl px-8 py-4 bg-rose-100 border-rose-300 text-rose-900 text-center";

            return (
              <div key={`${block}-${i}`} className="flex flex-col items-center w-full">
                <button 
                  onClick={() => choose(i)} 
                  className={`w-full max-w-md border-2 font-bold text-sm transition shadow-sm flex items-center justify-between p-4 ${selected === i ? "border-orange-500 bg-orange-50 ring-4 ring-orange-500/10 text-orange-900" : "border-stone-200 bg-stone-50 hover:border-orange-300 text-stone-800"} ${shapeStyle}`}
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-xs font-extrabold text-stone-500 shadow-sm">{i + 1}</span>
                  <span className="flex-1 text-center">{block}</span>
                  <span className="text-[10px] uppercase font-bold text-stone-400 bg-white/60 px-2 py-1 rounded">{shapeType}</span>
                </button>
                {i < blocks.length - 1 && (
                  <div className="flex flex-col items-center my-2 text-orange-500">
                    <div className="h-6 w-0.5 bg-orange-400"></div>
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-orange-500"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-7 flex justify-between items-center">
          {activeStage > 0 ? (
            <Button variant="outline" onClick={handlePrev}>
              <Icon name="arrow" size={16} /> Kembali
            </Button>
          ) : (
            <div></div>
          )}
          <Button onClick={handleSubmit}>
            {activeStage === flowchartChallenges.length - 1 ? "Selesai" : "Kirim Jawaban"} <Icon name="check" />
          </Button>
        </div>
      </main>
    </main>
  );
}

const quizQuestions = [
  {
    q: "Modul 1: Sifat dasar algoritma yang menuntut instruksi ditulis secara jelas dan tidak menimbulkan makna ganda (ambigu) dinamakan...",
    options: ["Finiteness", "Definiteness", "Generality", "Variabilitas"],
    correct: 1
  },
  {
    q: "Modul 2: Simbol apakah yang digunakan untuk menyatakan awal (start) dan akhir (stop) pada diagram flowchart?",
    options: ["Persegi panjang (Process)", "Kapsul / Oval (Terminator)", "Belah ketupat (Decision)", "Jajar genjang (Input/Output)"],
    correct: 1
  },
  {
    q: "Modul 3: Tipe data apakah yang digunakan untuk menyimpan nilai angka pecahan/desimal seperti 3.14?",
    options: ["int", "string", "float / double", "boolean"],
    correct: 2
  },
  {
    q: "Modul 4: Simbol berbentuk belah ketupat (Decision) dalam flowchart biasanya digunakan untuk menyatakan...",
    options: ["Proses perhitungan matematika", "Pengambilan keputusan bercabang berdasarkan kondisi", "Mencetak hasil ke layar monitor", "Penyimpanan data database"],
    correct: 1
  },
  {
    q: "Modul 5: Manakah dari pilihan berikut yang merupakan resiko utama jika struktur perulangan (looping) tidak memiliki kondisi henti?",
    options: ["Program berhenti otomatis", "Error infinite loop", "Data berubah menjadi array", "Program berjalan lebih cepat"],
    correct: 1
  },
  {
    q: "Modul 6: Jika diketahui sebuah array `int[] nilai = {80, 90, 100}`, berapakah nilai dari `nilai[0]`?",
    options: ["80", "90", "100", "0"],
    correct: 0
  }
];

function Quiz({ setScreen, onComplete }: { setScreen: (s: Screen) => void; onComplete: (score: number, xp: number, hasNext: boolean, type: "challenge" | "quiz") => void }) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [correctCount, setCorrectCount] = useState(0);

  const q = quizQuestions[currentQuizIndex];
  const currentSelectedOpt = userAnswers[currentQuizIndex] ?? null;

  const handleSelectOption = (idx: number) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuizIndex]: idx }));
  };

  const handleNext = () => {
    if (currentSelectedOpt === null) {
      alert("Pilih salah satu jawaban terlebih dahulu!");
      return;
    }

    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      let finalCorrect = 0;
      quizQuestions.forEach((item, idx) => {
        if (userAnswers[idx] === item.correct) {
          finalCorrect += 1;
        }
      });
      setCorrectCount(finalCorrect);
      const finalScore = Math.round((finalCorrect / quizQuestions.length) * 100);
      alert(`Kuis Selesai! Nilai akhir kamu: ${finalScore}`);
      onComplete(finalScore, 100, false, "quiz");
      setScreen("score");
    }
  };

  const handlePrev = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 pb-10">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <button onClick={() => setScreen("latihan-hub")} className="flex items-center gap-2 font-bold text-stone-500 hover:text-stone-900"><Icon name="close" /> Keluar</button>
          <div className="text-center"><div className="text-xs font-extrabold text-orange-600">KUIS EVALUASI ({currentQuizIndex + 1}/{quizQuestions.length})</div><div className="mt-1 font-display font-extrabold text-stone-900">Evaluasi Pemahaman Pemrograman</div></div>
          <div className="flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 text-sm font-extrabold text-orange-600"><Icon name="spark" size={17} /> 100 XP</div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 pt-8 lg:px-8">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm">
          <div className="font-display text-xl font-extrabold text-stone-900">{q.q}</div>
          <div className="mt-6 space-y-3">
            {q.options.map((opt, idx) => (
              <button 
                key={opt} 
                onClick={() => handleSelectOption(idx)} 
                className={`w-full text-left p-4 rounded-2xl border transition font-bold text-sm ${currentSelectedOpt === idx ? "border-orange-500 bg-orange-50 text-orange-900 ring-2 ring-orange-500/20" : "border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100"}`}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            {currentQuizIndex > 0 ? (
              <Button variant="outline" onClick={handlePrev}>
                <Icon name="arrow" size={16} /> Kembali
              </Button>
            ) : (
              <div></div>
            )}
            <Button onClick={handleNext}>
              {currentQuizIndex === quizQuestions.length - 1 ? "Selesai" : "Selanjutnya"} <Icon name="chevron" />
            </Button>
          </div>
        </div>
      </main>
    </main>
  );
}

function Score({ setScreen, userName, xp, score, hasNext }: { setScreen: (s: Screen) => void; userName: string; xp: number; score: number; hasNext: boolean }) {
  return (
    <main className="min-h-screen bg-stone-50 p-5">
      <div className="mx-auto max-w-4xl py-6 md:py-12">
        <div className="text-center"><Logo /><div className="mx-auto mt-10 grid size-28 place-items-center rounded-full bg-orange-500 shadow-xl text-white"><Icon name="trophy" size={52} /></div><div className="mt-7 text-sm font-extrabold tracking-widest text-orange-600">LATIHAN SELESAI</div><div className="mt-2 font-display text-4xl font-extrabold tracking-tight text-stone-900">Luar biasa, {userName}!</div><p className="mx-auto mt-3 max-w-lg text-stone-500">Hasil latihan dan XP berhasil ditambahkan ke profil Anda.</p></div>
        <section className="mt-9 grid overflow-hidden rounded-[2rem] bg-stone-900 text-white shadow-xl sm:grid-cols-3">
          <div className="p-7 text-center sm:border-r sm:border-white/10"><div className="text-xs font-bold text-stone-400">NILAI</div><div className="mt-2 font-display text-4xl font-extrabold text-orange-400">{score}</div></div>
          <div className="border-y border-white/10 p-7 text-center sm:border-x-0 sm:border-y-0 sm:border-r"><div className="text-xs font-bold text-stone-400">TOTAL XP AKUMULASI</div><div className="mt-2 font-display text-4xl font-extrabold text-amber-300">+{xp}</div></div>
          <div className="p-7 text-center"><div className="text-xs font-bold text-stone-400">AKURASI</div><div className="mt-2 font-display text-4xl font-extrabold text-emerald-400">{score}%</div></div>
        </section>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <Button variant="outline" onClick={() => setScreen("dashboard")}>Ke Beranda</Button>
          <Button variant="outline" onClick={() => setScreen("leaderboard")}><Icon name="trophy" /> Peringkat</Button>
          {hasNext ? (
            <Button onClick={() => setScreen("challenge")}>Soal Berikutnya <Icon name="chevron" /></Button>
          ) : (
            <Button onClick={() => setScreen("dashboard")}>Kembali ke Beranda <Icon name="check" /></Button>
          )}
        </div>
      </div>
    </main>
  );
}

function Leaderboard({ setScreen, userName, xp, completedLessons, hasChallengeDone, hasQuizDone, lastScore }: { setScreen: (s: Screen) => void; userName: string; xp: number; completedLessons: number; hasChallengeDone: boolean; hasQuizDone: boolean; lastScore: number }) {
  const [tab, setTab] = useState<"rank" | "badge">("rank");

  const baseRanking = [
    { pos: "1", name: "Nadia P.", initials: "NP", rankXp: 2840 },
    { pos: "2", name: "Arka D.", initials: "AD", rankXp: 2650 },
    { pos: "3", name: "Salsa M.", initials: "SM", rankXp: 2410 },
    { pos: "4", name: "Bima K.", initials: "BK", rankXp: 1320 },
    { pos: "5", name: userName || "Pengguna", initials: getInitials(userName), rankXp: xp },
  ].sort((a, b) => b.rankXp - a.rankXp);

  const achievements = [
    { icon: "award" as IconName, title: "Flowchart Rookie", desc: "Berhasil menyelesaikan tantangan susun flowchart pertama.", color: "bg-orange-100 text-orange-600", active: hasChallengeDone },
    { icon: "star" as IconName, title: "Quiz Master", desc: "Berhasil menyelesaikan sesi kuis evaluasi.", color: "bg-amber-100 text-amber-600", active: hasQuizDone },
    { icon: "medal" as IconName, title: "Master Logika", desc: "Membaca dan menyelesaikan seluruh (6) modul materi pembelajaran.", color: "bg-emerald-100 text-emerald-600", active: completedLessons >= 6 },
    { icon: "trophy" as IconName, title: "Perfect Score", desc: "Meraih nilai sempurna 100 pada latihan evaluasi.", color: "bg-sky-100 text-sky-600", active: lastScore === 100 },
    { icon: "target" as IconName, title: "Top Ten Leaderboard", desc: "Masuk dalam 10 besar papan peringkat mingguan.", color: "bg-purple-100 text-purple-600", active: true },
  ];

  return (
    <AppShell active="leaderboard" setScreen={setScreen} userName={userName}>
      <main className="mx-auto max-w-5xl px-5 pb-28 pt-8 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="font-display text-3xl font-extrabold text-stone-900">Pencapaian & Peringkat</div>
            <p className="mt-2 text-stone-500">Bandingkan total XP dan koleksi badge hasil belajarmu.</p>
          </div>
          <div className="flex rounded-2xl bg-white p-1.5 shadow-sm border border-stone-200">
            <button onClick={() => setTab("rank")} className={`rounded-xl px-4 py-2 text-sm font-bold ${tab === "rank" ? "bg-stone-900 text-white" : "text-stone-500"}`}>Leaderboard</button>
            <button onClick={() => setTab("badge")} className={`rounded-xl px-4 py-2 text-sm font-bold ${tab === "badge" ? "bg-stone-900 text-white" : "text-stone-500"}`}>Achievement</button>
          </div>
        </div>

        {tab === "rank" ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_18rem]">
            <section className="rounded-[2rem] bg-white p-5 shadow-sm sm:p-7 border border-stone-200">
              <div className="mb-5 flex justify-between"><div className="font-display text-xl font-extrabold text-stone-900">Peringkat Mingguan</div><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">Aktif</span></div>
              <div className="space-y-2">
                {baseRanking.map((item, idx) => {
                  const isUser = item.name === (userName || "Pengguna");
                  return (
                    <div key={item.name} className={`flex items-center gap-4 rounded-2xl p-3.5 ${isUser ? "bg-orange-500 text-white shadow-sm" : "bg-stone-50"}`}>
                      <span className={`w-7 text-center font-display font-extrabold ${idx === 0 ? "text-amber-300" : ""}`}>{idx + 1}</span>
                      <span className={`grid size-10 place-items-center rounded-full text-xs font-extrabold ${isUser ? "bg-white text-orange-600" : "bg-orange-100 text-orange-700"}`}>{item.initials}</span>
                      <span className="flex-1 font-bold">{item.name}{isUser && <small className="ml-2 opacity-80">(Kamu)</small>}</span>
                      <span className="font-extrabold">{item.rankXp.toLocaleString("id-ID")} <small className="opacity-70">XP</small></span>
                    </div>
                  );
                })}
              </div>
            </section>
            <aside className="h-fit rounded-[2rem] bg-orange-500 p-6 text-white shadow-lg">
              <Icon name="trophy" size={34} />
              <div className="mt-5 font-display text-xl font-extrabold">Terus Tingkatkan XP!</div>
              <p className="mt-2 text-sm leading-relaxed text-white/90">Selesaikan materi dan challenge untuk meroketkan posisimu.</p>
            </aside>
          </div>
        ) : (
          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((item) => (
              <article key={item.title} className={`rounded-3xl border border-stone-200 bg-white p-6 transition ${item.active ? "shadow-sm border-orange-500/30" : "opacity-45 grayscale"}`}>
                <div className={`grid size-14 place-items-center rounded-2xl ${item.color}`}><Icon name={item.icon} size={28} /></div>
                <div className="mt-5 font-display text-lg font-extrabold text-stone-900">{item.title}</div>
                <p className="mt-1 text-sm text-stone-500">{item.desc}</p>
                <div className="mt-4 text-xs font-extrabold text-orange-600">{item.active ? "DIPEROLEH" : "TERKUNCI"}</div>
              </article>
            ))}
          </section>
        )}
      </main>
    </AppShell>
  );
}

function ProgressPage({ setScreen, userName, xp, completedLessons, score }: { setScreen: (s: Screen) => void; userName: string; xp: number; completedLessons: number; score: number }) {
  return (
    <AppShell active="progress" setScreen={setScreen} userName={userName}>
      <main className="mx-auto max-w-7xl px-5 pb-28 pt-8 lg:px-8">
        <div><div className="font-display text-3xl font-extrabold text-stone-900">Progress Belajar</div><p className="mt-2 text-stone-500">Pantau perkembangan materi dan nilai belajarmu.</p></div>
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {[[`${Math.round((completedLessons / 6) * 100)}%`, "Materi tuntas", "book", "bg-orange-100 text-orange-600"], [String(score), "Nilai Terakhir", "star", "bg-amber-100 text-amber-600"], [String(xp), "Total XP", "spark", "bg-emerald-100 text-emerald-600"]].map(([value, label, icon, color]) => <div key={label} className="rounded-3xl bg-white p-5 shadow-sm border border-stone-200"><div className={`grid size-10 place-items-center rounded-xl ${color}`}><Icon name={icon as IconName} /></div><div className="mt-5 font-display text-2xl font-extrabold text-stone-900">{value}</div><div className="mt-1 text-sm text-stone-500">{label}</div></div>)}
        </section>
      </main>
    </AppShell>
  );
}

function Profile({ setScreen, userName, onUpdateUsername, xp, completedLessons }: { setScreen: (s: Screen) => void; userName: string; onUpdateUsername: (name: string) => Promise<void>; xp: number; completedLessons: number }) {
  const editProfile = async () => {
    const nextName = window.prompt("Masukkan username baru:", userName)?.trim();
    if (!nextName || nextName === userName) return;
    try {
      await onUpdateUsername(nextName);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Profil gagal diperbarui.");
    }
  };
  return (
    <AppShell active="profile" setScreen={setScreen} userName={userName}>
      <main className="mx-auto max-w-4xl px-5 pb-28 pt-10">
        <section className="overflow-hidden rounded-[2rem] bg-white shadow-xl border border-stone-200">
          <div className="h-36 bg-orange-500" />
          <div className="px-6 pb-8 sm:px-9">
            <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="grid size-24 place-items-center rounded-3xl border-4 border-white bg-stone-900 font-display text-2xl font-extrabold text-white">{getInitials(userName)}</div>
              <div className="flex-1"><div className="font-display text-2xl font-extrabold text-stone-900">{userName}</div><p className="text-sm text-stone-500">@{userName.toLowerCase().replace(/\s+/g, "")} · Pemula</p></div>
              <Button variant="outline" onClick={editProfile}>Edit Profil</Button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200"><strong className="block text-xl text-stone-900">{xp}</strong><span className="text-xs text-stone-500">Total XP</span></div>
              <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200"><strong className="block text-xl text-stone-900">{completedLessons}</strong><span className="text-xs text-stone-500">Materi tuntas</span></div>
              <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200"><strong className="block text-xl text-stone-900">{completedLessons >= 6 ? 2 : 1}</strong><span className="text-xs text-stone-500">Badge dimiliki</span></div>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("register");
  const [userName, setUserName] = useState("");
  const [xp, setXp] = useState(0);
  const [score, setScore] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [hasNextQuestion, setHasNextQuestion] = useState(false);

  const [hasChallengeDone, setHasChallengeDone] = useState(false);
  const [hasQuizDone, setHasQuizDone] = useState(false);
  const [badgeToast, setBadgeToast] = useState<string | null>(null);

  const applyProgress = (progress: UserProgress) => {
    setXp(progress.xp);
    setScore(progress.score);
    setCompletedLessons(progress.completedLessons);
    setHasChallengeDone(progress.hasChallengeDone);
    setHasQuizDone(progress.hasQuizDone);
  };

  const handleRegister = async (fullName: string, username: string, password: string) => {
    await flowPlayApi.register(fullName, username, password);
  };

  const handleLogin = async (username: string, password: string) => {
    const result = await flowPlayApi.login(username, password);
    setUserName(result.user.username);
    applyProgress(result.progress);
    setBadgeToast(null);
  };

  const handleUpdateUsername = async (username: string) => {
    const result = await flowPlayApi.updateUsername(username);
    setUserName(result.user.username);
  };

  useEffect(() => {
    if (!flowPlayApi.hasSession() || screen === "register" || screen === "login") return;
    const timer = window.setTimeout(() => {
      flowPlayApi.updateProgress({
        xp,
        score,
        completedLessons,
        hasChallengeDone,
        hasQuizDone,
      }).catch((error) => console.error("Gagal menyinkronkan progres:", error));
    }, 300);
    return () => window.clearTimeout(timer);
  }, [xp, score, completedLessons, hasChallengeDone, hasQuizDone, screen]);

  const handleCompleteLesson = (completedIndex: number) => {
    if (completedIndex === completedLessons) {
      setCompletedLessons((prev) => {
        const nextVal = Math.min(prev + 1, 6);
        if (nextVal >= 6 && prev < 6) {
          setBadgeToast("Master Logika");
        }
        return nextVal;
      });
      setXp((prev) => prev + 50);
    }
  };

  const handleChallengeComplete = (earnedScore: number, earnedXp: number, hasNext: boolean, type: "challenge" | "quiz") => {
    setScore(earnedScore);
    setXp((prev) => prev + earnedXp);
    setHasNextQuestion(hasNext);

    if (type === "challenge" && !hasChallengeDone) {
      setHasChallengeDone(true);
      setBadgeToast("Flowchart Rookie");
    }

    if (type === "quiz" && !hasQuizDone) {
      setHasQuizDone(true);
      setBadgeToast("Quiz Master");
    }

    if (earnedScore === 100) {
      setBadgeToast("Perfect Score");
    }
  };

  const activeUser = userName.trim() || "Pengguna";

  return (
    <>
      <NotificationToast badgeName={badgeToast} onClose={() => setBadgeToast(null)} />
      {screen === "register" && <Register setScreen={setScreen} userName={userName} setUserName={setUserName} onRegister={handleRegister} />}
      {screen === "login" && <Login setScreen={setScreen} userName={userName} setUserName={setUserName} onLogin={handleLogin} />}
      {screen === "dashboard" && <Dashboard setScreen={setScreen} userName={activeUser} xp={xp} completedLessons={completedLessons} />}
      {screen === "materi" && <Materi setScreen={setScreen} userName={activeUser} completedLessons={completedLessons} setSelectedLesson={setSelectedLesson} />}
      {screen === "materi-detail" && <MateriDetail setScreen={setScreen} userName={activeUser} lessonIndex={selectedLesson} completedLessons={completedLessons} onCompleteLesson={handleCompleteLesson} />}
      {screen === "latihan-hub" && <LatihanHub setScreen={setScreen} userName={activeUser} />}
      {screen === "challenge" && <Challenge setScreen={setScreen} onComplete={handleChallengeComplete} />}
      {screen === "quiz" && <Quiz setScreen={setScreen} onComplete={handleChallengeComplete} />}
      {screen === "score" && <Score setScreen={setScreen} userName={activeUser} xp={xp} score={score} hasNext={hasNextQuestion} />}
      {screen === "leaderboard" && <Leaderboard setScreen={setScreen} userName={activeUser} xp={xp} completedLessons={completedLessons} hasChallengeDone={hasChallengeDone} hasQuizDone={hasQuizDone} lastScore={score} />}
      {screen === "progress" && <ProgressPage setScreen={setScreen} userName={activeUser} xp={xp} completedLessons={completedLessons} score={score} />}
      {screen === "profile" && <Profile setScreen={setScreen} userName={activeUser} onUpdateUsername={handleUpdateUsername} xp={xp} completedLessons={completedLessons} />}
    </>
  );
}