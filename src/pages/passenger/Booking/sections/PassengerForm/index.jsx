import { useEffect, useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import { MessageCircle, User } from "lucide-react";
import { authService } from "../../../../../services/auth";

import Loading from "../../../../../components/ui/Loading";
import SeatCard from "./seatCard";
import DateGroup from "./DateGroup";

import styles from "./passengerForm.module.css";

export default function PassengerForm({
  selectedDate,
  onDateChange,
  name,
  onNameChange,
  address,
  onAddressChange,
  seats,
  onSeatsChange,
}) {
  const { isLogged, loading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!isLogged) return;

      setProfileLoading(true);
      const data = await authService.getCurrentUser();
      setProfile(data);
      setProfileLoading(false);
    }

    fetchProfile();
  }, [isLogged]);

  if (loading || profileLoading) return <Loading />;

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
                placeholder={profile?.full_name || "Nome Completo"}
                className={styles.input}
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address" className={styles.label}>
              Endereço e Ponto de referência
            </label>
            <div className={styles.inputWrapper}>
              <MessageCircle className={styles.inputIcon} />
              <input
                type="text"
                id="address"
                placeholder="Ex: rua, número, bairro"
                className={styles.input}
                value={address}
                onChange={(e) => onAddressChange(e.target.value)}
              />
            </div>
            <p className={styles.helperText}>
              Enviaremos a confirmação por WhatsApp
            </p>
          </div>

          <DateGroup selectedDate={selectedDate} onDateChange={onDateChange} />

          <SeatCard seats={seats} onSeatsChange={onSeatsChange} />
        </form>
      </section>
    </section>
  );
}
