export type AuthUser = {
  id: number;
  fullName: string;
  username: string;
};

export function useAuthUser(): AuthUser | null {
  const savedUser = localStorage.getItem("flowplay_user");
  return savedUser ? JSON.parse(savedUser) as AuthUser : null;
}
