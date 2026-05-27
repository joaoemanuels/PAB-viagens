import Header from "../../components/ui/Header";
import styles from "./booking.module.css";
import AlertBox from "./sections/AlertBox";
import CheckoutFooter from "./sections/CheckoutFooter";
import PassengerForm from "./sections/PassengerForm";
import PaymentMethod from "./sections/PaymentMethod";
import TravelSummary from "./sections/TravelSummary";

export default function Booking() {
  return (
    <section className={styles.booking}>
      <Header showSupportIcon={false} />
      <TravelSummary />
      <PassengerForm />
      <PaymentMethod />
      <AlertBox />
      <CheckoutFooter/>
    </section>
  );
}
