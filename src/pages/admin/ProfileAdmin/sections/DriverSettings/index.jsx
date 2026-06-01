import { authService } from "../../../../../services/auth";
import { useNavigate } from "react-router-dom";

import {
  BadgeQuestionMark,
  Bell,
  CarFront,
  Contact,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  User,
} from "lucide-react";

import ProfileSection from "../../../../../components/ui/ProfileSection";
import ProfileItem from "../../../../../components/ui/ProfileItem";
import AppVersion from "../../../../../components/ui/AppVersion";

import styles from "./driverSettings.module.css";

export default function DriverSettings({ profile }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.signOut();
      navigate("/");
    } catch (error) {
      console.error("Erro ao tentar deslogar:", error);
    }
  };

  return (
    <section className={styles.profileAdmin}>
      <ProfileSection title="Meus Dados">
        <ProfileItem
          icon={<User />}
          label="NOME COMPLETO"
          value={profile?.full_name}
          isLink
        />
        <ProfileItem
          icon={<Mail />}
          label="E-MAIL"
          value={profile?.email}
          isLink
        />
        <ProfileItem
          icon={<Phone />}
          label="TELEFONE"
          value={profile?.phone}
          isLink
        />
        <ProfileItem
          icon={<Contact />}
          label="CNH"
          value={profile?.document_id}
          isLink
        />
        <ProfileItem
          icon={<CarFront />}
          label="VEÍCULO"
          value={
            profile?.vehicle_model && profile?.vehicle_plate
              ? `${profile.vehicle_model} • ${profile.vehicle_plate}`
              : null
          }
          isLink
        />
      </ProfileSection>

      <ProfileSection title="Segurança">
        <ProfileItem icon={<LockKeyhole />} label="Alterar Senha" isLink />
      </ProfileSection>

      <ProfileSection title="Configurações">
        <ProfileItem icon={<Bell />} label="Notificações" isLink />
        <ProfileItem
          icon={<BadgeQuestionMark />}
          label="Ajuda e Suporte"
          isLink
        />
        <ProfileItem
          icon={<LogOut />}
          label="Sair da Conta"
          variant="danger"
          onClick={handleLogout}
        />
      </ProfileSection>

      <AppVersion version="v1.0.0" />
    </section>
  );
}
