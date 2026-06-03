import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../../../services/auth";
import { Mail, User, Phone, ShieldCheck } from "lucide-react";
import {
  baseRegisterSchema,
  restrictedRegisterSchema,
  formatPhone,
} from "../../../../utils/authSchemas";

import styles from "./registerForm.module.css";

import Button from "../../../../components/ui/Button";
import FormField from "../../../../components/ui/FormField";
import PasswordField from "../../../../components/ui/PasswordField";

export default function RegisterForm({ role, securityToken }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isRestrictedRole = role === "driver";

  const registerSchema = isRestrictedRole
    ? restrictedRegisterSchema
    : baseRegisterSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      securityToken: securityToken || "",
    },
  });

  const { onChange, ...rest } = register("phone");

  async function handleRegister(data) {
    setError("");
    setLoading(true);

    try {
      await authService.signUp({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role,
        securityToken: data.securityToken || null,
      });

      if (role === "driver") {
        navigate("/driver");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.message || "Ocorreu um erro ao fazer o registro.");
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
          label="E-mail"
          icon={<Mail size={20} />}
          placeholder="email@exemplo.com"
          register={register("email")}
          error={errors.email}
        />

        <FormField
          label="Telefone"
          icon={<Phone size={20} />}
          placeholder="(99) 99999-9999"
          register={{
            ...rest,
            onChange: (e) => {
              e.target.value = formatPhone(e.target.value);
              return onChange(e);
            },
          }}
          error={errors.phone}
        />

        <PasswordField
          label="Senha"
          placeholder="Mínimo 6 caracteres"
          register={register("password")}
          error={errors.password}
        />

        {isRestrictedRole && (
          <FormField
            label="Código de Autenticação / Convite"
            icon={<ShieldCheck size={20} color="#e11d48" />}
            placeholder="Digite o código fornecido pela empresa"
            register={register("securityToken")}
            error={errors.securityToken}
          />
        )}

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              {...register("terms")}
            />
            <span className={styles.checkboxText}>
              Concordo com os <a href="#terms">Termos de Uso</a> e{" "}
              <Link to="#privacy">Política de Privacidade</Link>.
            </span>
          </label>
          {errors.terms && (
            <p
              className={styles.errorText}
              style={{ color: "red", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.terms.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          content={loading ? "Cadastrando..." : "Cadastrar"}
          className={styles.submitButton}
          disabled={loading}
        />
      </form>
    </>
  );
}
