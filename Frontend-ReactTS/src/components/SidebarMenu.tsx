import { Link } from "react-router";
import { useLogout } from "../hooks/auth/useLogout";

export default function SidebarMenu() {
  const logout = useLogout();
  return (
    <aside className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-4 font-display text-lg font-extrabold text-ink">FlowPlay</div>
      <nav className="grid gap-2 text-sm font-bold">
        <Link className="rounded-xl px-3 py-2 text-muted hover:bg-cloud hover:text-primary" to="/admin/dashboard">Dashboard</Link>
        <Link className="rounded-xl px-3 py-2 text-muted hover:bg-cloud hover:text-primary" to="/admin/users">Peringkat</Link>
        <button className="rounded-xl px-3 py-2 text-left text-muted hover:bg-cloud hover:text-primary" onClick={logout}>Keluar</button>
      </nav>
    </aside>
  );
}
