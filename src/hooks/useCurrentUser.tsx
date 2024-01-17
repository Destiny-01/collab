import { UserDocument } from "@/models/User";
import getCurrentUser from "@/utils/getCurrentUser";
import { useEffect, useMemo, useState } from "react";

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<UserDocument | null>(null);

  useEffect(() => {
    getCurrentUser().then((res) => {
      console.log(res);
      setCurrentUser(res.currentUser);
    });
  }, []);

  return useMemo(() => currentUser, [currentUser]);
}
