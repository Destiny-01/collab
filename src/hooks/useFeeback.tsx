import API from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["feedback"],
    mutationFn: (data: any) => API.post(`/feedback`, data),
    onSuccess: ({ data }) => {
      toast.success("Feedback sent successfully");
      queryClient.invalidateQueries({ queryKey: [`group-${data.data.uuid}`] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data || error.message);
    },
  });
}
