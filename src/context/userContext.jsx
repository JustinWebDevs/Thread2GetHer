import React, { createContext, useEffect, useState } from "react";
const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const saveUser = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        saveUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
