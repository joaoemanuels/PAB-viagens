import styles from "./profileUser.module.css";

import Header from "../../components/ui/Header";
import ProfileHeader from "../../components/common/ProfileHeader";
import ProfileItem from "../../components/ui/ProfileItem";
import ProfileSection from "../../components/ui/ProfileSection";
import AppVersion from "../../components/ui/AppVersion";

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
import { passengersData } from "../../data/passengers";
import NotLoggedState from "../../components/common/NotLoggedState";
import { useAuth } from "../../hooks/useAuth";

export default function ProfileUser() {
  const { isLogged, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isLogged) {
    return <NotLoggedState />;
  }

  return (
    <section className={styles.profileUser}>
      <Header showSupportIcon={false} />
      <div className={styles.profileContainer}>
        <ProfileHeader name={passengersData.firstName} />

        <ProfileSection title="Dados Pessoais">
          <ProfileItem
            icon={<User />}
            label="Nome Completo"
            value={passengersData.fullName}
            isLink
          />
          <ProfileItem
            icon={<Mail />}
            label="E-mail"
            value={passengersData.email}
            isLink
          />
          <ProfileItem
            icon={<Phone />}
            label="Telefone"
            value={passengersData.phone}
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
            value={passengersData.settings.language}
            isLink
          />
        </ProfileSection>

        <ProfileSection>
          <ProfileItem
            icon={<BadgeQuestionMark />}
            label="Ajuda e Suporte"
            isLink
          />
          <ProfileItem
            icon={<LogOut />}
            label="Sair da Conta"
            variant="danger"
          />
        </ProfileSection>

        <AppVersion className={styles.version} version="Versão 1.0.0" />
      </div>
    </section>
  );
}
