import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SurveyProvider } from "./context/SurveyContext.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SurveyProvider>
          <App />
        </SurveyProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
