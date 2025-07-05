import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import AddBook from "./Pages/AddBook";
import About from "./Pages/About";
import EditNotes from "./Pages/EditNotes";
import ViewNotes from "./Pages/ViewNotes";
import PageNotFound from "./Pages/PageNotFound";

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AnimatedRoutes = ({ isAuthenticated }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <PrivateRoute
              element={<Home />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/addBook"
          element={
            <PrivateRoute
              element={<AddBook />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute
              element={<About />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute
              element={<EditNotes />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/view/:id"
          element={
            <PrivateRoute
              element={<ViewNotes />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
