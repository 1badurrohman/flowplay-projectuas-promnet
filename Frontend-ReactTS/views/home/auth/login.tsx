import { useUsers } from "../../../../hooks/user/useUsers";

export default function Users() {
  const { data = [], isLoading } = useUsers();
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <section className="rounded-3xl bg-white p-7 shadow-sm">
        <h1 className="font-display text-2xl font-extrabold">Leaderboard FlowPlay</h1>
        <div className="mt-5 space-y-2">
          {isLoading ? <p>Memuat...</p> : data.map((user, index) => (
            <div className="flex justify-between rounded-xl bg-cloud p-3" key={user.id}>
              <strong>{index + 1}. {user.username}</strong><span>{user.xp} XP</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
