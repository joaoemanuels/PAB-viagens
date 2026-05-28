import { Link } from "react-router-dom";
import styles from "./notFound.module.css";
import { House } from "lucide-react";

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src="/404.png"
            alt="Ilustração de um ônibus e um carro em um cruzamento com uma placa escrito 404"
            className={styles.image}
          />
        </div>

        <h1 className={styles.title}>Ops! Você pegou o caminho errado</h1>

        <p className={styles.description}>
          Não conseguimos encontrar a página que você está procurando. Talvez
          ela tenha mudado de lugar ou nunca existiu.
        </p>

        <Link to="/" className={styles.primaryButton}>
          <House className={styles.icon} />
          Voltar para o Início
        </Link>

        <Link href="/suporte" className={styles.secondaryLink}>
          Precisa de ajuda? Fale conosco
        </Link>
      </div>
    </section>
  );
}
