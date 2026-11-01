import { Link } from "react-router";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5 text-white">
      <section className="max-w-3xl text-center">
        <div className="text-sm font-extrabold tracking-widest text-lime">ALGORITMA • FLOWCHART • LOGIKA</div>
        <h1 className="mt-5 font-display text-5xl font-extrabold">Belajar logika dengan cara memainkannya.</h1>
        <p className="mx-auto mt-5 max-w-xl text-white/65">Susun alur, selesaikan materi, kumpulkan XP, dan pantau progres belajar di FlowPlay.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link className="rounded-2xl bg-lime px-6 py-3 font-bold text-ink" to="/register">Daftar</Link>
          <Link className="rounded-2xl bg-white px-6 py-3 font-bold text-ink" to="/login">Masuk</Link>
        </div>
      </section>
    </main>
  );
}
