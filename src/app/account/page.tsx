"use client";

import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsconfig from "../../../aws-exports";
Amplify.configure(awsconfig);

export default function Account() {
  return (
    <Authenticator
      signUpAttributes={["name"]}
      className="mt-8 drop-shadow-lg-h shadow-none font-bold"
    >
      {({ signOut, user }) => {
        return (
          <main>
            <h1>Hello {user?.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        );
      }}
    </Authenticator>
  );
}
