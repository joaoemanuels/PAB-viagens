import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { authService } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import {
  BadgeQuestionMark,
  CircleX,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  User,
} from "lucide-react";

import Header from "../../../components/ui/Header";
import ProfileItem from "../../../components/ui/ProfileItem";
import ProfileSection from "../../../components/ui/ProfileSection";
import ProfileHeader from "../../../components/common/ProfileHeader";
import NotLoggedState from "../../../components/common/NotLoggedState";
import Loading from "../../../components/ui/Loading";
import ModalDelete from "../../../components/ui/ModalDelete";

import styles from "./profileUser.module.css";

export default function ProfileUser() {
  const navigate = useNavigate();
  const { isLogged, loading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);

      await authService.deleteAccount();

      await authService.signOut();

      navigate("/home", { state: { accountDeleted: true } });
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      await authService.sendPasswordResetEmail(profile?.email);
      alert("E-mail de redefinição enviado! Verifique sua caixa de entrada.");
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      alert("Não foi possível enviar o e-mail de redefinição.");
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
          <ProfileItem
            icon={<LockKeyhole />}
            label="Alterar Senha"
            isLink
            onClick={handleResetPassword}
          />
        </ProfileSection>

        <ProfileSection title="Suporte">
          <ProfileItem
            icon={<BadgeQuestionMark />}
            label="Ajuda e Suporte"
            isLink
            onClick={() => navigate("/faq")}
          />
        </ProfileSection>

        <ProfileSection title="Conta">
          <ProfileItem
            icon={<LogOut />}
            label="Sair da Conta"
            onClick={handleLogout}
          />

          <ProfileItem
            icon={<CircleX />}
            label="Excluir Conta"
            variant="danger"
            onClick={() => setIsDeleteModalOpen(true)}
          />
        </ProfileSection>
      </div>

      {isDeleteModalOpen && (
        <ModalDelete
          onConfirm={handleDeleteAccount}
          onCancel={() => setIsDeleteModalOpen(false)}
          isLoading={isDeleting}
        />
      )}
    </section>
  );
}
