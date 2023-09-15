import { useNavigate } from "react-router-dom";
import { useState } from "react";
import registerUser from "../functions/registerUser";
import loginWithEmail from "../functions/loginWithEmail";
import loginWithGoogle from "../functions/loginWithGoogle.js";
import { useTranslation } from "react-i18next";

export default function login() {
  const { t } = useTranslation(["translation"]);
  const [logginIn, setLogginIn] = useState(true);

  const history = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    logginIn
      ? await loginWithEmail(email, password).then(() => {
          history("/home");
        })
      : await registerUser(email, password);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">
        {logginIn ? t("login") : t("register")}
      </h1>
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
      {logginIn ? (
        <a
          onClick={() => setLogginIn(false)}
          className="text-blue-500 cursor-pointer"
        >
          {t("register")}
        </a>
      ) : (
        <a
          onClick={() => setLogginIn(true)}
          className="text-blue-500 cursor-pointer"
        >
          {t("login")}
        </a>
      )}
      <a
        onClick={() => loginWithGoogle()}
        className="text-blue-500 cursor-pointer block mt-2"
      >
        {t("loginWithGoogle")}
      </a>
    </div>
  );
}
