import { Link } from "react-router-dom"; // Se for Next.js, use: import Link from "next/link";
import styles from "./tabRole.module.css";
import { BellIcon, ChevronRightIcon, UserIcon } from "lucide-react";

export default function TabRole() {
  const roles = [
    {
      id: "passenger",
      title: "Sou Passageiro",
      description: "Quero buscar viagens e reservar meu lugar.",
      icon: <UserIcon className={styles.iconPassenger} />,
      wrapperClass: styles.iconWrapperPassenger,
      path: "/home",
    },
    {
      id: "driver",
      title: "Sou Motorista",
      description: "Quero gerenciar minhas rotas e passageiros.",
      icon: <BellIcon className={styles.iconDriver} />,
      wrapperClass: styles.iconWrapperDriver,
      path: "/login/driver",
    },
  ];

  return (
    <section className={styles.container}>
      {roles.map((role) => (
        <Link key={role.id} to={role.path} className={styles.card}>
          <div className={`${styles.iconWrapper} ${role.wrapperClass}`}>
            {role.icon}
          </div>

          <div className={styles.content}>
            <h3>{role.title}</h3>
            <p>{role.description}</p>
          </div>

          <ChevronRightIcon className={styles.arrow} />
        </Link>
      ))}
    </section>
  );
}
