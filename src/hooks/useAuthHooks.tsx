import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useForgotPassword() {
  return useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: (data: any) => API.post(`/auth/forgot-password`, data),
    onSuccess: () => {
      toast.success("Password reset email sent successfully");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data || error.message);
    },
  });
}

export function useResendCode() {
  return useMutation({
    mutationKey: ["resend-code"],
    mutationFn: (data: any) => API.post(`/auth/resend-code`, data),
    onSuccess: () => {
      toast.success("Email sent successfully");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data || error.message);
    },
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (data: any) => API.post(`/auth/reset-password`, data),
    onSuccess: () => {
      toast.success("Password reset successfully");
      router.push("/auth/login");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data || error.message);
    },
  });
}

export function useUpvoteProject(id: string) {
  return useMutation({
    mutationKey: ["upvote-project"],
    mutationFn: () => API.post(`/groups/${id}/upvote`),
    onSuccess: ({ data }) => {
      toast.success("Voted successfully");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data || error.message);
    },
  });
}
