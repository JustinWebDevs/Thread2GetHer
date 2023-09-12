import { useNavigate } from "react-router-dom";
import { useState } from "react";
import registerUser from "../functions/registerUser";
import loginWithEmail from "../functions/loginWithEmail";
import loginWithGoogle from "../functions/loginWithGoogle.js";

export default function login() {
  const [logginIn, setLogginIn] = useState(true);

  const history = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    logginIn
      ? await loginWithEmail(email, password).then(() => {
          history("/home");
        })
      : await registerUser(email, password);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">
        {logginIn ? "Iniciar sesión" : "Registrarse"}
      </h1>
      <form onSubmit={submitHandler} className="mb-4">
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </form>
      {logginIn ? (
        <a
          onClick={() => setLogginIn(false)}
          className="text-blue-500 cursor-pointer">
          Registrarse
        </a>
      ) : (
        <a
          onClick={() => setLogginIn(true)}
          className="text-blue-500 cursor-pointer">
          Iniciar sesión
        </a>
      )}
      <a
        onClick={() => loginWithGoogle()}
        className="text-blue-500 cursor-pointer block mt-2">
        Iniciar sesión con Google
      </a>
    </div>
  );
}
