import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useRegister } from "../../../hooks/auth/useRegister";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const register = useRegister();
  const navigate = useNavigate();
  const submit = (event: FormEvent) => {
    event.preventDefault();
    register.mutate({ fullName, username, password }, { onSuccess: () => navigate("/login") });
  };
  return (
    <main className="grid min-h-screen place-items-center bg-canvas px-5">
      <form className="w-full max-w-md rounded-3xl bg-white p-7 shadow-panel" onSubmit={submit}>
        <h1 className="font-display text-3xl font-extrabold">Daftar FlowPlay</h1>
        <input className="mt-6 h-12 w-full rounded-xl border border-line px-4" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nama lengkap" />
        <input className="mt-3 h-12 w-full rounded-xl border border-line px-4" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input className="mt-3 h-12 w-full rounded-xl border border-line px-4" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Minimal 8 karakter" />
        <button className="mt-5 w-full rounded-xl bg-primary py-3 font-bold text-white" disabled={register.isPending}>Daftar</button>
        <Link className="mt-4 block text-center text-sm font-bold text-primary" to="/login">Sudah punya akun?</Link>
      </form>
    </main>
  );
}
