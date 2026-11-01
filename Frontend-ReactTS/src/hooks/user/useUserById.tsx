import { useQuery } from "@tanstack/react-query";
import Api from "../../services/api";

export function useUserById(id: number) {
  return useQuery({
    queryKey: ["flowplay-user", id],
    queryFn: async () => (await Api.get("/me")).data.user,
    enabled: id > 0,
  });
}
