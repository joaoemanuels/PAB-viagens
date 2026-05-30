import styles from "./formField.module.css";

export default function FormField({
  label,
  icon,
  type = "text",
  placeholder,
  error,
  register,
  id,
}) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{label}</label>

      <div className={styles.inputWrapper}>
        {icon} 
        <input id={id} type={type} placeholder={placeholder} {...register} />
      </div>

      {error && <p className={styles.fieldError}>{error.message}</p>}
    </div>
  );
}
