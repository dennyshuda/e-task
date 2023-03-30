import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import MyTask from "../pages/MyTask";
import AddTask from "../pages/AddTask";
import Users from "../pages/Users";
import DetailTask from "../pages/DetailTask";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

export default function SetupRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/my-task" element={<MyTask />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/detail/:id" element={<DetailTask />} />
        <Route path="/users" element={<Users />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
