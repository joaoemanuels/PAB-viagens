import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";

import styles from "./login.module.css";

import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import PromoBanner from "./PromoBanner";
import GoogleLogin from "./GoogleLogin";
import Header from "../../../components/ui/Header";

export default function Login() {
  const { role } = useParams();
  const { isLogged, user } = useAuth();

  const navigate = useNavigate();
  console.log("DEBUG USER ROLE:", user);
  useEffect(() => {
    if (isLogged && user) {
      const userRole = user.user_metadata?.role || role;

      if (userRole === "driver") {
        navigate("/driver", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [isLogged, user, role, navigate]);

  return (
    <section>
      <Header navigationType="back" showSupportIcon={false} />
      <div className={styles.loginContent}>
        <LoginHeader />

        <LoginForm role={role} />

        <GoogleLogin />

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
