import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
// import Home from "../pages/Home";
import Extra from "../pages/Extra";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import FirstLogin from "../pages/FirstLogin";
import Configuration from "../pages/Configuration";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route path="home" element={<Home />} /> */}
        <Route path="configuration" element={<Configuration />} />
        <Route path="profile" element={<Profile />} />

        {/* <Route path="home" element={<Home />} /> */}
        <Route path="home" element={<Extra />} />
      </Route>
      <Route path="/firstLogin/:userId" element={<FirstLogin />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
