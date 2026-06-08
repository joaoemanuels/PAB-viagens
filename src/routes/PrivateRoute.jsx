import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/common/Loading";
import NotLoggedState from "../components/common/NotLoggedState";

function PrivateRoute({ children, allowedRole = null }) {
  const { isLogged, user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isLogged) {
    if (allowedRole === "passenger" || !allowedRole) {
      return <NotLoggedState />;
    }

    return <Navigate to={`/login/${allowedRole}`} replace />;
  }

  const userRole = user?.user_metadata?.role;

  if (allowedRole && userRole !== allowedRole) {
    console.warn(
      `Acesso negado: Usuário com role ${userRole} tentou acessar rota de ${allowedRole}`,
    );

    return (
      <Navigate to={userRole === "driver" ? "/driver" : "/home"} replace />
    );
  }

  return children;
}

export default PrivateRoute;
