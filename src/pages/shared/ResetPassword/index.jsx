import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { authService } from "../../../services/auth";
import styles from "./resetPassword.module.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      await authService.updatePassword(password);
      alert("Senha alterada com sucesso! Faça login com a nova senha.");
      await authService.signOut();
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrorMsg("Erro ao atualizar a senha. O link pode ter expirado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandName}>PAB Viagens</span>
        </div>

        <div className={styles.headingGroup}>
          <h2 className={styles.title}>Criar nova senha</h2>
          <p className={styles.subtitle}>
            Digite sua nova senha de acesso abaixo.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {errorMsg && (
            <div className={styles.errorBox}>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Nova Senha
            </label>
            <div className={styles.inputWrapper}>
              <LockKeyhole className={styles.inputIcon} size={16} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirmPassword">
              Confirme a Nova Senha
            </label>
            <div className={styles.inputWrapper}>
              <LockKeyhole className={styles.inputIcon} size={16} />
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                className={styles.input}
                placeholder="Repita a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Salvando..." : "Alterar Senha"}
          </button>
        </form>
      </div>
    </div>
  );
}
