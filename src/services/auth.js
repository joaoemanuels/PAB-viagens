import { supabase } from "/supabase/";

export const authService = {
  signUp: async (email, password, userType) => {
    // Lógica de cadastro
  },
  signIn: async (email, password) => {
    // Lógica de login
  },
  signOut: async () => {
    // Lógica de logout
  },
  getCurrentUser: async () => {
    // Retorna usuário atual
  },
  updateProfile: async (userId, data) => {
    // Atualiza perfil
  },
};
