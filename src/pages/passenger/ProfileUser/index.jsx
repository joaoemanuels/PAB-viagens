import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { authService } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import {
  BadgeQuestionMark,
  Bell,
  Globe,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  User,
} from "lucide-react";

import Header from "../../../components/ui/Header";
import ProfileItem from "../../../components/ui/ProfileItem";
import ProfileSection from "../../../components/ui/ProfileSection";
import AppVersion from "../../../components/ui/AppVersion";
import ProfileHeader from "../../../components/common/ProfileHeader";
import NotLoggedState from "../../../components/common/NotLoggedState";
import Loading from "../../../components/ui/Loading";

import styles from "./profileUser.module.css";

export default function ProfileUser() {
  const navigate = useNavigate();
  const { isLogged, loading } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!isLogged) return;

      const data = await authService.getCurrentUser();
      setProfile(data);
    }

    fetchProfile();
  }, [isLogged]);

  if (loading) return <Loading />;

  if (!isLogged) return <NotLoggedState />;

  if (!profile) return <Loading />;

  const handleLogout = async () => {
    try {
      await authService.signOut();
      navigate("/home");
    } catch (error) {
      console.error("Erro ao tentar deslogar:", error);
    }
  };

  return (
    <section className={styles.profileUser}>
      <Header showSupportIcon={false} />
      <div className={styles.profileContainer}>
        <ProfileHeader name={profile?.full_name} />

        <ProfileSection title="Dados Pessoais">
          <ProfileItem
            icon={<User />}
            label="Nome Completo"
            value={profile?.full_name}
            isLink
          />
          <ProfileItem
            icon={<Mail />}
            label="E-mail"
            value={profile?.email}
            isLink
          />
          <ProfileItem
            icon={<Phone />}
            label="Telefone"
            value={profile?.phone}
            isLink
          />
        </ProfileSection>

        <ProfileSection title="Segurança">
          <ProfileItem icon={<LockKeyhole />} label="Alterar Senha" isLink />
        </ProfileSection>

        <ProfileSection title="Configurações">
          <ProfileItem icon={<Bell />} label="Notificações" isLink />
          <ProfileItem
            icon={<Globe />}
            label="Idioma"
            value={profile?.settings?.language}
            isLink
          />
        </ProfileSection>

        <ProfileSection>
          <ProfileItem
            icon={<BadgeQuestionMark />}
            label="Ajuda e Suporte"
            isLink
            onClick={() => navigate("/faq")}
          />
          <ProfileItem
            icon={<LogOut />}
            label="Sair da Conta"
            variant="danger"
            onClick={handleLogout}
          />
        </ProfileSection>

        <AppVersion className={styles.version} version="Versão 1.0.0" />
      </div>
    </section>
  );
}
