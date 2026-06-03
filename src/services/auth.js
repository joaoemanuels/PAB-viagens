import { supabase } from "../services/supabase/supabase.js";

export const authService = {
  signUp: async ({ fullName, email, phone, password, role, securityToken }) => {
    const isRestricted = role === "driver";
    const expectedToken = import.meta.env.VITE_SECURITY_TOKEN || "";

    console.log("DEBUG REGISTRO:");
    console.log("Role recebida:", role);
    console.log("Token digitado pelo usuário:", securityToken);
    console.log("Token esperado que veio do .env da Vercel:", expectedToken);

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
          role,
          security_token: securityToken || null,
        },
      },
    });

    console.log("auth.signUp resultado:", { data, error });

    if (error) throw new Error(error.message);

    const { error: dbError } = await supabase.from("users").insert({
      id: data.user.id,
      auth_id: data.user.id,
      full_name: fullName,
      email,
      phone,
      role,
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
        .eq("phone", identifier)
        .maybeSingle();

      if (!userFound)
        throw new Error("Usuário não encontrado com este telefone.");
      email = userFound.email;
    }

    // 2. Realiza a autenticação no Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error("E-mail/Telefone ou senha incorretos");

    const { data: profile } = await supabase
      .from("users")
      .select("role") // Traz a role para validação
      .eq("auth_id", data.user.id)
      .maybeSingle();

    console.log("Perfil encontrado para validação de role:", {
      identifier,
      profile,
    });

    if (!profile) {
      await supabase.auth.signOut();
      throw new Error(
        "Perfil não encontrado na base de dados. Contate o suporte.",
      );
    }

    if (role && profile.role !== role) {
      await supabase.auth.signOut();
      throw new Error("Acesso não autorizado para este perfil.");
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
