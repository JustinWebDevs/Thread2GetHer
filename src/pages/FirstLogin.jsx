import { useEffect } from "react";
import { auth } from "../firebase/connections";
import { useParams, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import logOut from "../functions/logOut";
import { FirstLoginForm } from "../components/FirstLoginForm";

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

  return (
    <>
      <FirstLoginForm />
    </>
  );
}
