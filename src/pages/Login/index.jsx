import { useState } from "react";
import styles from "./login.module.css";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import Header from "../../components/ui/Header";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section>
      <Header navigationType="back" showSupportIcon={false} />
      <div className={styles.loginContent}>
        <header className={styles.header}>
          <h1>Bem-vindo de volta</h1>
          <p>Acesse sua conta para gerenciar suas viagens e rotas favoritas.</p>
        </header>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputGroup}>
            <label htmlFor="identifier">E-mail ou CPF</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                type="text"
                id="identifier"
                placeholder="Digite seu e-mail ou CPF"
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
                id="password"
                placeholder="Sua senha secreta"
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

          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>
        </form>

        <div className={styles.divider}>
          <span>Ou entre com</span>
        </div>

        <div className={styles.socialContainer}>
          <button type="button" className={styles.socialButton}>
            <span
              className={`${styles.socialIcon} ${styles.googleIcon}`}
            ></span>
            Google
          </button>
          <button type="button" className={styles.socialButton}>
            <span
              className={`${styles.socialIcon} ${styles.facebookIcon}`}
            ></span>
            Facebook
          </button>
        </div>

        <div className={styles.bannerWrapper}>
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80"
            alt="Ônibus urbano em avenida"
            className={styles.bannerImage}
          />
          <div className={styles.bannerOverlay}>
            <p>Mobilidade urbana inteligente para o seu dia a dia.</p>
          </div>
        </div>

        <footer className={styles.footer}>
          <p>
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </footer>
      </div>
    </section>
  );
}
