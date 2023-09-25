import { useState, useContext } from "react";
import { db } from "../firebase/connections";
import { doc, setDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function FirstLogin() {
  const { saveUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [canSave, setCanSave] = useState(false);
  const history = useNavigate();

  const handleChange = (event, value) => {
    // 👇 Get input value from "event"
    if (value === 0) {
      setName(event.target.value);
    } else {
      setLastName(event.target.value);
    }

    if (name !== "" && lastName !== "") setCanSave(true);
  };

  const addUser = async (event) => {
    event.preventDefault();
    try {
      const docRef = await setDoc(doc(db, `users/${1}`), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
        age: 20,
      });
      history(`/home/${name}-${lastName}`);
      let data = {
        name,
        lastName,
      };
      // En caso se puedan perder datos de alguna forma, se pueden grabar de manera local
      // localStorage.setItem("personalInfo", `${name}-${lastName}`);
      saveUser(data);
      console.log(docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Nombre"
          onChange={(e) => handleChange(e, 0)}
        />
        <input
          type="text"
          placeholder="Apellido"
          onChange={(e) => handleChange(e, 1)}
        />
        <button
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={!canSave}
          onClick={async (e) => addUser(e)}
        >
          {" "}
          Add User
        </button>
      </form>
    </>
  );
}
