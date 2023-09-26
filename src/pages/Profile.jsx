import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/userContext";
import Thread from "../components/Thread";

export default function Profile() {
  const { user, saveUser } = useContext(UserContext);
  const { t, i18n } = useTranslation(["translation"]);
  const [language, setLanguage] = useState(i18n.language || "es");

  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(user);
    console.log(user);
  }, [user]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // TODO: Get current language by code
  const getCurrentLanguage = () => {
    return i18n.language;
  };

  const handleUserData = (e) => {
    // e.preventDefault();
    const value = e.target.value;
    let temporalUserData = { ...user, [e.target.name]: value };
    setCurrentUser(temporalUserData);
    console.log("USER HANDLE", temporalUserData);
  };

  const saveUserData = (e) => {
    e.preventDefault();
    saveUser(currentUser);
  };

  return (
    <div
      className="container-profile"
      style={{
        minHeight: "100vh",
      }}
    >
      <h1 className="text-3xl font-bold mb-3">{t("profile")}</h1>

      <h2 className="text-2xl font-bold mb-3">Language</h2>
      <p>
        {t("language")}:{" "}
        {getCurrentLanguage() === "en" ? t("english") : t("spanish")}
      </p>
      <div className="flex justify-evenly mw-50">
        <button
          className={`${
            language === "es" ? "bg-gray-600" : "bg-gray-500"
          } text-white text-base font-medium container-profile w-40-p rounded-20-px transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
          onClick={() => {
            changeLanguage("es");
          }}
        >
          {t("spanish")}
        </button>
        <button
          className={`${
            language === "en" ? "bg-gray-600" : "bg-gray-500"
          } text-white text-base font-medium container-profile w-40-p rounded-20-px transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
          onClick={() => {
            changeLanguage("en");
          }}
        >
          {t("english")}
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-3">Personal Data</h2>

      <form style={{ width: "50%" }}>
        <input
          type="text"
          placeholder={t("name")}
          name="name"
          value={currentUser.name}
          onChange={handleUserData}
          className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />

        <input
          type="text"
          placeholder={t("lastName")}
          name="lastName"
          value={currentUser.lastName}
          onChange={handleUserData}
          className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />

        <button
          type="submit"
          onClick={(e) => saveUserData(e)}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Save Personal Data
        </button>
      </form>

      <Thread title={"Aldhair Vera "} content={"A tweet is posted"}/>
      <Thread />
      <Thread />
    </div>
  );
}
