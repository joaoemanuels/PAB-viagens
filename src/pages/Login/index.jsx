import { Link, useNavigate } from "react-router-dom";

import styles from "./login.module.css";

import Header from "../../components/ui/Header";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import PromoBanner from "./PromoBanner";
import GoogleLogin from "./GoogleLogin";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  if (isLogged) {
    navigate("/home");
  }

  return (
    <section>
      <Header navigationType="back" showSupportIcon={false} />
      <div className={styles.loginContent}>
        <LoginHeader />

        <LoginForm />

        <GoogleLogin />

        <PromoBanner />

        <footer className={styles.footer}>
          <p>
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </footer>
      </div>
    </section>
  );
}
