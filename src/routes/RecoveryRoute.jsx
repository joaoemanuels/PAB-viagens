import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../services/supabase/supabase";
import { Loading } from "../components/common/Loading";

export default function RecoveryRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    async function validateToken() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const hasToken =
        window.location.hash.includes("access_token") ||
        window.location.search.includes("token=");

      if (session || hasToken) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
    validateToken();
  }, []);

  if (isValid === null) return <Loading />;

  return isValid ? children : <Navigate to="/" replace />;
}
