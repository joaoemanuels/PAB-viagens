import { Link, useParams, useSearchParams } from "react-router-dom";

import styles from "./register.module.css";
import Header from "../../../components/ui/Header";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";

export default function Register() {
  const { role } = useParams();
  const [searchParams] = useSearchParams();

  const tokenDaUrl = searchParams.get("token") || "";

  return (
    <section>
      <Header navigationType="back" showSupportIcon={false} />

      <div className={styles.registerContent}>
        <RegisterHeader />
        <RegisterForm key={role} role={role} securityToken={tokenDaUrl} />

        <footer className={styles.footer}>
          <p>
            Já tem uma conta? <Link to={`/login/${role}`}>Faça login</Link>
          </p>
        </footer>
      </div>
    </section>
  );
}
