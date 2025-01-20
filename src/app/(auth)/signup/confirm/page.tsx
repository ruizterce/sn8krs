"use client";
import { useState } from "react";
import { useAuth } from "../../../../lib/auth";
import { useDispatch } from "react-redux";
import { setAuthError } from "../../../../store/authSlice";

const ConfirmSignUp = ({ username }: { username: string }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { confirmSignUp } = useAuth();

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await confirmSignUp(username, code);
      // Redirect to login or another page after confirmation
      console.log("User confirmed");
    } catch (err) {
      setError("Error confirming sign up. Please try again.");
      dispatch(setAuthError("Error confirming sign up"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Confirm Your Account</h2>
      <form onSubmit={handleConfirmSignUp}>
        <input
          type="text"
          placeholder="Confirmation Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Confirming..." : "Confirm Sign Up"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ConfirmSignUp;
