import { useQuery } from "@tanstack/react-query";
import Api from "../../services/api";

export type LeaderboardUser = {
  id: number;
  username: string;
  xp: number;
};

export function useUsers() {
  return useQuery<LeaderboardUser[]>({
    queryKey: ["flowplay-leaderboard"],
    queryFn: async () => (await Api.get("/leaderboard")).data.leaderboard,
  });
}
