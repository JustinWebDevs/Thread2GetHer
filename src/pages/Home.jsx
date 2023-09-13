import logOut from "../functions/logOut";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation(["translation"]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">Hola</h1>
      <a
        onClick={logOut}
        className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        {t("logout")}
      </a>
    </div>
  );
}
