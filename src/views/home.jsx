import logOut from "../functions/logOut";

export default function login(userData) {
  console.log(userData);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">
        Hola {userData.user.displayName}
      </h1>
      <a
        onClick={logOut}
        className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Cerrar sesion
      </a>
    </div>
  );
}
