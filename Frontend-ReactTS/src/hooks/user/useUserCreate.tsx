import { useRegister, type RegisterRequest } from "../auth/useRegister";

export function useUserCreate() {
  const mutation = useRegister();
  return {
    ...mutation,
    mutateUser: (data: RegisterRequest) => mutation.mutate(data),
  };
}
