import { formatCurrency } from "../../../../../utils/formatCurrency";

import Button from "../../../../../components/ui/Button";

import styles from "./checkoutFooter.module.css";

export default function CheckoutFooter({ price, seats, onConfirm, isValid }) {
  return (
    <section className={styles.checkoutFooter}>
      <div className={styles.totalAmount}>
        <span>Total a pagar: </span>
        <p>{formatCurrency(price * seats)}</p>
      </div>
      <Button
        type="button"
        className={`${styles.confirmButton} ${!isValid ? styles.confirmButtonDisabled : ""}`}
        variant="primary"
        onClick={isValid ? onConfirm : undefined}
        content={"Confirmar Reserva"}
        disabled={!isValid}
      />
    </section>
  );
}
