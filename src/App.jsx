import { Suspense } from "react";
import "./index.css";
import "./output.css";
import { AppRouter } from "./router/AppRouter";
import "./config/i18next.config";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <Suspense fallback="Cargando traducciones">
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </Suspense>
  );
}

export default App;
