import { Star } from "lucide-react";
import styles from "./driverProfile.module.css";

export default function DriverProfile({
  name = "Motorista",
  rating = 0,
  tripsCount = "0",
}) {
  return (
    <section className={styles.profileAdmin}>
      <div className={styles.profileCard}>
        <div className={styles.avatarWrapper}>
          <img
            src="https://scontent.cdninstagram.com/v/t51.82787-19/642493145_18055397795454507_6225200326203174088_n.jpg?_nc_cat=104&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=Dpodp99Q7dwQ7kNvwEEcMQh&_nc_oc=AdoQBXN96OBCVZQMNyNb5pbILUHNin48VTmlVUW-J1xxMC8wyY2buZETYmZZU4PKy14&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=9iKtou7INYlnPps64IULpw&_nc_ss=7c6a8&oh=00_Af8Hg_6KIz8NicoJw66T3mtmG8wP4N0t6W-em_7nZU8mzw&oe=6A2895D2"
            alt={`Foto de ${name}`}
            className={styles.avatarImage}
          />
          <span className={styles.proBadge}>PRO</span>
        </div>

        <div className={styles.infoWrapper}>
          <h2 className={styles.driverName}>{name}</h2>

          <div className={styles.metaRow}>
            <div className={styles.ratingBadge || "5.0"}>
              <Star size={12} fill="#059669" stroke="#059669" />
              <span>{rating.toFixed(1)}</span>
            </div>

            <span className={styles.dotDivider}>•</span>

            <span className={styles.tripsCount}>{tripsCount} viagens</span>
          </div>
        </div>
      </div>
    </section>
  );
}
