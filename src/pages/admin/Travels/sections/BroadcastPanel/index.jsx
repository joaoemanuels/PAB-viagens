import { useState } from "react";
import styles from "./broadcastPanel.module.css";
import { Megaphone, SendHorizontal } from "lucide-react";

export default function BroadcastPanel() {
  const [message, setMessage] = useState("");

  const handleTemplateClick = (text) => {
    setMessage(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    console.log("Enviando transmissão:", message);
    setMessage("");
  };

  return (
    <section className={styles.broadcastPanel}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Megaphone className={styles.headerIcon} />
          <h2>Broadcast de Avisos</h2>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            className={styles.textarea}
            placeholder="Escreva sua mensagem para todos..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />

          <div className={styles.tagRow}>
            <button
              type="button"
              className={styles.tagButton}
              onClick={() =>
                handleTemplateClick(
                  "Aviso: Ônibus com atraso estimado de 10 minutos.",
                )
              }
            >
              Atraso 10m
            </button>
            <button
              type="button"
              className={styles.tagButton}
              onClick={() =>
                handleTemplateClick("Atenção passageiros, embarque liberado.")
              }
            >
              Embarque
            </button>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!message.trim()}
          >
            Enviar para Todos <SendHorizontal className={styles.sendIcon} />
          </button>
        </form>
      </div>
    </section>
  );
}
