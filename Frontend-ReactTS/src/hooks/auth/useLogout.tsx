import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export function useLogout() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  return () => {
    localStorage.removeItem("flowplay_token");
    localStorage.removeItem("flowplay_user");
    auth?.setIsAuthenticated(false);
    navigate("/login");
  };
}
