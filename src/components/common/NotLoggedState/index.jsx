import { LogIn, User } from "lucide-react";
import styles from "./notLoggedState.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

export default function NotLoggedState() {
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login");
  }

  return (
    <div className={styles.notLogged}>
      <div className={styles.notLoggedContent}>
        <div className={styles.notLoggedIcon}>
          <User size={40} />
        </div>
        <h2>Faça login</h2>
        <p>
          Entre na sua conta para visualizar reservas, histórico de viagens e
          informações pessoais.
        </p>

        <Button
          onClick={handleLogin}
          content="Entrar na Conta"
          btnIcon={<LogIn size={20} />}
          className={styles.loginButton}
        />

        <p className={styles.signup}>
          Ainda não tem conta? <Link to="/register">Criar Agora</Link>
        </p>
      </div>
    </div>
  );
}
