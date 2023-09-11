import { useState } from "react";
import Login from "./views/login";
import Home from "./views/home";
import { auth } from "./firebase/connections";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });

  return user ? <Home user={user} /> : <Login />;
}

export default App;
