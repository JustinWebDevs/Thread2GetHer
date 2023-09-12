import { Outlet, Link } from "react-router-dom";
import { auth } from "../firebase/connections";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

export const Layout = () => {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });

  return user ? (
    <>
      <h1 className=" text-3xl ">Header</h1>
      <Link to="profile">Profile</Link>
      <Outlet />
      <h1 className=" text-3xl ">Footer</h1>
    </>
  ) : (
    <>
      <h1 className=" text-3xl ">Header</h1>
      <Link to="Login">Login</Link>
      <Outlet />
      <h1 className=" text-3xl ">Footer</h1>
    </>
  );
};
