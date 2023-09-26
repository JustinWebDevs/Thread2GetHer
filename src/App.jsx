import { Suspense } from "react";
import "./index.css";
import "./output.css";
import { AppRouter } from "./router/AppRouter";
import "./config/i18next.config";
import { UserProvider } from "./context/userContext";
import { ThreadProvider } from "./context/threadContext";

function App() {
  return (
    <Suspense fallback="Cargando traducciones">
      <ThreadProvider>
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </ThreadProvider>
    </Suspense>
  );
}

export default App;
