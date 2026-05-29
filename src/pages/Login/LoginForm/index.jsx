import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";

import styles from "./loginForm.module.css";

import Button from "../../../components/ui/Button";

const loginSchema = z.object({
  identifier: z.string().min(1, "Informe e-mail ou CPF"),
  password: z.string().min(6, "Senha inválida"),
});

export default function LoginForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  function handleLogin(data) {
    console.log(data);
  }

  return (
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
      </div>

      <Button
        type="submit"
        content={"Entrar"}
        className={styles.submitButton}
      />
    </form>
  );
}
