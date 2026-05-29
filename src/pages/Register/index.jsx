import { useState } from "react";
import styles from "./register.module.css";
import { User, Mail, Phone, LockKeyhole, Eye, EyeOff } from "lucide-react";
import Header from "../../components/ui/Header";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section>
      <Header navigationType="back" showSupportIcon={false} />

      <div className={styles.registerContent}>
        <header className={styles.header}>
          <h1>Criar conta</h1>
          <p>
            Junte-se à nossa comunidade para facilitar sua mobilidade urbana
            diária.
          </p>
        </header>

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

        <footer className={styles.footer}>
          <p>
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </p>
        </footer>
      </div>
    </section>
  );
}
