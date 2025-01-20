import * as Auth from "aws-amplify/auth";
import { setAuthState, logout, setAuthError } from "../store/authSlice";
import { useDispatch } from "react-redux";

import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
// Configure Amplify
Amplify.configure(awsconfig);

export const useAuth = () => {
  const dispatch = useDispatch();

  const signUp = async (username: string, password: string, email: string) => {
    try {
      const response = await Auth.signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      console.log("Sign-up successful:", response);
      return response;
    } catch (error) {
      console.error("Error during sign-up:", error);
      throw error;
    }
  };

  const confirmSignUp = async (username: string, confirmationCode: string) => {
    try {
      await Auth.confirmSignUp({ username, confirmationCode });
      console.log("User confirmed");
    } catch (error) {
      console.error("Error confirming sign up:", error);
      throw error;
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      const user = await Auth.signIn({ username, password });
      dispatch(setAuthState(user));
      return user;
    } catch (error) {
      dispatch(setAuthError("Failed to sign in."));
      console.error("Error signing in:", error);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      dispatch(logout());
    } catch (error) {
      dispatch(setAuthError("Failed to sign out."));
      console.error("Error signing out:", error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const currentUser = await Auth.getCurrentUser();
      dispatch(setAuthState(currentUser));
    } catch (error) {
      console.error("Error getting current user:", error);
      dispatch(setAuthError("User is not authenticated."));
    }
  };

  return { signUp, confirmSignUp, signIn, signOut, getCurrentUser };
};
