import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../services/supabase/supabase.js";
import { formatDate } from "../../../utils/formatDate.js";
import { formatCurrency } from "../../../utils/formatCurrency.js";

import Header from "../../../components/ui/Header";
import AlertBox from "./sections/AlertBox";
import CheckoutFooter from "./sections/CheckoutFooter";
import PassengerForm from "./sections/PassengerForm";
import PaymentMethod from "./sections/PaymentMethod";
import TravelSummary from "./sections/TravelSummary";
import Loading from "../../../components/ui/Loading";

import styles from "./booking.module.css";

const OPERATOR_PHONE = "5583981922611";

export default function Booking() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [seats, setSeats] = useState(1);
  const [obs, setObs] = useState("");

  const isValid =
    name.trim() !== "" && address.trim() !== "" && selectedDate !== "";

  useEffect(() => {
    async function fetchTrip() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("trips")
        .select(
          `
          id,
          departure_time,
          routes (
            origin,
            destination,
            category,
            type,
            price_per_seat
          )
        `,
        )
        .eq("id", tripId)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setTrip(data);
        setSelectedDate(new Date().toISOString().split("T")[0]);
      }

      setLoading(false);
    }

    fetchTrip();
  }, [tripId]);

  function handleConfirm() {
    const { origin, destination, price_per_seat } = trip.routes;

    const message =
      `Olá! Quero reservar uma viagem.\n\n` +
      `🗺️ Rota: ${origin} → ${destination}\n` +
      `📅 Data: ${formatDate(selectedDate)}\n` +
      `🕐 Horário: ${trip.departure_time}\n` +
      `💺 Assentos: ${seats}\n` +
      `💰 Total: R$ ${formatCurrency(price_per_seat * seats)}\n\n` +
      `👤 Nome: ${name}\n` +
      `🏠 Endereço: ${address}\n` +
      `🏠 Observação: ${obs}`;

    const url = `https://wa.me/${OPERATOR_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  if (loading) return <Loading />;
  if (error || !trip) return <p>Viagem não encontrada</p>;

  return (
    <section className={styles.booking}>
      <Header showSupportIcon={false} navigationType="back" />
      <TravelSummary
        price={trip.routes.price_per_seat}
        origin={trip.routes.origin}
        destination={trip.routes.destination}
        date={selectedDate}
        departure={trip.departure_time}
      />
      <PassengerForm
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        name={name}
        onNameChange={setName}
        address={address}
        onAddressChange={setAddress}
        seats={seats}
        onSeatsChange={setSeats}
        obs={obs}
        onObsChange={setObs}
      />
      <PaymentMethod />
      <AlertBox />
      <CheckoutFooter
        price={trip.routes.price_per_seat}
        seats={seats}
        onConfirm={handleConfirm}
        isValid={isValid}
      />
    </section>
  );
}
