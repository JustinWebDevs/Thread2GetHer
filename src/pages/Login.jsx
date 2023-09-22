import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginWithEmail from "../functions/loginWithEmail";
import loginWithGoogle from "../functions/loginWithGoogle.js";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { auth } from "../firebase/connections";
import { onAuthStateChanged } from "firebase/auth";

export default function Login() {
  const { t } = useTranslation(["translation"]);

  const history = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        history("/home");
      } else {
        // setUser(null);
      }
    });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    await loginWithEmail(email, password).then(() => {
      history("/home");
    });
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4">{t("login")}</h1>
      <form onSubmit={submitHandler} className="mb-4">
        <input
          type="text"
          placeholder={t("email")}
          name="email"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="password"
          placeholder={t("password")}
          name="password"
          className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
      <Link className="text-blue-500 cursor-pointer" to="/register">
        {" "}
        {t("register")}
      </Link>
      <button
        onClick={async () =>
          loginWithGoogle().then(() => {
            history("/profile");
          })
        }
        className="text-blue-500 cursor-pointer block mt-2"
      >
        {t("loginWithGoogle")}
      </button>
    </motion.div>
  );
}
