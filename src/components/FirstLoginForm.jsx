import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/connections";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { InterestsCard } from "./interestsCard";

export function FirstLoginForm(userId) {
  const { t } = useTranslation(["translation"]);

  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(0);
  const [born, setBorn] = useState(null);

  const addUser = async (e) => {
    e.preventDefault();

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

  const isValidData = (input) => {
    // Expresión regular para permitir solo letras (mayúsculas y minúsculas) sin espacios
    const regex = /^[a-zA-Z]+$/;
    return regex.test(input) ? true : alert(t("badData"));
  };

  const backStep = () => {
    setProgress(progress - 1);
  };

  const firstStep = () => {
    if (isValidData(name) && isValidData(lastName)) setProgress(progress + 1);
  };

  const secondStep = () => {
    if (gender > 0 && born) setProgress(progress + 1);
  };

  const thirdStep = () => {
    if (isValidData(name) && isValidData(lastName)) setProgress(progress + 1);
  };

  return (
    <div className=" bg-gradient-to-r from-blue-500 to-blue-600 h-screen w-full flex flex-col items-center text-white font-bold text-3xl lg:text-5xl text-center mb-4 lg:mb-8">
      <div
        className={`${
          progress == 0
            ? "hidden"
            : progress == 1
            ? "w-1/3"
            : progress == 2
            ? "w-2/3"
            : "w-full"
        } self-start h-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-300 mb-4 lg:mb-8 transition-all`}></div>

      <form onSubmit={addUser} className="my-4">
        {/* Primer Form */}
        <h1
          className={` ${
            progress == 0 ? "" : "hidden"
          } text-4xl lg:text-4xl my-8 lg:my-12 text-center font-bold text-white`}>
          {t("firstLogin.welcome")}
        </h1>
        <div
          className={` ${
            progress == 0 ? "" : "hidden"
          } flex flex-col items-center justify-center h-full `}>
          <div className="flex align-baseline m-2">
            <label htmlFor="name">{t("firstLogin.name")}</label>
            <input
              type="text"
              placeholder="Jonh"
              name="name"
              required
              className="border-2 focus:outline-none focus:border-blue-700 w-9/12 lg:w-3/6 mx-2 px-2 text-base text-slate-900"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex align-baseline m-2">
            <label htmlFor="lastName">{t("firstLogin.lastName")}</label>
            <input
              type="text"
              placeholder="Smith"
              name="lastName"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
              className="border-2 focus:outline-none focus:border-blue-700 w-9/12 lg:w-3/6 mx-2 px-2 text-base text-slate-900"
            />
          </div>
          <button
            className=" bg-blue-400 hover:bg-blue-500 py-2 px-4 text-white rounded my-4"
            onClick={firstStep}>
            <FaArrowRightLong />
          </button>
        </div>
        {/* Primer Form */}
        {/* Segundo Form */}
        <h1
          className={` ${
            progress == 1 ? "" : "hidden"
          } text-4xl lg:text-4xl my-8 lg:my-12 text-center font-bold text-white`}>
          {t("firstLogin.about")}
        </h1>
        <div
          className={` ${
            progress == 1 ? "" : "hidden"
          } flex flex-col items-center justify-center h-full `}>
          <div className="flex align-baseline m-2">
            <label htmlFor="gender">{t("firstLogin.gender")}</label>
            <select
              name="gender"
              id="gender"
              required
              className="border-2 focus:outline-none focus:border-blue-700 w-9/12 lg:w-3/6 mx-2 px-2 text-base text-slate-900"
              onChange={(e) => setGender(e.target.value)}>
              <option value="">{t("firstLogin.choose")}</option>
              <option value="1">{t("firstLogin.male")}</option>
              <option value="2">{t("firstLogin.female")}</option>
              <option value="3">{t("firstLogin.other")}</option>
            </select>
          </div>
          <div className="flex align-baseline m-2">
            <label htmlFor="born">{t("firstLogin.born")}</label>
            <input
              type="date"
              name="born"
              required
              className="border-2 focus:outline-none focus:border-blue-700 w-9/12 lg:w-3/6 mx-2 px-2 text-base text-slate-900"
              onChange={(e) => setBorn(e.target.value)}
            />
          </div>
          <div className="flex justify-around w-2/4">
            <button
              className=" bg-blue-400 hover:bg-blue-500 py-2 px-4 text-white rounded my-4"
              onClick={backStep}>
              <FaArrowLeftLong />
            </button>
            <button
              className=" bg-blue-400 hover:bg-blue-500 py-2 px-4 text-white rounded my-4"
              onClick={secondStep}>
              <FaArrowRightLong />
            </button>
          </div>
        </div>
        {/* Segundo Form */}
        {/* tercer Form */}
        <h1
          className={` ${
            progress == 2 ? "" : "hidden"
          } text-4xl lg:text-4xl my-8 lg:my-12 text-center font-bold text-white`}>
          {t("firstLogin.interests")}
        </h1>
        <div
          className={` ${
            progress == 2 ? "" : "hidden"
          } flex flex-col items-center justify-center h-full `}>
          <div className="flex align-baseline m-2">
            <InterestsCard icon="" tittle="" description="" />
          </div>
          <div className="flex align-baseline m-2"></div>
          <div className="flex justify-around w-2/4">
            <button
              className=" bg-blue-400 hover:bg-blue-500 py-2 px-4 text-white rounded my-4"
              onClick={backStep}>
              <FaArrowLeftLong />
            </button>
            <button
              className=" bg-blue-400 hover:bg-blue-500 py-2 px-4 text-white rounded my-4"
              onClick={thirdStep}>
              <FaArrowRightLong />
            </button>
          </div>
        </div>
        {/* tercer Form */}
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hidden">
          {t("addUser")}
        </button>
      </form>
    </div>
  );
}
