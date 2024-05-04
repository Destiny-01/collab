import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/utils/api";

export function useGetAllGroups(user?: string) {
  return useQuery({
    queryKey: [`${user ?? "all"}-groups`],
    queryFn: () => API.get(`/groups${user ? `?user=${user}` : ""}`),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}

export function useGetMyGroups() {
  return useQuery({
    queryKey: ["my-groups"],
    queryFn: () => API.get(`/groups/mine`),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}

export function useGetSingleProject(id: string) {
  return useQuery({
    queryKey: [`group-${id}`],
    queryFn: () => API.get(`/groups/${id}`),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
