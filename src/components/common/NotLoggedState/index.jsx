import { Search, User } from "lucide-react";
import styles from "./notLoggedState.module.css";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

export default function NotLoggedState() {
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
          content={<Link to="/login">Entrar na Conta</Link>}
          btnIcon={<Search size={20} />}
          className={styles.loginButton}
        />

        <p className={styles.signup}>
          Ainda não tem conta? <Link to="/register">Criar Agora</Link>
        </p>
      </div>
    </div>
  );
}
