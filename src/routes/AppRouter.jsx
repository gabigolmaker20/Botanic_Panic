import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LayoutComponent from "../components/Layout/LayoutComponent";
import ContactComponent from "../components/Contact/ContactComponent";
import NosotrosComponent from "../components/Nosotros/NosotrosComponent";
import Home from "../components/home/Home";
import Products from "../components/listProducts/Products";
import Perfiles from "../components/Perfiles/ProfilePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import RutaProtegida from "./routeProtect/RutaProtegida";
import { onAuthStateChanged } from "firebase/auth";
import { authUsers } from "../zustand/authUsers";
import { auth } from "../firebase/firebase.config";
import Gestionar from "../components/GestionarArchivos/GestorArchivos"

// Función para verificar si el usuario está logueado
// const isAuthenticated = () => {
//   return !!localStorage.getItem("loggedInUserId"); // Devuelve true si hay usuario
// };

// Componente para proteger rutas
// const PrivateRoute = ({ children }) => {
//   return isAuthenticated() ? children : <Navigate to="/" />;
// };

const AppRouter = () => {

  const { setUser, setIsAuthenticated } = authUsers();

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user);
        setIsAuthenticated(true);
      }else{
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return () => unsuscribe(); // Limpia el listener al desmontar el componente

  }, [setUser, setIsAuthenticated])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<ContactComponent />} />
          

          {/* Rutas protegidas */}

          <Route element={<RutaProtegida/>}>
            <Route path="/profile" element={<Perfiles/>} />
            <Route path="/gestor" element={<Gestionar />} />
            <Route path="/nosotros" element={<NosotrosComponent/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
