import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import CheckLoginInfo from "./Components/CheckLoginInfo";
import AnimatedRoutes from "./AnimatedRoutes";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      <CheckLoginInfo setIsAuthenticated={setIsAuthenticated} />
      <AnimatedRoutes isAuthenticated={isAuthenticated} />
    </BrowserRouter>
  );
};

export default App;
