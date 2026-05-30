import { useState, useEffect } from "react";
import { authService } from "../services/auth";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    }
    loadUser();
  }, []);

  return {
    isLogged: !!user,
    user,
    loading,
  };
}
