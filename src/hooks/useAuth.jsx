import { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../services/auth";

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
      } finally {
        setLoading(false);
      }
    }
    loadUser();
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

  return (
    <AuthContext.Provider
      value={{ isLogged: !!user, user, loading, loginWithGoogle }}
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
