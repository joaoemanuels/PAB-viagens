import { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../services/auth";
import { supabase } from "../services/supabase/supabase";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const currentUser = await authService.getCurrentUser();
        if (isMounted) setUser(currentUser);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (identifier, password, currentRole) => {
    setLoading(true);
    try {
      const loggedUser = await authService.signIn(
        identifier,
        password,
        currentRole,
      );
      setUser(loggedUser);
      return loggedUser;
    } catch (error) {
      console.error("Erro no login tradicional:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

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
      value={{
        isLogged: !!user,
        user,
        loading,
        login,
        loginWithGoogle,
        logout,
      }}
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
