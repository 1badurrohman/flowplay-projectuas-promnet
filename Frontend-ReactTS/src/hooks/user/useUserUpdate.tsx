import { useMutation } from "@tanstack/react-query";
import { flowPlayApi } from "../../services/api";

export function useUserUpdate() {
  return useMutation({
    mutationFn: ({ username }: { username: string }) => flowPlayApi.updateUsername(username),
  });
}
