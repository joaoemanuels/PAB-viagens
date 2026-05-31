import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import styles from "./login.module.css";

import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import PromoBanner from "./PromoBanner";
import GoogleLogin from "./GoogleLogin";
import Header from "../../../components/ui/Header";
import { useEffect } from "react";

export default function Login() {
  const { role } = useParams();
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      const targetPath =
        role === "driver" || role === "admin" ? "/admin" : "/home";
      navigate(targetPath, { replace: true });
    }
  }, [isLogged, role, navigate]);

  return (
    <section>
      <Header navigationType="back" showSupportIcon={false} />
      <div className={styles.loginContent}>
        <LoginHeader />

        <LoginForm role={role} />

        <GoogleLogin/>

        {role === "passenger" && <PromoBanner />}

        <footer className={styles.footer}>
          <p>
            Não tem uma conta? <Link to={`/register/${role}`}>Cadastre-se</Link>
          </p>
        </footer>
      </div>
    </section>
  );
}
