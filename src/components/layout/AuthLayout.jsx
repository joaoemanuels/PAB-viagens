import { Outlet } from "react-router-dom";
import FooterAuth from "./FooterAuth";

function AuthLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>

      <footer>
        <FooterAuth />
      </footer>
    </div>
  );
}

export default AuthLayout;
