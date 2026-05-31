import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, CircleUserRound, Menu } from "lucide-react";
import styles from "./headerAdmin.module.css";
import { passengersData } from "../../../data/passengers";
import ModalAdmin from "../ModalAdmin";

export default function HeaderAdmin({
  navigationType = "menu",
  showSupportIcon = true,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackClick = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleMenuClick = () => {
    setIsModalOpen(true);
  };

  function handleBooking() {
    navigate(`/profileAdmin`);
  }
  return (
    <div className={styles.header}>
      {navigationType === "menu" ? (
        <Menu className={styles.menuHamburguer} onClick={handleMenuClick} />
      ) : (
        <ArrowLeft className={styles.backButton} onClick={handleBackClick} />
      )}

      <p className={styles.headerContent}>Painel Admin</p>

      <div className={styles.userAvatar} onClick={handleBooking}>
        <img src={passengersData.avatar} alt="Avatar" />
      </div>
      {showSupportIcon && (
        <div className={styles.supportIcon}>
          <CircleUserRound />
        </div>
      )}

      <ModalAdmin isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
