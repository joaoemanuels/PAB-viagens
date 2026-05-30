import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidCPF } from "../../../utils/isValidCPF";
import { authService } from "../../../services/auth";
import { Mail, User, Phone, IdCardLanyard } from "lucide-react";

import styles from "./registerForm.module.css";

import Button from "../../../components/ui/Button";
import FormField from "../../../components/ui/FormField";
import PasswordField from "../../../components/ui/PasswordField";

const registerSchema = z.object({
  fullName: z.string().min(1, "Informe seu nome"),

  cpf: z.string().refine(isValidCPF, {
    message: "CPF inválido",
  }),

  email: z.string().email("Email inválido"),

  phone: z.string().min(10, "Telefone inválido"),

  password: z.string().min(6, "Senha muito curta"),

  terms: z.boolean().refine((val) => val === true, {
    message: "Você precisa aceitar os termos",
  }),
});

export default function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  async function handleRegister(data) {
    setError("");
    setLoading(true);

    try {
      await authService.signIn(data.identifier, data.password);

      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && (
        <div className={styles.errorBox}>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
        <FormField
          label="Nome Completo"
          icon={<User size={20} />}
          placeholder="Ex: João Silva"
          register={register("fullName")}
          error={errors.fullName}
        />

        <FormField
          label="CPF"
          icon={<IdCardLanyard size={20} />}
          placeholder="123.456.789-00"
          register={register("cpf")}
          error={errors.cpf}
        />

        <FormField
          label="E-mail"
          icon={<Mail size={20} />}
          placeholder="email@exemplo.com"
          register={register("email")}
          error={errors.email}
        />

        <FormField
          label="Telefone"
          icon={<Phone size={20} />}
          placeholder="(00) 00000-0000"
          register={register("phone")}
          error={errors.phone}
        />

        <PasswordField
          label="Senha"
          placeholder="Mínimo 6 caracteres"
          register={register("password")}
          error={errors.password}
        />

        <Button
          type="submit"
          content={loading ? "Entrando..." : "Entrar"}
          className={styles.submitButton}
          disabled={loading}
        />
      </form>
    </>
  );
}
