import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/userContext";
import Thread from "../components/Thread";

export default function Profile() {
  const { user, saveUser } = useContext(UserContext);
  const { t } = useTranslation(["translation"]);

  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(user);
    console.log(user);
  }, [user]);

  // const handleUserData = (e) => {
  //   // e.preventDefault();
  //   const value = e.target.value;
  //   let temporalUserData = { ...user, [e.target.name]: value };
  //   setCurrentUser(temporalUserData);
  //   console.log("USER HANDLE", temporalUserData);
  // };

  // const saveUserData = (e) => {
  //   e.preventDefault();
  //   saveUser(currentUser);
  // };

  return (
    <div
      className="container-profile"
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxHeight: "380px",
          minHeight: "380px",
          marginBottom: "70px",
          backgroundImage: `url("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <img
          src={`https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=`}
          style={{
            position: "relative",
            borderRadius: "50%",
            maxHeight: "100px",
            maxWidth: "100px",
            height: "100%",
            width: "100%",
            bottom: "-330px",
            left: "calc(50% - 50px)",
            right: "calc(50% - 50px)",
            zIndex: 1,
          }}
        />
      </div>

      <h2 className="text-3xl font-bold mb-3 text-center">
        {currentUser.name} {currentUser.lastName}
      </h2>

      <h3 className="text-xl mb-3 text-center">
        {currentUser.description || ""}
      </h3>

      <Thread title={"Aldhair Vera "} content={"A tweet is posted"} />
      <Thread />
      <Thread />
    </div>
  );
}
