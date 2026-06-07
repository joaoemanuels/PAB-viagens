import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import styles from "./register.module.css";
import Header from "../../../components/ui/Header";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";
import GoogleLogin from "../Login/GoogleLogin";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";

export default function Register() {
  const { isLogged, user } = useAuth();
  const { role } = useParams();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const tokenDaUrl = searchParams.get("token") || "";
  useEffect(() => {
    if (isLogged && user) {
      if (user.role === "driver") {
        navigate("/driver", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [isLogged, user, navigate]);
  return (
    <section>
      <Header navigationType="back" showSupportIcon={false} />

      <div className={styles.registerContent}>
        <RegisterHeader />
        <RegisterForm key={role} role={role} securityToken={tokenDaUrl} />

        <GoogleLogin />
        <footer className={styles.footer}>
          <p>
            Já tem uma conta? <Link to={`/login/${role}`}>Faça login</Link>
          </p>
        </footer>
      </div>
    </section>
  );
}
