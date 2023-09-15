import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t, i18n } = useTranslation(["translation"]);
  const [language, setLanguage] = useState("");

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // TODO: Get current language by code
  //   const getCurrentLanguage = () => {
  //     return i18n.getLanguage();
  //   };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">{t("profile")}</h1>
      <div>
        <button
          onClick={() => {
            changeLanguage("es");
          }}
        >
          {t("spanish")}
        </button>
        <button
          onClick={() => {
            changeLanguage("en");
          }}
        >
          {t("english")}
        </button>
      </div>

      {/* <p>
        {t("language")}:{" "}
        {getCurrentLanguage() === "en" ? t("english") : t("spanish")}
      </p> */}
    </div>
  );
}
