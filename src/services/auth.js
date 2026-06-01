import { supabase } from "../services/supabase/supabase.js";

export const authService = {
  signUp: async (userData) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (error) throw new Error(error.message);

    const { error: profileError } = await supabase.from("users").insert({
      auth_id: data.user.id,
      full_name: userData.fullName,
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      role: "passenger",
    });

    if (profileError) throw new Error(profileError.message);

    return data.user;
  },

  signIn: async (identifier, password) => {
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
