import logOut from "../functions/logOut";

export default function login(userData) {
  console.log(userData);

  return (
    <div>
      <h1>Hola {userData.user.displayName}</h1>
      <a onClick={logOut}>Cerrar sesion</a>
    </div>
  );
}
