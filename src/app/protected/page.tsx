"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthValidation } from "../../hooks/useAuthValidation";

export default function ProtectedPage() {
  const loading = useAuthValidation();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) return null;

  return (
    <div>
      <div>Protected Content</div>
      <div>{user?.name}</div>
    </div>
  );
}
