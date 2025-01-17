import { Navigate } from "react-router-dom";

export function AuthRoute({ children }) {
  console.log("==========AuthRoute");
  const token = localStorage.getItem("token");
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}
