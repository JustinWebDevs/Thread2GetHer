import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import Home from "../pages/home";
import Login from "../pages/login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};
