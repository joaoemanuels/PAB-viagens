import { useState } from "react";
import styles from "./modalDelete.module.css";
import { Trash2 } from "lucide-react";

export default function ModalDelete({ onConfirm, onCancel, isLoading }) {
  const [inputValue, setInputValue] = useState("");
  const isConfirmed = inputValue.trim().toUpperCase() === "EXCLUIR";

  return (
    <div
      className={styles.overlay}
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <Trash2 />
          </div>
          <h2 id="modal-title" className={styles.title}>
            Excluir conta
          </h2>
          <p className={styles.description}>
            Tem certeza que deseja excluir sua conta? Essa ação é{" "}
            <strong className={styles.danger}>permanente</strong> e não pode ser
            desfeita.
          </p>
        </div>

        <div className={styles.warningBox}>
          <p className={styles.warningLabel}>
            Ao excluir sua conta, você perderá:
          </p>
          <ul className={styles.warningList}>
            <li>Histórico de viagens e reservas</li>
            <li>Dados pessoais e preferências</li>
            <li>Acesso ao aplicativo</li>
          </ul>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirm-input" className={styles.inputLabel}>
            Digite <strong>EXCLUIR</strong> para confirmar
          </label>
          <input
            id="confirm-input"
            type="text"
            className={styles.input}
            placeholder="EXCLUIR"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
          <button
            className={`${styles.deleteBtn} ${isConfirmed ? styles.deleteBtnActive : ""}`}
            disabled={!isConfirmed || isLoading}
            onClick={onConfirm}
          >
            {isLoading ? "Excluindo..." : "Excluir conta"} <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
