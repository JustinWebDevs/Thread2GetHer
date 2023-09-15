import { useState } from "react";
import { auth } from "../firebase/connections";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import logOut from "../functions/logOut";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { t } = useTranslation(["translation"]);

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });

  return user ? (
    <div>
      <Link to="profile">{t("profile")}</Link>
      <a
        onClick={logOut}
        className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        {t("logout")}
      </a>
    </div>
  ) : (
    <div>
      <Link to="login">{t("login")}</Link>
    </div>
  );
}
