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

  signIn: async (identifier, password) => {
    // Mudamos o nome do parâmetro para clareza
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Procura por e-mail OU por CPF, e valida a senha
    const user = users.find(
      (u) =>
        (u.email === identifier || u.cpf === identifier) &&
        u.password === password,
    );

    if (!user) {
      throw new Error("E-mail/CPF ou senha incorretos");
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
