// import { supabase } from "/supabase/";

export const authService = {
  signUp: async (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      (u) => u.email === userData.email || u.cpf === userData.cpf,
    );
    if (userExists) {
      throw new Error("Usuário ou CPF já cadastrado");
    }

    const newUser = {
      id: Date.now(),
      ...userData,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("token", JSON.stringify(newUser));

    return newUser;
  },

  signIn: async (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    localStorage.setItem("token", JSON.stringify(user));

    return user;
  },

  signOut: async () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: async () => {
    const user = localStorage.getItem("token");
    return user ? JSON.parse(user) : null;
  },

  updateProfile: async (userId, data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...data } : user,
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const current = JSON.parse(localStorage.getItem("token"));

    if (current?.id === userId) {
      const updated = { ...current, ...data };
      localStorage.setItem("token", JSON.stringify(updated));
    }

    return true;
  },
};
