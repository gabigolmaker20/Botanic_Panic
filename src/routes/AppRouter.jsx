import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LayoutComponent from "../components/Layout/LayoutComponent";
import ContactComponent from "../components/Contact/ContactComponent";
import NosotrosComponent from "../components/Nosotros/NosotrosComponent";
import Home from "../components/home/Home";
import Products from "../components/listProducts/Products";
import Perfiles from "../components/Perfiles/ProfilePage";
import 'bootstrap/dist/css/bootstrap.min.css';

// Función para verificar si el usuario está logueado
const isAuthenticated = () => {
  return !!localStorage.getItem("loggedInUserId"); // Devuelve true si hay usuario
};

// Componente para proteger rutas
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<ContactComponent />} />

          {/* Rutas protegidas */}
          <Route
            path="/perfiles"
            element={
              <PrivateRoute>
                <Perfiles />
              </PrivateRoute>
            }
          />
          <Route
            path="/nosotros"
            element={
              <PrivateRoute>
                <NosotrosComponent />
              </PrivateRoute>
            }
          />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
