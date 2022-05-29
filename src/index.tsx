import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/theme";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      main: string;
      grey: string;
    };
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
