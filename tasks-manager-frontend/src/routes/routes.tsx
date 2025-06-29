import { useAuth } from "../context/AuthContext";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import TaskPage from "../pages/TaskPage";

const Rotas = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RotasPublicas />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<RotasPrivadas />}>
          <Route path="/" element={<TaskPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Rotas;

const RotasPrivadas = () => {
  const { isAuth } = useAuth();
  if (!isAuth) return <Navigate to="/login" replace />;

  return <Outlet />;
};

const RotasPublicas = () => {
  const location = useLocation();
  const from = location.state?.from || "/";
  const { isAuth } = useAuth();

  if (isAuth) return <Navigate to={from} replace />;

  return <Outlet />;
};
