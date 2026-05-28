import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, CircleUserRound, Menu } from "lucide-react";
import styles from "./header.module.css";
import Modal from "../Modal";
import { passengersData } from "../../../data/passengers";

export default function Header({
  navigationType = "menu",
  showSupportIcon = true,
}) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMenuClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.header}>
      {navigationType === "menu" ? (
        <Menu className={styles.menuHamburguer} onClick={handleMenuClick} />
      ) : (
        <ArrowLeft className={styles.backButton} onClick={handleBackClick} />
      )}

      <p className={styles.headerContent}>PAB Mobilidade</p>

      <div className={styles.userAvatar}>
        <img
          src={passengersData.avatar}
          alt="Avatar"
        />
      </div>
      {showSupportIcon && (
        <div className={styles.supportIcon}>
          <CircleUserRound />
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
