import { Suspense } from "react";
import "./index.css";
import "./output.css";
import { AppRouter } from "./router/AppRouter";
import "./config/i18next.config";

function App() {
  return (
    <Suspense fallback="Cargando traducciones">
      <AppRouter />
    </Suspense>
  );
}

export default App;
