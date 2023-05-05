import React, { Suspense } from "react";
import "./App.css";
import { RouterProvider } from "react-router";
import routes from "./modules/routes";
import NewAuthProvider from "./store/NewAuthProvider";

function App() {
  return (
    <Suspense>
      <NewAuthProvider>
        <RouterProvider router={routes} />
      </NewAuthProvider>
    </Suspense>
  );
}

export default App;
