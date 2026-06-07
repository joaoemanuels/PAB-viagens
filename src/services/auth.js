import { supabase } from "../services/supabase/supabase.js";

export const authService = {
  signUp: async ({ fullName, email, phone, password, role, securityToken }) => {
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error("E-mail/Telefone ou senha incorretos");

    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("auth_id", data.user.id)
      .maybeSingle();

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
      .maybeSingle();

    if (profile) return profile;

    const userEmail = data.user.email;
    const isDriverRoute = window.location.pathname.includes("driver");

    if (isDriverRoute) {
      await supabase.auth.signOut();
      throw new Error(
        "Motoristas precisam se cadastrar com senha usando o código de segurança.",
      );
    }

    const { data: newProfile, error: dbError } = await supabase
      .from("users")
      .insert({
        id: data.user.id,
        auth_id: data.user.id,
        full_name:
          data.user.user_metadata.full_name ||
          data.user.user_metadata.name ||
          "Usuário Google",
        email: userEmail,
        phone: data.user.phone || null,
        role: "passenger",
      })
      .select()
      .single();

    if (dbError) {
      await supabase.auth.signOut();
      return null;
    }

    return newProfile;
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

  loginWithGoogle: async (googleIdToken, currentRole) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: googleIdToken,
    });

    if (error) throw new Error(error.message);

    const user = data.user;
    if (!user) throw new Error("Não foi possível obter os dados do usuário do Google.");

    const { data: profile } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", user.id)
      .maybeSingle();

    if (profile) {
      if (currentRole && profile.role !== currentRole) {
        await supabase.auth.signOut();
        throw new Error("Este e-mail está cadastrado com outro tipo de conta.");
      }
      return profile;
    }

    if (currentRole === "driver") {
      await supabase.auth.signOut();
      throw new Error(
        "Motoristas precisam se cadastrar com senha usando o código de segurança."
      );
    }

    const { data: newProfile, error: dbError } = await supabase
      .from("users")
      .insert({
        id: user.id,
        auth_id: user.id,
        full_name: user.user_metadata.full_name || user.user_metadata.name || "Usuário Google",
        email: user.email,
        phone: user.phone || null,
        role: currentRole || "passenger",
      })
      .select()
      .single();

    if (dbError) {
      await supabase.auth.signOut();
      throw new Error(dbError.message);
    }

    return newProfile;
  },
};
