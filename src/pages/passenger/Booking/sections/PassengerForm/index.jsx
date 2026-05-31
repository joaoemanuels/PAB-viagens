import { useState } from "react";
import styles from "./passengerForm.module.css";
import { Armchair, MessageCircle, Minus, Plus, User } from "lucide-react";

export default function PassengerForm() {
  const [seats, setSeats] = useState(1);

  const handleIncrement = (e) => {
    e.preventDefault();
    if (seats < 12) setSeats((prev) => prev + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (seats > 1) setSeats((prev) => prev - 1);
  };

  return (
    <section className={styles.passengerForm}>
      <section className={styles.container}>
        <h2 className={styles.sectionTitle}>Dados do Passageiro</h2>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Nome Completo
            </label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} />
              <input
                type="text"
                id="name"
                placeholder="Ex: João Silva"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone" className={styles.label}>
              Telefone (WhatsApp)
            </label>
            <div className={styles.inputWrapper}>
              <MessageCircle className={styles.inputIcon} />
              <input
                type="tel"
                id="phone"
                placeholder="(11) 99999-9999"
                className={styles.input}
              />
            </div>
            <p className={styles.helperText}>
              Enviaremos a confirmação por aqui.
            </p>
          </div>

          <div className={styles.seatCard}>
            <div className={styles.seatInfo}>
              <div className={styles.seatIconWrapper}>
                <Armchair />
              </div>
              <div className={styles.seatTexts}>
                <span className={styles.seatTitle}>Quantidade de Assentos</span>
                <span className={styles.seatSubtitle}>
                  Máximo de 12
                </span>
              </div>
            </div>

            <div className={styles.stepper}>
              <button
                onClick={handleDecrement}
                disabled={seats <= 1}
                className={styles.stepperButton}
                aria-label="Diminuir assentos"
              >
                <Minus />
              </button>
              <span className={styles.stepperValue}>{seats}</span>
              <button
                onClick={handleIncrement}
                disabled={seats >= 12}
                className={`${styles.stepperButton} ${styles.stepperButtonPrimary}`}
                aria-label="Aumentar assentos"
              >
                <Plus />
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}
