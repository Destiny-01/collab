"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useMemo } from "react";
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
  const allowedRoutes = useMemo(
    () => ["/auth", "/onboarding", "/projects/", "/explore", "/people"],
    []
  );

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (
      currentUser?.isVerified &&
      !currentUser?.isProfileCompleted &&
      !allowedRoutes.some((r) => path.startsWith(r)) &&
      path !== "/"
    ) {
      router.push("/onboarding");
    } else if (
      status === "unauthenticated" &&
      !allowedRoutes.some((r) => path.startsWith(r)) &&
      path !== "/"
    ) {
      router.push("/auth/login");
    }
  }, [currentUser, router, status, path, allowedRoutes]);

  return (
    <QueryClientProvider client={queryClient}>
      {status === "loading" ? <Loader isFull /> : children}
    </QueryClientProvider>
  );
}
