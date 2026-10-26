import SidebarMenu from "../../../../components/SidebarMenu";
import { useAuthUser } from "../../../../hooks/auth/useAuthUser";

export default function Dashboard() {
  const user = useAuthUser();
  return (
    <main className="mx-auto grid max-w-5xl gap-6 px-5 py-10 md:grid-cols-[15rem_1fr]">
      <SidebarMenu />
      <section className="rounded-3xl bg-white p-7 shadow-sm">
        <h1 className="font-display text-2xl font-extrabold text-ink">Dashboard FlowPlay</h1>
        <p className="mt-2 text-muted">Selamat datang, {user?.username || "Pengguna"}.</p>
      </section>
    </main>
  );
}
