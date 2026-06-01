import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Menu, MessageCircleQuestionMark } from "lucide-react";
import { passengersData } from "../../../data/passengers";

import ModalAdmin from "../ModalAdmin";

import styles from "./headerAdmin.module.css";

export default function HeaderAdmin({
  navigationType = "menu",
  showSupportIcon = true,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const message = encodeURIComponent(
    "Olá, vim do site Pab Viagens e preciso de ajuda.",
  );

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
        <a
          href={`https://wa.me/5583981922611?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.supportIcon}
        >
          <MessageCircleQuestionMark />
        </a>
      )}

      <ModalAdmin isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
