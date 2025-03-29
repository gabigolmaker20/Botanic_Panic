import React from 'react'
import NavbarComponent from '../Navbar/NavbarComponent'
import FooterComponent from '../Footer/FooterComponent'
import { Outlet } from 'react-router-dom'

const LayoutComponent = () => {
  return (
    <>
      <NavbarComponent/>
      <Outlet/>
      <FooterComponent/>
    </>
  )
}

export default LayoutComponent