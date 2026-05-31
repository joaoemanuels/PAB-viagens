import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import styles from "./login.module.css";

import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import PromoBanner from "./PromoBanner";
import GoogleLogin from "./GoogleLogin";
import Header from "../../../components/ui/Header";

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
