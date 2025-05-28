// src/routes/AppRouter.jsx
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


// QUITA las importaciones de Firebase si solo se usan para el onAuthStateChanged que vamos a eliminar
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/firebase.config";
import { authUsers } from "../zustand/authUsers"; // Tu store
import Gestionar from "../components/GestionarArchivos/GestorArchivos";
import CartView from "../components/Cart/CartView";

const AppRouter = () => {
  // Obtén solo la acción fetchUserOnLoad.
  // 'user' e 'isAuthentication' serán leídos por los componentes que los necesiten (ej. RutaProtegida)
  const fetchUser = authUsers(state => state.fetchUserOnLoad);

  useEffect(() => {
    // Llama a fetchUserOnLoad solo una vez cuando el componente AppRouter se monta.
    // Esta acción se encargará de verificar el token en localStorage y
    // actualizar el estado 'user' e 'isAuthentication' en el store.
    if (fetchUser) {
        fetchUser();
    }
  }, [fetchUser]); // La dependencia fetchUser es para que useEffect sepa si la función cambió (no debería)
                   // y para ejecutar al montar.

  // EL useEffect QUE USABA onAuthStateChanged y setUser/setIsAuthenticated DEBE SER ELIMINADO.
  // YA NO ES NECESARIO PORQUE fetchUserOnLoad MANEJA LA CARGA INICIAL DEL USUARIO
  // BASADO EN TU TOKEN JWT.

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<ContactComponent />} />
          <Route path="/cart" element={<CartView />} />

          {/* Rutas protegidas */}
          {/* RutaProtegida leerá 'isAuthentication' directamente del store */}
          <Route element={<RutaProtegida />}>
            <Route path="/profile" element={<Perfiles />} />
            <Route path="/gestor" element={<Gestionar />} />
            <Route path="/nosotros" element={<NosotrosComponent />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;