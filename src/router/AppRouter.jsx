import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import Home from "../pages/home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import FirstLogin from "../pages/firstLogin";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/firstLogin/:userId" element={<FirstLogin />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
