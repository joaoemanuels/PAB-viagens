import styles from "./register.module.css";
import Header from "../../components/ui/Header";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";

export default function Register() {
  return (
    <section>
      <Header navigationType="back" showSupportIcon={false} />

      <div className={styles.registerContent}>
        <RegisterHeader />
        <RegisterForm />

        <footer className={styles.footer}>
          <p>
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </p>
        </footer>
      </div>
    </section>
  );
}
