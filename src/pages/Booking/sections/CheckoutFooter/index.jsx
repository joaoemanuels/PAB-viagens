import styles from "./checkoutFooter.module.css";

export default function CheckoutFooter() {
  return (
    <section className={styles.checkoutFooter}>
      <div className={styles.totalAmount}>
        <span>Total a pagar: </span>
        <p>R$ 45,00</p>
      </div>
      <button className={styles.confirmButton}>Confirmar Reserva</button>
    </section>
  );
}
