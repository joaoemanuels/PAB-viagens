import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { MapPin, MessageCircle, Share, Star } from "lucide-react";
import { supabase } from "../../../../services/supabase/supabase.js";
import styles from "./tripDetailsSheet.module.css";
import Button from "../../../../components/ui/Button";

export default function TripDetailsSheet({
  isMinimised,
  setIsMinimised,
  tripId,
}) {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const controls = useAnimationControls();

  useEffect(() => {
    if (isMinimised) {
      controls.start("minimised");
    } else {
      controls.start("expanded");
    }
  }, [isMinimised, controls]);

  useEffect(() => {
    if (!tripId) return;

    async function fetchCurrentTrip() {
      setLoading(true);

      const { data, error } = await supabase
        .from("trips")
        .select(
          `
          id,
          status,
          estimated_arrival,
          routes (
            vehicle_plate,
            vehicle_model,
            vehicle_color,
            destination,
            users (
              full_name,
              avatar_url,
              phone
            )
          )
        `,
        )
        .eq("id", tripId)
        .single();

      if (!error && data) {
        const driverData = data.routes?.users;

        setTrip({
          statusText: "Viagem a caminho",
          dropoffPoint: `Ponto de desembarque: ${data.routes?.destination || "Não informado"}`,
          driver: {
            name: driverData?.full_name || "Motorista",
            avatar:
              driverData?.avatar_url ||
              "https://scontent.cdninstagram.com/v/t51.82787-19/642493145_18055397795454507_6225200326203174088_n.jpg?_nc_cat=104&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=Dpodp99Q7dwQ7kNvwEEcMQh&_nc_oc=AdoQBXN96OBCVZQMNyNb5pbILUHNin48VTmlVUW-J1xxMC8wyY2buZETYmZZU4PKy14&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=Sw9E_SW1qModOoZShzqo0g&_nc_ss=7c6a8&oh=00_Af_RIlSBabvhO4QcPsHKSH8bFI_UkbJ6DleLpsSQd0eIZA&oe=6A26D3D2",
            phone: driverData?.phone || "",
            vehicleDetails:
              `${data.routes?.vehicle_model || ""} ${data.routes?.vehicle_color || ""}`.trim() ||
              "Kombi Branca",
            licensePlate: data.routes?.vehicle_plate || "PAB-2026",
          },
        });
      }
      setLoading(false);
    }

    fetchCurrentTrip();
  }, [tripId]);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    const isSwipingDown =
      info.velocity.y > 20 || info.offset.y > swipeThreshold;
    const isSwipingUp =
      info.velocity.y < -20 || info.offset.y < -swipeThreshold;

    if (isSwipingDown) {
      setIsMinimised(true);
    } else if (isSwipingUp) {
      setIsMinimised(false);
    } else {
      controls.start(isMinimised ? "minimised" : "expanded");
    }
  };

  const variants = {
    expanded: { y: 0 },
    minimised: { y: window.innerWidth < 768 ? 165 : 0 },
  };

  if (loading)
    return <div className={styles.loading}>Carregando detalhes...</div>;
  if (!trip) return null;

  return (
    <motion.div
      className={styles.tripDetailsSheet}
      animate={controls}
      variants={variants}
      initial="expanded"
      drag={window.innerWidth < 768 ? "y" : false}
      dragConstraints={{ top: 0, bottom: 165 }}
      dragElastic={0.1}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
    >
      <div
        className={styles.dragHandleWrapper}
        onClick={() => setIsMinimised(!isMinimised)}
      >
        <div className={styles.dragHandle} />
      </div>

      <div className={styles.destinationSection}>
        <h2>{trip.statusText}</h2>
        <div className={styles.locationWrapper}>
          <MapPin size={16} />
          <p>{trip.dropoffPoint}</p>
        </div>
      </div>

      <div
        className={`${styles.collapsibleContent} ${isMinimised ? styles.hide : ""}`}
      >
        <div className={styles.driverCard}>
          <div className={styles.avatarWrapper}>
            <img src={trip.driver.avatar} alt={trip.driver.name} />
            <div className={styles.verifiedBadge}>
              <Star className={styles.starIcon} fill="#fff" />
            </div>
          </div>

          <div className={styles.driverInfo}>
            <div className={styles.driverHeader}>
              <h3 className={styles.driverName}>{trip.driver.name}</h3>
              <div className={styles.ratingBadge}>
                <span>5.0</span>
                <Star className={styles.starIcon} fill="currentColor" />
              </div>
            </div>
            <p className={styles.vehicleDetails}>
              {trip.driver.vehicleDetails}
              <span className={styles.dotSeparator}>&bull;</span>
              <strong>{trip.driver.licensePlate}</strong>
            </p>
          </div>
        </div>

        <div className={styles.actionsGroup}>
          <Button
            content={`Falar com ${trip.driver.name.split(" ")[0]}`}
            className={styles.primaryActionButton}
            btnIcon={<MessageCircle />}
            onClick={() => {
              const msg = encodeURIComponent(
                "Olá, estou acompanhando a viagem e preciso falar com você.",
              );
              window.open(`https://wa.me/5583999999999?text=${msg}`, "_blank");
            }}
          />

          <Button
            content={"Compartilhar"}
            className={styles.secondaryActionButton}
            btnIcon={<Share />}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Acompanhe minha viagem",
                  text: "Estou a caminho! Acompanhe minha localização:",
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copiado!");
              }
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
