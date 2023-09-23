import { db } from "../firebase/connections";
import { doc, setDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function FirstLogin() {
  const { userId } = useParams();
  console.log(useParams());
  const addUser = async () => {
    try {
      const docRef = await setDoc(doc(db, `users/${1}`), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
        age: 20,
      });
      console.log(docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <form>
        <input type="text" placeholder="Nombre" />
        <button onClick={addUser}>Add User</button>
      </form>
    </>
  );
}
