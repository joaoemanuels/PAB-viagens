import styles from "./googleLogin.module.css";

import Google from "../../../assets/icons/google.svg";
import SocialButton from "../../../components/ui/SocialButton";

export default function GoogleLogin() {
  return (
    <>
      <div className={styles.divider}>
        <span>Ou entre com</span>
      </div>
      <div className={styles.socialContainer}>
        <SocialButton
          type="button"
          className="googleIcon"
          icon={Google}
          content="Google"
        />
      </div>
    </>
  );
}
