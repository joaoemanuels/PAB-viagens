import { useState } from "react";
import styles from "./passwordField.module.css";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function PasswordField({
  label,
  placeholder,
  error,
  register,
  id,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{label}</label>

      <div className={styles.inputWrapper}>
        <LockKeyhole size={20} className={styles.inputIcon} />

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register}
        />

        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>

      {error && <p className={styles.fieldError}>{error.message}</p>}
    </div>
  );
}
