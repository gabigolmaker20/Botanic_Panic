import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutComponent from "../components/Layout/LayoutComponent";
import ContactComponent from "../components/Contact/ContactComponent";
import Home from "../components/home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Equipo from "../components/Nosotros/NosotrosComponent";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactComponent/>}/>
          <Route path="/nosotros" element={<Equipo/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
