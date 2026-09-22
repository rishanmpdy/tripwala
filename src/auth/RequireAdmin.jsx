import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RequireAdmin = ({ children }) => {
  const { session } = useAuth();
  const location = useLocation();
  return session ? children : <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
};

export default RequireAdmin;
