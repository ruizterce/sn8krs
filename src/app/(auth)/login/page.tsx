"use client";
import { useState } from "react";
import { useAuth } from "../../../lib/auth";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../../store/authSlice";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignIn = async () => {
    const user = await signIn(username, password);
    if (user) {
      dispatch(setAuthState(user));
      router.push("/protected");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default AuthPage;
