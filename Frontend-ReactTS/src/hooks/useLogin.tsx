import { useMutation } from "@tanstack/react-query";
import { flowPlayApi } from "../services/api";

export function useLogin() {
  return useMutation({
    mutationFn: (data: { username: string; password: string }) => flowPlayApi.login(data.username, data.password),
  });
}
