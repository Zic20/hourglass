import React, { Suspense } from "react";
import "./App.css";
import { RouterProvider } from "react-router";
import routes from "./modules/routes";

function App() {
  return (
    <Suspense>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
