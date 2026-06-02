import { Link, useParams } from "react-router-dom";

import styles from "./register.module.css";
import Header from "../../../components/ui/Header";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";

export default function Register() {
  const { role } = useParams();
  return (
    <section>
      <Header navigationType="back" showSupportIcon={false} />

      <div className={styles.registerContent}>
        <RegisterHeader />
        <RegisterForm role="passenger"/>

        <footer className={styles.footer}>
          <p>
            Já tem uma conta? <Link to={`/login/${role}`}>Faça login</Link>
          </p>
        </footer>
      </div>
    </section>
  );
}
