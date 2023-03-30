import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const auth = useSelector((state: RootState) => state.user);
  return !auth ? <Outlet /> : <Navigate to={"/"} replace />;
}
