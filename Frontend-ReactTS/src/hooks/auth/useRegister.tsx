import { useMutation } from "@tanstack/react-query";
import { flowPlayApi } from "../../services/api";

export type RegisterRequest = {
  fullName: string;
  username: string;
  password: string;
};

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => flowPlayApi.register(data.fullName, data.username, data.password),
  });
}
