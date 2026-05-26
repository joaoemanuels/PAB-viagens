import { Outlet } from "react-router-dom";
import Footer from "./FooterAdmin";

export default function AdminLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
