import styles from "./profileUser.module.css";

import Header from "../../components/ui/Header";
import ProfileHeader from "../../components/ui/ProfileHeader";
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

export default function ProfileUser() {
  return (
    <section className={styles.profileUser}>
      <Header showSupportIcon={false} />
      <div className={styles.profileContainer}>
        <ProfileHeader />

        <ProfileSection title="Dados Pessoais">
          <ProfileItem
            icon={<User />}
            label="Nome Completo"
            value="Ricardo de Oliveira Santos"
            isLink
          />
          <ProfileItem
            icon={<Mail />}
            label="E-mail"
            value="ricardo.santos@email.com"
            isLink
          />
          <ProfileItem
            icon={<Phone />}
            label="Telefone"
            value="+55 (11) 98765-4321"
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
            value="Português (Brasil)"
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

        <AppVersion version="v2.4.1" />
      </div>
    </section>
  );
}
