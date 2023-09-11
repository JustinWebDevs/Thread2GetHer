import { useState } from "react";
import registerUser from "../functions/registerUser";
import loginWithEmail from "../functions/loginWithEmail";
import loginWithGoogle from "../functions/loginWithGoogle.js";

export default function login() {
  const [logginIn, setLogginIn] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    logginIn
      ? await loginWithEmail(email, password)
      : await registerUser(email, password);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button>Login</button>
      </form>
      {logginIn ? (
        <a onClick={() => setLogginIn(false)}>Registrarse</a>
      ) : (
        <a onClick={() => setLogginIn(true)}>Iniciar sesion</a>
      )}
      <a onClick={() => loginWithGoogle()}>Iniciar sesion con Google</a>
    </div>
  );
}
