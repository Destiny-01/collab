import { UserDocument } from "@/models/User";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export default function useCurrentUser() {
  const { data: sessionData } = useSession();
  const currentUser: UserDocument | null | undefined = sessionData?.user as any;

  return useMemo(() => currentUser, [currentUser]);
}
