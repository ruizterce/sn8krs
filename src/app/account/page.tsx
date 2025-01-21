"use client";

import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { AuthEventData } from "@aws-amplify/ui";
import "@aws-amplify/ui-react/styles.css";
import "./styles.css";
import { useRouter } from "next/navigation";
import awsconfig from "../../../aws-exports";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAuthValidation } from "@/hooks/useAuthValidation";

Amplify.configure(awsconfig);

export default function Account() {
  return (
    <div className="h-full">
      <Authenticator
        loginMechanisms={["email"]}
        signUpAttributes={["name"]}
        className="h-full flex flex-col justify-center drop-shadow-lg-h font-bold"
      >
        {({ signOut }) => {
          return <AuthenticatedView signOut={signOut} />;
        }}
      </Authenticator>
    </div>
  );
}

const AuthenticatedView = ({
  signOut,
}: {
  signOut: ((data?: AuthEventData | undefined) => void) | undefined;
}) => {
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
    <div className="h-full pt-4 px-4 pb-6 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold">
        What&apos;s up, <span className="drop-shadow-sm-h">{user?.name}</span>!
      </h1>
      <p>Your orders</p>
      <button
        className="py-1 px-4 font-bold bg-primary text-background"
        onClick={signOut}
      >
        Sign out
      </button>
    </div>
  );
};
