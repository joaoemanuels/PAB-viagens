import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/common/Loading";
import NotLoggedState from "../components/common/NotLoggedState";

function PrivateRoute({ children, allowedRole = "passenger" }) {
  const { isLogged, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isLogged) {
    if (allowedRole === "passenger") {
      return <NotLoggedState />;
    }

    return <Navigate to="/login/admin" replace />;
  }

  return children;
}

export default PrivateRoute;
