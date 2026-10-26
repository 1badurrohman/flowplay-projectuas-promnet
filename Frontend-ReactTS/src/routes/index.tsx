import { Navigate, Route, Routes } from "react-router";
import Home from "../views/home";
import Login from "../views/home/auth/login";
import Register from "../views/home/auth/register";
import Dashboard from "../views/home/admin/dashboard";
import Users from "../views/home/admin/users";
import UserCreate from "../views/home/admin/users/create";
import UserEdit from "../views/home/admin/users/edit";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/users/create" element={<UserCreate />} />
      <Route path="/admin/users/edit/:id" element={<UserEdit />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
