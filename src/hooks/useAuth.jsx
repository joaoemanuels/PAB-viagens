import { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../services/auth";
import { supabase } from "../services/supabase/supabase";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } else if (event === "SIGNED_OUT") {
        setUser(null); // Limpa o estado global na hora!
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginWithGoogle = async (googleAccessToken, currentRole) => {
    setLoading(true);
    try {
      const loggedUser = await authService.loginWithGoogle(
        googleAccessToken,
        currentRole,
      );
      setUser(loggedUser);
    } catch (error) {
      console.error("Erro no login com Google:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.signOut();
      setUser(null);
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isLogged: !!user, user, loading, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
