import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import CheckLoginInfo from "./Components/CheckLoginInfo";
import PageNotFound from "./Pages/PageNotFound";
import AddBook from "./Pages/AddBook";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <CheckLoginInfo setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/addBook"
          element={<PrivateRoute element={<AddBook />} />}
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
