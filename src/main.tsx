import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeWrapper } from "./context/ThemeContext.tsx";
import { AppContextWrapper } from "./context/AppContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeWrapper>
      <AppContextWrapper>
        <App />
      </AppContextWrapper>
    </ThemeWrapper>
  </React.StrictMode>
);
