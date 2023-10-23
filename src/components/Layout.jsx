import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/connections";

export const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // if (!isLoggedIn()) {
    //   navigate("/login", { replace: true });
    // }
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/login", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
