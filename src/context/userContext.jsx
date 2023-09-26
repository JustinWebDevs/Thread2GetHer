import React, { createContext, useEffect, useState } from "react";
const UserContext = createContext();

const temp = {
  image:
    "https://media.licdn.com/dms/image/C4D03AQH_zPwUiWQImg/profile-displayphoto-shrink_800_800/0/1654614335812?e=1701302400&v=beta&t=hZAJCC-mSi0BTEGLd8sRwHTZ3Tfe-MuausZNi1aA6Gc",
  background:
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
};

function UserProvider({ children }) {
  const [user, setUser] = useState({ ...temp });

  useEffect(() => {
    // localStorage.removeItem("user");
    let tempUser = localStorage.getItem("user");

    if (tempUser) {
      setUser(JSON.parse(tempUser));
    }
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
