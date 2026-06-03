import { supabase } from "../services/supabase/supabase.js";

export const authService = {
  signUp: async ({ fullName, email, phone, password, role, securityToken }) => {
    // 1. Agora a única role restrita que exige o token é "driver"
    const isRestricted = role === "driver";
    const expectedToken = import.meta.env.VITE_SECURITY_TOKEN || "";

    if (isRestricted && securityToken !== expectedToken) {
      throw new Error("Código de autenticação inválido ou não fornecido.");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          role, // Aqui vai ser "passenger" ou "driver"
          security_token: securityToken || null,
        },
      },
    });

    console.log("auth.signUp resultado:", { data, error });

    if (error) throw new Error(error.message);

    // 2. Inserção na tabela pública (Sincronizado com o banco de dados)
    const { error: dbError } = await supabase.from("users").insert({
      id: data.user.id,
      auth_id: data.user.id,
      full_name: fullName,
      email,
      phone,
      role, // O banco aceitará lindamente porque limpamos a constraint antiga
    });

    if (dbError) throw new Error(dbError.message);

    return data.user;
  },

  signIn: async (identifier, password, role) => {
    let email = identifier;

    if (!identifier.includes("@")) {
      const { data: userFound } = await supabase
        .from("users")
        .select("email")
        .eq("document_id", identifier)
        .single();

      if (!userFound) throw new Error("Usuário não encontrado");
      email = userFound.email;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error("E-mail/CPF ou senha incorretos");

    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("auth_id", data.user.id)
      .single();

    if (role && profile?.role !== role) {
      await supabase.auth.signOut();
      throw new Error("Acesso não autorizado para este perfil");
    }

    return data.user;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },

  getCurrentUser: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return null;

    const { data: profile } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", data.user.id)
      .single();

    return profile;
  },

  updateProfile: async (userId, data) => {
    const { error } = await supabase
      .from("users")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) throw new Error(error.message);

    return true;
  },
};
