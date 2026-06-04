import Badge from "../../../../../components/ui/Badge";
import styles from "./transportDetails.module.css";

import { Star, MessageSquareText, Car } from "lucide-react";

export default function TransportDetails() {
  const message = encodeURIComponent(
    "Olá Paulo, vim do site Pab Viagens e preciso de ajuda.",
  );
  return (
    <section className={styles.transportDetails}>
      <div className={styles.transportDetailsContainer}>
        <span className={styles.label}>DETALHES DO TRANSPORTE</span>

        <div className={styles.vehicleCard}>
          <div className={styles.vehicleIcon}>
            <Car />
          </div>

          <div className={styles.vehicleInfo}>
            <h2>Kombi</h2>

            <div className={styles.tags}>
              <Badge variant="tertiary" content="PAB-2026" />

              <span className={styles.type}>• Executivo</span>
            </div>
          </div>
        </div>

        <div className={styles.driver}>
          <div className={styles.driverInfo}>
            <img
              src="https://scontent.cdninstagram.com/v/t51.82787-19/642493145_18055397795454507_6225200326203174088_n.jpg?_nc_cat=104&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=Dpodp99Q7dwQ7kNvwEEcMQh&_nc_oc=AdoQBXN96OBCVZQMNyNb5pbILUHNin48VTmlVUW-J1xxMC8wyY2buZETYmZZU4PKy14&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=Sw9E_SW1qModOoZShzqo0g&_nc_ss=7c6a8&oh=00_Af_RIlSBabvhO4QcPsHKSH8bFI_UkbJ6DleLpsSQd0eIZA&oe=6A26D3D2"
              alt="Motorista"
            />

            <div>
              <h3>Paulo Aguiar</h3>

              <div className={styles.rating}>
                <Star size={14} fill="currentColor" />

                <span>5.0 (7 anos)</span>
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/5583981922611?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chatButton}
          >
            <MessageSquareText size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
