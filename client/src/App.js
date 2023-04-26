import Nav from "./components/Nav";
import { useRoutes } from "react-router-dom";
import React from "react";

import routes from "./routes";

function App() {
  const element = useRoutes(routes);

  return (
    <div>
      <Nav />
      {element}
    </div>
  );
}

export default App;
