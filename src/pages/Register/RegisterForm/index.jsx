import { useState } from "react";

import { Mail, LockKeyhole, Eye, EyeOff, User, Phone } from "lucide-react";

import styles from "./registerForm.module.css";

import Button from "../../../components/ui/Button";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.inputGroup}>
        <label htmlFor="fullName">Nome Completo</label>
        <div className={styles.inputWrapper}>
          <User className={styles.inputIcon} size={20} />
          <input type="text" id="fullName" placeholder="Ex: João Silva" />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">E-mail</label>
        <div className={styles.inputWrapper}>
          <Mail className={styles.inputIcon} size={20} />
          <input type="email" id="email" placeholder="email@exemplo.com" />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="phone">Telefone</label>
        <div className={styles.inputWrapper}>
          <Phone className={styles.inputIcon} size={20} />
          <input type="tel" id="phone" placeholder="(00) 00000-0000" />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">Senha</label>
        <div className={styles.inputWrapper}>
          <LockKeyhole className={styles.inputIcon} size={20} />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Mínimo 8 caracteres"
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

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxText}>
            Concordo com os <a href="#terms">Termos de Uso</a> e{" "}
            <a href="#privacy">Política de Privacidade</a>.
          </span>
        </label>
      </div>

      <Button content={"Criar conta"} className={styles.submitButton} />
    </form>
  );
}
