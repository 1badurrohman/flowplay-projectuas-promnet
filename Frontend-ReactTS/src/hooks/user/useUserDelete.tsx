import { useMutation } from "@tanstack/react-query";

export function useUserDelete() {
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("flowplay_token");
      localStorage.removeItem("flowplay_user");
      return { message: "Sesi pengguna dihapus dari perangkat." };
    },
  });
}
