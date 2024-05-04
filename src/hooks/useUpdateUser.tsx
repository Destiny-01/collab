import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/utils/api";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export function useUpdateUser() {
  const router = useRouter();
  const path = usePathname();
  const { data: session, update } = useSession();

  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: (data: any) =>
      API.put(`/user/`, { ...data, isProfileCompleted: true }),
    onSuccess: ({ data }) => {
      update({
        ...session,
        user: {
          ...session?.user,
          ...data.data,
        },
      })
        .then(() => {
          path.startsWith("/onboarding") && router.push("/onboarding/complete");
          toast.success("User profile completed successfully");
        })
        .catch((err) => toast.error(err));
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data || error.message);
    },
  });
}
