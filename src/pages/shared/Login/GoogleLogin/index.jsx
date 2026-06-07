import { useParams } from "react-router-dom";
import { GoogleLogin as IdentityProvider } from "@react-oauth/google";
import styles from "./googleLogin.module.css";
import { useAuth } from "../../../../hooks/useAuth";

export default function GoogleLogin() {
  const { role } = useParams();
  const { loginWithGoogle } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    try {
      await loginWithGoogle(credentialResponse.credential, role);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className={styles.divider}>
        <span>Ou entre com</span>
      </div>
      <div
        className={styles.socialContainer}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <IdentityProvider
          onSuccess={handleSuccess}
          onError={() => console.error("Erro no fluxo do Google")}
          useOneTap
          theme="outline"
          size="large"
          text="signin_with"
          shape="rectangular"
        />
      </div>
    </>
  );
}
