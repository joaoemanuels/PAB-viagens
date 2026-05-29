import Button from "../../../../components/ui/Button";
import { formatCurrency } from "../../../../utils/formatCurrency";
import styles from "./checkoutFooter.module.css";

export default function CheckoutFooter({ price }) {
  return (
    <section className={styles.checkoutFooter}>
      <div className={styles.totalAmount}>
        <span>Total a pagar: </span>
        <p>{formatCurrency(price)}</p>
      </div>
      <Button
        type="submit"
        className={styles.confirmButton}
        variant="primary"
        onClick={""}
        content={"Confirmar Reserva"}
      />
    </section>
  );
}
