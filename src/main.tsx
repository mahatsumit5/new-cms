import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-fkp34f1yfajuoqj7.au.auth0.com"
      clientId="cbWVFEiz6GJygdTdF9Uc96ob5196DfLz"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <App />
            <Toaster position="top-center" richColors={true} />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
