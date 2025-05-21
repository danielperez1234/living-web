"use client";

import { storageKeys } from "@/const/storage_keys";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem(storageKeys.token) == null || localStorage.getItem(storageKeys.refreshToken) == null) {
      router.replace("/login");
    }
  }, []);
  return <></>;
}