"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import AuthContext from "./Auth";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function Session({ children }: AuthContextProps) {
  return (
    <SessionProvider>
      <AuthContext>{children}</AuthContext>
    </SessionProvider>
  );
}
