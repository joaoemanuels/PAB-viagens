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

  if (allowedRole && user?.role !== allowedRole) {
    console.warn(
      `Acesso negado: Usuário com role ${user?.role} tentou acessar rota de ${allowedRole}`,
    );

    return (
      <Navigate to={user?.role === "driver" ? "/driver" : "/home"} replace />
    );
  }

  return children;
}

export default PrivateRoute;
