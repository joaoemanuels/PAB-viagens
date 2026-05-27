import { useState } from "react";
import styles from "./paymentMethod.module.css";
import { Check, CreditCard, QrCode } from "lucide-react";

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState("pix");

  return (
    <section className={styles.paymentMethod}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Forma de Pagamento</h2>

        <div className={styles.radioGroup}>
          <label
            className={`${styles.paymentCard} ${
              selectedMethod === "pix" ? styles.activeCard : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="pix"
              checked={selectedMethod === "pix"}
              onChange={() => setSelectedMethod("pix")}
              className={styles.hiddenRadio}
            />

            <div className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <QrCode />
              </div>
              <div className={styles.texts}>
                <span className={styles.title}>PIX (Confirmar agora)</span>
                <span className={styles.description}>
                  Liberação imediata do seu voucher.
                </span>
              </div>
            </div>

            <div className={styles.statusIndicator}>
              {selectedMethod === "pix" ? (
                <Check className={styles.checkedIcon} />
              ) : (
                <div className={styles.uncheckedCircle} />
              )}
            </div>
          </label>

          <label
            className={`${styles.paymentCard} ${
              selectedMethod === "on_boarding" ? styles.activeCard : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="on_boarding"
              checked={selectedMethod === "on_boarding"}
              onChange={() => setSelectedMethod("on_boarding")}
              className={styles.hiddenRadio}
            />

            <div className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <CreditCard />
              </div>
              <div className={styles.texts}>
                <span className={styles.title}>Pagar no Embarque</span>
                <span className={styles.description}>
                  Dinheiro ou Cartão com o motorista.
                </span>
              </div>
            </div>

            <div className={styles.statusIndicator}>
              {selectedMethod === "on_boarding" ? (
                <Check className={styles.checkedIcon} />
              ) : (
                <div className={styles.uncheckedCircle} />
              )}
            </div>
          </label>
        </div>
      </div>
    </section>
  );
}
