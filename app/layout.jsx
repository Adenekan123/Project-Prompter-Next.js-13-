"use client"

import "@styles/globals.css";

import { Provider as ReduxProvider } from "react-redux";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

import { store } from "@store/store";

export const metadat = {
  title: "Promptopia",
  description: "Dicover & share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <ReduxProvider store={store}>
              <Nav />
              {children}
            </ReduxProvider>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
