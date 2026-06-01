import { useEffect, useState } from "react";
import { authService } from "../../../services/auth";

import HeaderAdmin from "../../../components/ui/HeaderAdmin";
import Loading from "../../../components/ui/Loading";
import styles from "./profileAdmin.module.css";
import DriverProfile from "./sections/DriverProfile";
import DriverSettings from "./sections/DriverSettings";

export default function ProfileAdmin() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const data = await authService.getCurrentUser();
      setProfile(data);
      setLoading(false);
    }

    fetchProfile();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className={styles.profileAdmin}>
      <HeaderAdmin showSupportIcon={false} />
      <DriverProfile
        name={profile?.full_name}
        avatarUrl={profile?.avatar_url}
      />
      <DriverSettings profile={profile} />
    </section>
  );
}
