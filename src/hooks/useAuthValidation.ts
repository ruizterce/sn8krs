import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Auth from "aws-amplify/auth";
import { setAuthState, logout } from "@/store/authSlice";
import { Amplify } from "aws-amplify";

const awsconfig = JSON.parse(process.env.NEXT_PUBLIC_AWS_CONFIG as string);
Amplify.configure(awsconfig);

export const useAuthValidation = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        if ((await Auth.fetchAuthSession()).userSub) {
          const user = await Auth.fetchUserAttributes();
          if (user.sub && user.email && user.name) {
            dispatch(
              setAuthState({
                id: user.sub,
                email: user.email,
                name: user.name,
              })
            );
          }
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.warn("Session validation failed:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, [dispatch]);

  return loading;
};
