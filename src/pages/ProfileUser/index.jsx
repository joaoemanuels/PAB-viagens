import styles from "./profileUser.module.css";

import Header from "../../components/ui/Header";
import ProfileHeader from "../../components/ui/ProfileHeader";
import ProfileItem from "../../components/ui/ProfileItem";
import ProfileSection from "../../components/ui/ProfileSection";
import AppVersion from "../../components/ui/AppVersion";
import { SwitchCamera } from "lucide-react";

export default function ProfileUser() {
  return (
    <section className={styles.profileUser}>
      <Header showSupportIcon={false} />
      <div className="profile-container">
        <ProfileHeader />

        <ProfileSection title="Dados Pessoais">
          <ProfileItem
            icon="user"
            label="Nome Completo"
            value="Ricardo de Oliveira Santos"
            isLink
          />
          <ProfileItem
            icon="mail"
            label="E-mail"
            value="ricardo.santos@email.com"
            isLink
          />
          <ProfileItem
            icon="phone"
            label="Telefone"
            value="+55 (11) 98765-4321"
            isLink
          />
        </ProfileSection>

        <ProfileSection title="Segurança">
          <ProfileItem icon="lock" label="Alterar Senha" isLink />
          <ProfileItem
            icon="shield"
            label="Autenticação em 2 etapas"
            rightElement={<SwitchCamera />}
          />
        </ProfileSection>

        <ProfileSection title="Configurações">
          <ProfileItem icon="bell" label="Notificações" isLink />
          <ProfileItem
            icon="globe"
            label="Idioma"
            value="Português (Brasil)"
            isLink
          />
        </ProfileSection>

        <ProfileSection>
          <ProfileItem icon="help" label="Ajuda e Suporte" isLink />
          <ProfileItem icon="logout" label="Sair da Conta" variant="danger" />
        </ProfileSection>

        <AppVersion version="v2.4.1" />
      </div>
    </section>
  );
}
