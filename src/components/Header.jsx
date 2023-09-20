import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { BiSearchAlt } from "react-icons/bi";

export function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="header p-2 flex flex-row justify-between items-center sticky top-0 bg-gray-600 text-white ">
        <div
          className="profile rounded-full bg-red-400 w-12 h-12"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
        ></div>
        <h1 className=" text-2xl font-semibold">Thread2GetHer</h1>
        <h1 className="text-xl flex justify-content-center align-items-center">
          <BiSearchAlt style={{ marginTop: "5px" }} />
          Buscar
        </h1>
      </div>
      <div>
        <div
          className={`bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 ${
            showSidebar ? "" : "hidden"
          } `}
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
        ></div>
        <Sidebar showSidebar={showSidebar} />
      </div>
    </>
  );
}
