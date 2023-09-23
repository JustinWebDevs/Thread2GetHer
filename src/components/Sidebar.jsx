import { useState, useEffect } from "react";
import { auth } from "../firebase/connections";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import logOut from "../functions/logOut";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function Sidebar(propSidebar) {
  const { t } = useTranslation(["translation"]);
  const history = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setShowSidebar(propSidebar.showSidebar);
  }, [propSidebar]);

  return user ? (
    <>
      <div
        className={`bg-gray-800 text-white h-screen fixed top-0 left-0 overflow-y-auto transition ease-in-out delay-150 ${
          showSidebar ? "w-64" : "w-0"
        }`}
      >
        <div className="p-4">
          <a href="#" className="text-2xl font-semibold">
            Thread2GetHer
          </a>
        </div>
        <ul className="py-4">
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="home">{t("home")}</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="profile">{t("profile")}</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#" className="block">
              Cambiar idioma
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700" onClick={() => logOut()}>
            {t("logout")}
          </li>
        </ul>
      </div>
    </>
  ) : (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`bg-gray-800 text-white h-screen fixed top-0 left-0 overflow-y-auto transition ease-in-out delay-150 ${
          showSidebar ? "w-64" : "w-0"
        }`}
      >
        <div className="p-4">
          <a href="#" className="text-2xl font-semibold">
            Thread2GetHer
          </a>
        </div>
        <ul className="py-4">
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="/login">{t("login")}</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="/login">{t("register")}</Link>
          </li>
        </ul>
      </motion.div>
    </>
  );
}
