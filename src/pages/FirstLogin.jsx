import { useEffect } from "react";
import { db, auth } from "../firebase/connections";
import { doc, setDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import logOut from "../functions/logOut";

// import { UserContext } from "../context/userContext";

export default function FirstLogin() {
  // const { saveUser } = useContext(UserContext);

  const history = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (userId != currentUser.uid) {
        logOut();
        history(`/login`);
      }
    });
  }, []);

  const addUser = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const lastName = e.target.lastName.value;

    try {
      const docRef = await setDoc(doc(db, `users/${userId}`), {
        first: name,
        last: lastName,
        born: 1815,
        age: 20,
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
    <>
      <form onSubmit={addUser}>
        <input type="text" placeholder="Nombre" name="name" required />
        <input type="text" placeholder="Apellido" name="lastName" required />
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add User
        </button>
      </form>
    </>
  );
}
