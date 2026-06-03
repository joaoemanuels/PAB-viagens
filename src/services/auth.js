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
          role,
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

    // 1. Se não for e-mail, assume que é o telefone/CPF e busca o e-mail correspondente
    if (!identifier.includes("@")) {
      const { data: userFound } = await supabase
        .from("users")
        .select("email")
        .eq("phone", identifier) // Filtra pelo telefone fornecido
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

    // 3. Busca o perfil usando o ID do usuário autenticado (Garante consistência)
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

    // 4. Valida se a role bate com o contexto do app (driver ou passenger)
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
