import styles from "./passengerForm.module.css";
import { Armchair, MessageCircle, Minus, Plus, User } from "lucide-react";

const DAYS_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS_SHORT = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

function getNextDays(count = 7) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      label: i === 0 ? "Hoje" : i === 1 ? "Amanhã" : DAYS_SHORT[d.getDay()],
      sub: `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`,
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    };
  });
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function PassengerForm({
  selectedDate,
  onDateChange,
  name,
  onNameChange,
  phone,
  onPhoneChange,
  seats,
  onSeatsChange,
}) {
  const days = getNextDays(7);

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
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
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
                value={phone}
                onChange={(e) => onPhoneChange(formatPhone(e.target.value))}
              />
            </div>
            <p className={styles.helperText}>
              Enviaremos a confirmação por aqui.
            </p>
          </div>

          <div className={`${styles.inputGroup} ${styles.dateGroup}`}>
            <span className={styles.label}>Data da Viagem</span>
            <div className={styles.datePicker}>
              {days.map((day) => (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => onDateChange(day.value)}
                  className={`${styles.dayChip} ${selectedDate === day.value ? styles.dayChipActive : ""}`}
                >
                  <span className={styles.dayLabel}>{day.label}</span>
                  <span className={styles.dayDate}>{day.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.seatCard}>
            <div className={styles.seatInfo}>
              <div className={styles.seatIconWrapper}>
                <Armchair />
              </div>
              <div className={styles.seatTexts}>
                <span className={styles.seatTitle}>Quantidade de Assentos</span>
                <span className={styles.seatSubtitle}>Máximo de 12</span>
              </div>
            </div>

            <div className={styles.stepper}>
              <button
                type="button"
                onClick={() => seats > 1 && onSeatsChange(seats - 1)}
                disabled={seats <= 1}
                className={styles.stepperButton}
                aria-label="Diminuir assentos"
              >
                <Minus />
              </button>
              <span className={styles.stepperValue}>{seats}</span>
              <button
                type="button"
                onClick={() => seats < 12 && onSeatsChange(seats + 1)}
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
