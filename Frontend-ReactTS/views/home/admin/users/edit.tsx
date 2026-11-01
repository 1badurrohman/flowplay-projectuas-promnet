import { useState } from "react";
import { useUserUpdate } from "../../../../hooks/user/useUserUpdate";

export default function UserEdit() {
  const [username, setUsername] = useState("");
  const updateUser = useUserUpdate();
  return (
    <main className="mx-auto max-w-xl px-5 py-10">
      <form className="rounded-3xl bg-white p-7 shadow-sm" onSubmit={(event) => { event.preventDefault(); updateUser.mutate({ username }); }}>
        <h1 className="font-display text-2xl font-extrabold">Edit Username</h1>
        <input className="mt-5 h-12 w-full rounded-xl border border-line px-4" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username baru" />
        <button className="mt-4 rounded-xl bg-primary px-5 py-3 font-bold text-white" disabled={updateUser.isPending}>Simpan</button>
      </form>
    </main>
  );
}
