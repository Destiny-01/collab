import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/utils/api";

export function useGetUser(id: string) {
  return useQuery({
    queryKey: [`user-${id}`],
    queryFn: () => API.get(`/user/${id}`),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}

export function useGetAllUsers() {
  return useQuery({
    queryKey: [`all-users`],
    queryFn: () => API.get(`/user`),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
