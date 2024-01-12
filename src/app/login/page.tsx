"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [info, setInfo] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
  });
  const handleInput = (e: any) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handle = async (e: any) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: info.email,
      password: info.password,
      name: info.name,
      username: info.username,
      redirect: false,
    });
    router.replace("/");
    console.log(res);
  };

  return (
    <div>
      <form onSubmit={handle}>
        <input type="email" name="email" onChange={(e) => handleInput(e)} />
        <input type="text" name="name" onChange={(e) => handleInput(e)} />
        <input type="text" name="username" onChange={(e) => handleInput(e)} />
        <input
          type="password"
          name="password"
          onChange={(e) => handleInput(e)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
