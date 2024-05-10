import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/utils/api";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export function useAppFeedback() {
  return useMutation({
    mutationKey: ["drop-feedback"],
    mutationFn: (data: any) => API.post(`/user-feedback/`, data),
    onSuccess: () => toast.success("We've received your feedback!"),
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data || error.message);
    },
  });
}
