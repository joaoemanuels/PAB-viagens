import { Outlet } from "react-router-dom";
import Footer from "../Footer";

import styles from "./layout.module.css";

export default function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
