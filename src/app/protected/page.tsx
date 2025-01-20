"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedPage = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Welcome, {user?.username}!</p>
    </div>
  );
};

export default ProtectedPage;
