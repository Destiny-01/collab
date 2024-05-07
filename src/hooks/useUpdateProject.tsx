import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useCreateProject() {
  return useMutation({
    mutationKey: ["create-project"],
    mutationFn: (data) => API.post(`/groups/query`, data, { timeout: 90000 }),
    onSuccess: ({ data }) => {
      toast.success("Project created successfully");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data || error.message);
    },
  });
}

export function useUpdateProject() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-group"],
    mutationFn: ({ id, data }: any) => {
      console.log(data, "qery");
      return API.put(`/groups/${id}`, data);
    },
    onSuccess: ({ data }) => {
      toast.success("Project created successfully");
      queryClient.invalidateQueries({ queryKey: [`group-${data.data.uuid}`] });
      router.push(`/projects/${data.data.uuid}`);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data || error.message);
    },
  });
}

export function useCreateUpdate(id: string | string[]) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["new-update"],
    mutationFn: (data: any) => {
      console.log(data, "qery");
      return API.put(`/groups/${id}/new-update`, data);
    },
    onSuccess: ({ data }) => {
      console.log(data);
      toast.success("Update created successfully");
      queryClient.invalidateQueries({ queryKey: [`group-${data.data.uuid}`] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data || error.message);
    },
  });
}

export function useApplyToProject(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [`apply-to-${id}`],
    mutationFn: () => API.post(`/groups/${id}/apply`),
    onSuccess: ({ data }) => {
      console.log(data);
      toast.success("Apply request sent, look out for your mail");
      queryClient.invalidateQueries({
        queryKey: [`group-${data.data.uuid}`],
      });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data || error.message);
    },
  });
}

export function useInviteToProject(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [`invite-to-${id}`],
    mutationFn: (email: string) => API.post(`/groups/${id}/invite`, { email }),
    onSuccess: ({ data }) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: [`group-${data.data.uuid}`],
      });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data || error.message);
    },
  });
}

export function useUpvoteProject(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["upvote-project"],
    mutationFn: () => API.post(`/groups/${id}/upvote`),
    onSuccess: ({ data }) => {
      console.log(data);
      toast.success("Voted successfully");
      queryClient.invalidateQueries({
        queryKey: [`group-${data.data.uuid}`],
      });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data || error.message);
    },
  });
}
