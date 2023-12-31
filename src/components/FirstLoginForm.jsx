import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/connections";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// import { InterestsCard } from "./interestsCard";

export function FirstLoginForm(userId) {
  const { t } = useTranslation(["translation"]);
  const history = useNavigate();

  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(0);
  const [born, setBorn] = useState(null);
  const [interest, setInterest] = useState([]);
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (born) {
      // Divide la fecha en partes (año, mes, día)
      const partesFecha = born.split("-");

      // Obtiene el año, mes y día de la fecha de nacimiento
      const anioNacimiento = parseInt(partesFecha[0]);
      const mesNacimiento = parseInt(partesFecha[1]) - 1; // Los meses en JavaScript van de 0 a 11
      const diaNacimiento = parseInt(partesFecha[2]);

      // Obtiene la fecha actual
      const fechaActual = new Date();

      // Calcula la fecha de nacimiento
      const fechaNac = new Date(anioNacimiento, mesNacimiento, diaNacimiento);

      // Calcula la diferencia en milisegundos entre la fecha actual y la fecha de nacimiento
      const diferenciaMilisegundos = fechaActual - fechaNac;

      // Calcula la edad en años
      let calculate = Math.floor(
        diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365.25)
      );
      setAge(calculate);
      console.log(calculate);
      console.log(progress);
    }
  }, [born]);

  // useEffect(() => {
  //   (async () => {
  //     if (progress === 3) await addUser();
  //   })();
  // }, [progress]);

  const addUser = async (e) => {
    e.preventDefault();

    try {
      await setDoc(doc(db, `users/${userId.userId}`), {
        first: name,
        last: lastName,
        born: born,
        age: age,
        gender: gender,
        interest: interest,
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

  const backStep = (e) => {
    e.preventDefault();
    setProgress(progress - 1);
  };

  const firstStep = (e) => {
    e.preventDefault();
    if (isValidData(name) && isValidData(lastName)) setProgress(progress + 1);
  };

  const secondStep = (e) => {
    e.preventDefault();
    if (gender > 0 && born) setProgress(progress + 1);
  };

  const thirdStep = async (e) => {
    e.preventDefault();
    if (interest.length > 0) {
      setProgress(progress + 1);
      await addUser(e);
    }
  };

  const addToArray = (x) => {
    if (interest.includes(x)) {
      const newInterest = interest.filter((elemento) => elemento !== x);

      setInterest(newInterest);
    } else {
      setInterest([...interest, x]);
    }
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
        } self-start h-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-300 mb-4 lg:mb-8 transition-all`}
      ></div>

      <form className="my-4">
        {/* Primer Form */}
        <h1
          className={` ${
            progress == 0 ? "" : "hidden"
          } text-4xl lg:text-4xl my-8 lg:my-12 text-center font-bold text-white`}
        >
          {t("firstLogin.welcome")}
        </h1>
        <div
          className={` ${
            progress == 0 ? "" : "hidden"
          } flex flex-col items-center justify-center h-full `}
        >
          <div className="flex align-baseline m-2">
            <label htmlFor="name">{t("firstLogin.name")}</label>
            <input
              type="text"
              placeholder="John"
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
            onClick={(e) => firstStep(e)}
          >
            <FaArrowRightLong />
          </button>
        </div>
        {/* Primer Form */}

        {/* Segundo Form */}
        <h1
          className={` ${
            progress == 1 ? "" : "hidden"
          } text-4xl lg:text-4xl my-8 lg:my-12 text-center font-bold text-white`}
        >
          {t("firstLogin.about")}
        </h1>
        <div
          className={` ${
            progress == 1 ? "" : "hidden"
          } flex flex-col items-center justify-center h-full `}
        >
          <div className="flex align-baseline m-2">
            <label htmlFor="gender">{t("firstLogin.gender")}</label>
            <select
              name="gender"
              id="gender"
              required
              className="border-2 focus:outline-none focus:border-blue-700 w-9/12 lg:w-3/6 mx-2 px-2 text-base text-slate-900"
              onChange={(e) => setGender(e.target.value)}
            >
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
              onClick={(e) => backStep(e)}
            >
              <FaArrowLeftLong />
            </button>
            {/* Todo: Este boton lanza el formulario por algun motivo 🤔🤔 */}
            <button
              className=" bg-blue-400 hover:bg-blue-500 py-2 px-4 text-white rounded my-4"
              onClick={(e) => secondStep(e)}
            >
              <FaArrowRightLong />
            </button>
          </div>
        </div>
        {/* Segundo Form */}

        {/* Tercer Form */}
        <h1
          className={` ${
            progress == 2 ? "" : "hidden"
          } text-4xl lg:text-4xl my-8 lg:my-12 text-center font-bold text-white`}
        >
          {t("firstLogin.interests")}
        </h1>
        <div
          className={` ${
            progress == 2 ? "" : "hidden"
          } flex flex-col items-center justify-center h-full `}
        >
          <div className="flex align-baseline m-2">
            {/* <InterestsCard /> */}
            <div className="flex">
              <input
                type="checkbox"
                name="interest"
                value="1"
                onClick={(e) => {
                  addToArray(1);
                }}
              />
              <label className="ml-2">Cine</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                name="interest"
                value="2"
                onClick={(e) => {
                  addToArray(2);
                }}
              />
              <label className="ml-2">Musica</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                name="interest"
                value="3"
                onClick={(e) => {
                  addToArray(3);
                }}
              />
              <label className="ml-2">Mascotas</label>
            </div>
          </div>
          <div className="flex align-baseline m-2"></div>
          <div className="flex justify-around w-2/4">
            <button
              className=" bg-blue-400 hover:bg-blue-500 py-2 px-4 text-white rounded my-4"
              onClick={(e) => backStep(e)}
            >
              <FaArrowLeftLong />
            </button>
            <button
              type="submit"
              className=" bg-blue-400 hover:bg-blue-500 py-2 px-4 text-white rounded my-4"
              onClick={(e) => thirdStep(e)}
            >
              Enviar
            </button>
          </div>
        </div>
        {/* tercer Form */}
        {/* {progress == 3 && (
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {t("addUser")}
          </button>
        )} */}
      </form>
    </div>
  );
}
