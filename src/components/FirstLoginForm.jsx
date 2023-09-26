import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/connections";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function FirstLoginForm(userId) {
  const { t } = useTranslation(["translation"]);

  const [progress, setProgress] = useState(0);

  const addUser = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const lastName = e.target.lastName.value;

    try {
      await setDoc(doc(db, `users/${userId}`), {
        first: name,
        last: lastName,
        born: 1815,
        age: 20,
        gender: 1,
        interest: [2, 3],
        userName: "Enated",
      });

      history(`/home`);
      // let data = {
      //   name,
      //   lastName,
      // };
      // // En caso se puedan perder datos de alguna forma, se pueden grabar de manera local
      // // localStorage.setItem("personalInfo", `${name}-${lastName}`);
      // saveUser(data);
      // console.log(docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className=" bg-gradient-to-r from-blue-500 to-blue-600 h-screen w-full flex flex-col items-center text-white font-bold text-3xl lg:text-5xl text-center mb-4 lg:mb-8">
      <div
        className={`${progress == 0 ? "w-1/3"} self-start h-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-300 mb-4 lg:mb-8 transition-all`}></div>

      <h1 className="text-4xl lg:text-4xl mb-4 lg:mb-8 text-center font-bold text-white">
        {t("welcome")}
      </h1>

      <form onSubmit={addUser} className="my-4">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex align-baseline m-2">
            <label htmlFor="name">{t("name")}</label>
            <input
              type="text"
              placeholder="Jonh"
              name="name"
              required
              className="border-2 focus:outline-none focus:border-blue-700 w-9/12 lg:w-3/6 mx-2 px-2 text-base text-slate-900"
            />
          </div>
          <div className="flex align-baseline m-2">
            <label htmlFor="lastName">{t("lastName")}</label>
            <input
              type="text"
              placeholder="Smith"
              name="lastName"
              required
              className="border-2 focus:outline-none focus:border-blue-700 w-9/12 lg:w-3/6 mx-2 px-2 text-base text-slate-900"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          {t("addUser")}
        </button>
      </form>
    </div>
  );
}
