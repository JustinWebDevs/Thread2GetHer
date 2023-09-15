import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <h1 className=" text-3xl ">Footer</h1>
    </>
  );
};
