import styles from "./promoBanner.module.css";

export default function PromoBanner() {
  return (
    <div className={styles.bannerWrapper}>
      <img
        src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80"
        alt="Ônibus urbano em avenida"
        className={styles.bannerImage}
      />
      <div className={styles.bannerOverlay}>
        <p>Mobilidade urbana inteligente para o seu dia a dia.</p>
      </div>
    </div>
  );
}
