"use client";

import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserDocument } from "@/models/User";
import { useRouter, usePathname } from "next/navigation";
import Loader from "./Loader";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  const router = useRouter();
  const path = usePathname();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            staleTime: Infinity,
          },
        },
      })
  );
  const { data: sessionData, status } = useSession();
  const currentUser: UserDocument | null | undefined = sessionData?.user as any;

  useEffect(() => {
    console.log(
      currentUser?.isVerified,
      !currentUser?.isProfileCompleted,
      !path.startsWith("/onboarding"),
      !path.startsWith("/auth"),
      path
    );
    if (
      currentUser?.isVerified &&
      !currentUser?.isProfileCompleted &&
      !path.startsWith("/onboarding") &&
      !path.startsWith("/auth") &&
      path !== "/"
    ) {
      router.push("/onboarding");
    } else if (
      status === "unauthenticated" &&
      !path.startsWith("/onboarding") &&
      !path.startsWith("/auth") &&
      path !== "/"
    ) {
      router.push("/auth/login");
    }
  }, [currentUser, router, status, path]);

  return (
    <QueryClientProvider client={queryClient}>
      {status === "loading" ? <Loader isFull /> : children}
    </QueryClientProvider>
  );
}
