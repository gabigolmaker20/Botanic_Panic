import React from "react";
import { useState, useEffect } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import "./StylesNavbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { MdOutlineAdd } from "react-icons/md";
import { RiSubtractLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { authUsers } from "../../zustand/authUsers";
import { motion } from "framer-motion";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { IoLeafOutline, IoChevronDownOutline, IoArrowForward } from "react-icons/io5";

const NavbarComponent = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [showProductsMenu, setShowProductsMenu] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Categorías de productos para el submenú
  const productCategories = [
    { name: "Plantas de Interior", count: 24, path: "/products/interior" },
    { name: "Plantas de Exterior", count: 18, path: "/products/exterior" },
    { name: "Accesorios", count: 12, path: "/products/accesorios" },
    { name: "Macetas", count: 15, path: "/products/macetas" },
    { name: "Fertilizantes", count: 8, path: "/products/fertilizantes" },
  ];

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    setLoggedIn(!!loggedInUserId);

    // Detectar scroll para cambiar el estilo de la navbar
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Establecer el elemento activo basado en la ruta actual
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActiveItem("Home");
    else if (path === "/products" || path.startsWith("/products/")) setActiveItem("Productos");
    else if (path === "/contact") setActiveItem("Contact");
    else if (path === "/nosotros") setActiveItem("Nosotros");
    else if (path === "/profile") setActiveItem("Profile");
    else if (path === "/cart") setActiveItem("Carrito");
  }, [location]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loginWithGoogle, loginWithEmailAndPassword, user, isAuthentication } =
    authUsers();

  const products = [
    {
      id: 1,
      name: "Suculenta",
      href: "#",
      imageSrc:
        "https://images.stockcake.com/public/f/7/d/f7df4c36-2d58-4568-8713-2e03e833050a_large/sunny-succulent-display-stockcake.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$5000",
      color: "Black",
    },
    {
      id: 2,
      name: "Cinta",
      href: "#",
      imageSrc:
        "https://cdn.pixabay.com/photo/2014/12/29/14/23/potted-plants-582820_1280.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$5200",
      color: "Black",
    },
    {
      id: 7,
      name: "Romero",
      href: "#",
      imageSrc:
        "https://cdn.pixabay.com/photo/2022/04/30/18/05/rosemary-7166091_1280.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$8600",
      color: "Black",
    },
  ];

  const handleLoginEmailAndPasswod = () => {
    loginWithEmailAndPassword(email, password);
    handleClose();
  };

  const handleLogin = (e) => {
    loginWithGoogle();
    handleClose();
  };

  const listTitlesHeader = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Productos", path: "/products", hasSubmenu: true },
    { id: 3, title: "Contact", path: "/contact" },
    { id: 4, title: "Carrito", path: "/cart" },
    ...(isAuthentication
      ? [
          { id: 6, title: "Nosotros", path: "/nosotros" },
          { id: 7, title: "Profile", path: "/profile" },
        ]
      : []),
  ];

  return (
    <nav
      className={`nav_container w-100 fixed-top transition-all duration-300 ${
        scrolled ? "py-2 bg-white shadow-sm" : "py-4 bg-[#f8f7f2]"
      }`}
    >
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <motion.div
            className="d-flex align-items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="d-flex align-items-center text-decoration-none"
            >
              <div className="me-2 position-relative">
                <div
                  className="d-flex justify-content-center align-items-center rounded-circle bg-gradient-to-br from-green-400 to-green-600"
                  style={{ width: "40px", height: "40px" }}
                >
                  <IoLeafOutline
                    className="text-white"
                    style={{ fontSize: "1.5rem" }}
                  />
                </div>
              </div>
              <div className="d-flex flex-column">
                <span className="fw-bold fs-4 text-green-700 lh-1">
                  BOTANIC
                </span>
                <span className="fw-bold fs-4 text-amber-500 lh-1">PANIC</span>
              </div>
            </Link>
          </motion.div>

          {/* Navigation Links - Desktop */}
          <div className="nav_links d-none d-md-flex align-items-center">
            <ul className="list-unstyled d-flex mb-0 fw-medium">
              {listTitlesHeader.map((item) => (
                <li 
                  key={item.id} 
                  className="position-relative mx-2"
                  onMouseEnter={() => {
                    if (item.hasSubmenu) setShowProductsMenu(true);
                  }}
                  onMouseLeave={() => {
                    if (item.hasSubmenu) setShowProductsMenu(false);
                  }}
                >
                  <Link
                    to={item.path}
                    className={`text-decoration-none text-dark px-3 py-2 d-block rounded-pill transition-all ${
                      activeItem === item.title
                        ? "text-green-700 bg-green-50"
                        : "text-gray-700 hover:bg-gray-100"
                    } ${item.hasSubmenu ? "d-flex align-items-center" : ""}`}
                  >
                    {item.title}
                    {item.hasSubmenu && (
                      <IoChevronDownOutline className="ms-1" style={{ fontSize: "0.8rem" }} />
                    )}
                  </Link>
                  
                  {/* Submenú de Productos */}
                  {item.hasSubmenu && showProductsMenu && (
                    <motion.div 
                      className="position-absolute start-0 mt-1 bg-white rounded-3 shadow-lg py-2"
                      style={{ 
                        width: "280px", 
                        zIndex: 1000,
                        border: "1px solid rgba(0,0,0,0.08)"
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {productCategories.map((category, index) => (
                        <Link 
                          key={index}
                          to={category.path}
                          className="d-flex justify-content-between align-items-center px-4 py-2 text-decoration-none text-dark hover-bg-light"
                          style={{ transition: "all 0.2s" }}
                        >
                          <span>{category.name}</span>
                          <span 
                            className="badge rounded-pill"
                            style={{ 
                              backgroundColor: "#f0f0f0", 
                              color: "#666",
                              fontWeight: "normal"
                            }}
                          >
                            {category.count}
                          </span>
                        </Link>
                      ))}
                      <div className="border-top mt-2 pt-2">
                        <Link 
                          to="/products"
                          className="d-flex align-items-center px-4 py-2 text-decoration-none"
                          style={{ color: "#3a9a47" }}
                        >
                          <span>Ver todos los productos</span>
                          <IoArrowForward className="ms-1" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeItem === item.title && (
                    <motion.div
                      className="position-absolute bottom-0 start-0 bg-green-500"
                      style={{ height: "2px", width: "100%" }}
                      layoutId="navIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right side icons */}
          <div className="d-flex align-items-center">
            {/* Search Icon */}
            <motion.button
              className="btn btn-link text-decoration-none p-2 rounded-circle me-1 text-gray-700 hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiSearch style={{ fontSize: "1.2rem", color: "black" }} />
            </motion.button>

            {/* User Profile/Login */}
            {user && isAuthentication ? (
              <motion.div
                className="position-relative mx-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  className="d-flex align-items-center text-decoration-none"
                  to="/profile"
                >
                  <div className="position-relative">
                    <img
                      className="rounded-circle object-fit-cover border border-2 border-green-200"
                      src={user.photoURL || "https://robohash.org/stefan-one"}
                      alt={user.displayName || "Botanic"}
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div
                      className="position-absolute bottom-0 end-0 bg-green-500 rounded-circle border border-2 border-white"
                      style={{ width: "12px", height: "12px" }}
                    ></div>
                  </div>
                  <span className="ms-2 d-none d-lg-block fw-semibold text-gray-800">
                    {user.displayName
                      ? user.displayName.split(" ")[0]
                      : "Botanic"}
                  </span>
                </Link>
              </motion.div>
            ) : (
              <motion.button
                onClick={handleShow}
                className="btn text-black btn-link text-decoration-none p-2 rounded-circle me-1 text-gray-700 hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiOutlineUser style={{ fontSize: "1.2rem" }} />
              </motion.button>
            )}

            {/* Shopping Cart */}
            <motion.div
              className="position-relative mx-2 text-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <DropdownButton
                title={
                  <FiShoppingBag
                    className="text-black"
                    style={{ fontSize: "1.2rem" }}
                  />
                }
                align="end"
                id="dropdown-menu-align-end"
                className="border-0 d-flex justify-content-center text-black"
                variant="black"
              >
                <div
                  style={{
                    width: "320px",
                    maxHeight: "400px",
                    overflowY: "auto",
                  }}
                >
                  <div className="p-3 border-bottom">
                    <h6 className="fw-bold mb-0">Tu Carrito</h6>
                    <small className="text-muted">
                      {products.length} productos
                    </small>
                  </div>

                  {products?.map((product) => (
                    <div
                      key={product.id}
                      className="d-flex p-3 border-bottom w-100 align-items-center"
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{ width: "60%" }}
                      >
                        <button className="btn btn-link text-decoration-none p-1 text-danger">
                          <MdDeleteForever style={{ fontSize: "1.2rem" }} />
                        </button>

                        <img
                          src={product.imageSrc || "/placeholder.svg"}
                          alt={product.imageAlt}
                          className="rounded object-fit-cover ms-2"
                          style={{ width: "50px", height: "50px" }}
                        />

                        <div className="ms-2">
                          <div className="fw-medium">{product.name}</div>
                          <div className="text-green-600 fw-bold">
                            {product.price}
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center ms-auto">
                        <button className="btn btn-sm btn-outline-secondary rounded-circle p-1">
                          <RiSubtractLine />
                        </button>
                        <span className="mx-2 fw-medium">1</span>
                        <button className="btn btn-sm btn-outline-secondary rounded-circle p-1">
                          <MdOutlineAdd />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <Dropdown.Divider />
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Total:</span>
                    <span className="fw-bold fs-5 text-green-700">$18,800</span>
                  </div>
                  <button
                    onClick={() => navigate("/cart")}
                    className="btn btn-success w-100 rounded-pill fw-medium"
                    style={{
                      backgroundColor: "#3a9a47",
                      borderColor: "#3a9a47",
                    }}
                  >
                    Ir al Carrito
                  </button>
                </div>
              </DropdownButton>

              {products.length > 0 && (
                <div className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger">
                  {products.length}
                </div>
              )}
            </motion.div>

            {/* Mobile menu button */}
            <button
              className="btn btn-link text-decoration-none p-2 d-md-none text-gray-700"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasNavbar"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold">
            <span className="text-green-700">BOTANIC</span>{" "}
            <span className="text-amber-500">PANIC</span>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            {listTitlesHeader.map((item) => (
              <li className="nav-item" key={item.id}>
                {item.hasSubmenu ? (
                  <div>
                    <Link
                      className={`nav-link py-2 px-3 rounded-3 mb-1 d-flex justify-content-between align-items-center ${
                        activeItem === item.title
                          ? "bg-green-50 text-green-700"
                          : ""
                      }`}
                      to={item.path}
                      data-bs-dismiss="offcanvas"
                    >
                      {item.title}
                      <IoChevronDownOutline style={{ fontSize: "0.8rem" }} />
                    </Link>
                    <div className="ms-3 mb-2">
                      {productCategories.map((category, index) => (
                        <Link 
                          key={index}
                          to={category.path}
                          className="d-flex justify-content-between align-items-center py-1 px-3 text-decoration-none text-dark rounded-3"
                          data-bs-dismiss="offcanvas"
                        >
                          <span className="small">{category.name}</span>
                          <span 
                            className="badge rounded-pill"
                            style={{ 
                              backgroundColor: "#f0f0f0", 
                              color: "#666",
                              fontWeight: "normal",
                              fontSize: "0.7rem"
                            }}
                          >
                            {category.count}
                          </span>
                        </Link>
                      ))}
                      <Link 
                        to="/products"
                        className="d-flex align-items-center py-1 px-3 text-decoration-none small"
                        style={{ color: "#3a9a47" }}
                        data-bs-dismiss="offcanvas"
                      >
                        <span>Ver todos los productos</span>
                        <IoArrowForward className="ms-1" style={{ fontSize: "0.8rem" }} />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    className={`nav-link py-2 px-3 rounded-3 mb-1 ${
                      activeItem === item.title
                        ? "bg-green-50 text-green-700"
                        : ""
                    }`}
                    to={item.path}
                    data-bs-dismiss="offcanvas"
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
            <li className="nav-item mt-3">
              {user && isAuthentication ? (
                <Link
                  className="d-flex align-items-center text-decoration-none p-2"
                  to="/profile"
                  data-bs-dismiss="offcanvas"
                >
                  <img
                    className="rounded-circle me-2"
                    src={user.photoURL || "https://robohash.org/stefan-one"}
                    alt={user.displayName || "Botanic"}
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div>
                    <div className="fw-medium">
                      {user.displayName || "Botanic"}
                    </div>
                    <small className="text-muted">{user.email}</small>
                  </div>
                </Link>
              ) : (
                <button
                  onClick={handleShow}
                  className="btn btn-outline-success w-100 rounded-pill"
                  data-bs-dismiss="offcanvas"
                >
                  Iniciar Sesión
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Login Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="border-0 pb-0">
          <div className="w-100 text-center">
            <Modal.Title className="fw-bold">
              <span className="text-green-700">Iniciar Sesión</span>
            </Modal.Title>
            <p className="text-muted mt-2 mb-0">
              ¿Es tu primera vez?{" "}
              <Link
                className="text-green-600 fw-medium"
                to={"/register"}
                onClick={handleClose}
              >
                Regístrate
              </Link>
            </p>
          </div>
        </Modal.Header>

        <Modal.Body className="px-4">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleLoginEmailAndPasswod();
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-pill py-2"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-pill py-2"
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
              <Form.Check
                type="checkbox"
                label="Mantener sesión"
                id="remember-me"
              />
              <Link
                className="text-green-600 fw-medium small"
                to={"/"}
                onClick={handleClose}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-100 rounded-pill py-2 fw-medium"
              style={{ backgroundColor: "#3a9a47", borderColor: "#3a9a47" }}
            >
              Iniciar Sesión
            </Button>
          </Form>

          <div className="text-center my-3">
            <span className="text-muted">O continúa con</span>
          </div>

          <Button
            onClick={handleLogin}
            className="w-100 rounded-pill py-2 d-flex justify-content-center align-items-center bg-white text-dark border"
          >
            <FcGoogle className="me-2" style={{ fontSize: "1.2rem" }} />
            <span>Google</span>
          </Button>
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default NavbarComponent;