import { Link } from "react-router";

export default function UserCreate() {
  return (
    <main className="mx-auto max-w-xl px-5 py-10">
      <section className="rounded-3xl bg-white p-7 shadow-sm">
        <h1 className="font-display text-2xl font-extrabold">Daftar Pelajar</h1>
        <p className="mt-2 text-muted">Pembuatan akun FlowPlay dilakukan melalui halaman registrasi.</p>
        <Link className="mt-5 inline-block font-bold text-primary" to="/register">Buka registrasi</Link>
      </section>
    </main>
  );
}
