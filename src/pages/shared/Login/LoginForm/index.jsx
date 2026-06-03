import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../../../services/auth";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";

import Button from "../../../../components/ui/Button";

import styles from "./loginForm.module.css";

const loginSchema = z.object({
  identifier: z.string().min(1, "Informe e-mail"),
  password: z.string().min(6, "Senha inválida"),
});

export default function LoginForm({ role }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  async function handleLogin(data) {
    setError("");
    setLoading(true);

    try {
      await authService.signIn(data.identifier, data.password, role);
    } catch (err) {
      setError(err.message || "Ocorreu um erro ao fazer login.");
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

      <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
        <div className={styles.inputGroup}>
          <label htmlFor="identifier">E-mail ou CPF</label>

          <div className={styles.inputWrapper}>
            <Mail className={styles.inputIcon} size={20} />
            <input
              type="text"
              placeholder="Digite seu e-mail ou CPF"
              {...register("identifier")}
            />
          </div>
          {errors.identifier && (
            <p className={styles.fieldError}>{errors.identifier.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="password">Senha</label>
            <a href="#forgot" className={styles.forgotLink}>
              Esqueci minha senha
            </a>
          </div>

          <div className={styles.inputWrapper}>
            <LockKeyhole className={styles.inputIcon} size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              {...register("password")}
            />

            <button
              type="button"
              className={styles.eyeButton}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className={styles.fieldError}>{errors.password.message}</p>
          )}
        </div>

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
