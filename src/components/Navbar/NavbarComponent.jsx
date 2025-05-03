import React, { useState, useEffect } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { BsBagPlus } from "react-icons/bs";
import "./StylesNavbar.css";
import { Link, Links, useNavigate } from "react-router-dom";
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

import { usersData } from "../Perfiles/userData-";

const NavbarComponent = () => {
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    setLoggedIn(!!loggedInUserId);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loginWithGoogle, user, isAuthentication } = authUsers();

  const products = [
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://images.stockcake.com/public/f/7/d/f7df4c36-2d58-4568-8713-2e03e833050a_large/sunny-succulent-display-stockcake.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 2,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 3,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    // {
    //   id: 4,
    //   name: "Basic Tee",
    //   href: "#",
    //   imageSrc:
    //     "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg",
    //   imageAlt: "Front of men's Basic Tee in black.",
    //   price: "$35",
    //   color: "Black",
    // },
    // {
    //   id: 5,
    //   name: "Basic Tee",
    //   href: "#",
    //   imageSrc:
    //     "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
    //   imageAlt: "Front of men's Basic Tee in black.",
    //   price: "$35",
    //   color: "Black",
    // },
    // {
    //   id: 6,
    //   name: "Basic Tee",
    //   href: "#",
    //   imageSrc:
    //     "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
    //   imageAlt: "Front of men's Basic Tee in black.",
    //   price: "$35",
    //   color: "Black",
    // },
  ];
  const handleLogin = (e) => {
    // e.preventDefault();

    // const foundUser = usersData.find(
    //   (user) => user.email === email && user.password === password
    // );

    // if (foundUser) {
    //   console.log("Usuario autenticado:", foundUser);
    //   localStorage.setItem("loggedInUserId", foundUser.id);
    //   setLoggedIn(true);
    //   handleClose();
    //   navigate("/perfiles");
    // } else {
    //   alert("Correo o contraseña incorrectos.");
    // }
    loginWithGoogle();
    handleClose();
  };

  const listTitlesHeader = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Productos", path: "/products" },
    { id: 3, title: "Contact", path: "/contact" },
    { id: 5, title: "Services", path: "/services" },
    // "Perfil" y "Nosotros" sólo si está logueado
    ...(isAuthentication
      ? [
          { id: 4, title: "Perfil", path: "/perfiles" },
          { id: 6, title: "Nosotros", path: "/nosotros" },
        ]
      : []),
  ];

  return (
    <div className="nav_container d-flex w-100 justify-content-around align-items-center py-4">
      <div className="d-flex justify-content-center align-items-center">
        <figure>
          <Link to={"/"}>
            <img
              className="w-50"
              src="../src/assets/barra_logo.png"
              alt="icono_botanic_panic"
            />
          </Link>
        </figure>
      </div>

      <div className="nav_links d-flex justify-content-center align-items-center">
        <ul className="list-unstyled d-flex gap-1 fw-bold justify-content-between align-items-center">
          {listTitlesHeader.map((item) => (
            <li key={item.id} className="rounded-3 py-2 px-3">
              <Link to={item.path} className="text-decoration-none text-black">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav_buttons d-flex gap-4 justify-content-center py-2 px-3 align-items-center">
          {user && isAuthentication ? (
            <Link
              className="flex mb-5 rounded justify-center items-center flex-column text-decoration-none list-unstyled"
              to="/perfiles"
            >
              <img
                className="w-[30%] rounded-5"
                src={user.photoURL}
                alt={user.displayName}
              />
              <span className="text-gray-900 font-semibold">
                {user.displayName}
              </span>
            </Link>
          ) : (
            <button
              onClick={handleShow}
              className="border-0 bg-transparent pb-4 m-0"
            >
              <HiOutlineUser className="fs-5" />
            </button>
          )}
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-center align-items-center border-0 pb-4 bg-transparent m-0">
            <DropdownButton
              title={<BsBagPlus className="fs-5" />}
              align="end"
              id="dropdown-menu-align-end"
              className="border-0 d-flex flex-row"
              size="lg"
              variant="transparent"
            >
              <div style={{ width: "300px" }}>
                {products?.map((product) => (
                  <div
                    key={product.id}
                    className="d-flex px-1 w-100 py-3 justify-content-between align-items-center gap-2"
                  >
                    <div className="d-flex gap-3">
                      <button>
                        <MdDeleteForever
                          className="hover:text-red-600 transition-all duration-200"
                          style={{ fontSize: "1.2rem" }}
                        />
                      </button>

                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="rounded-2 object-fit-cover"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>

                    <div className="d-flex gap-3">
                      <button>
                        <RiSubtractLine />
                      </button>
                      <span className="mx-2">1</span>
                      <button>
                        <MdOutlineAdd />
                      </button>
                    </div>
                    <div className="d-flex ml-1.5 flex-column">
                      <span>{product.name}</span>
                      <span>{product.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* <Dropdown.Item eventKey="1">Action</Dropdown.Item>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>*/}
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">
                <div className="d-flex justify-content-between align-items-center ">
                  <span>Total:</span>
                  <span className="fw-bold"> $ 100</span>
                </div>
                <div className="w-100 d-flex justify-content-center align-items-center">
                  <button
                    to={"/cart"}
                    className="text-decoration-none hover:bg-gray-300 transition-all duration-150 rounded w-100 text-center text-black"
                  >
                    Ir al Carrito
                  </button>
                </div>
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="d-flex flex-column w-100 justify-content-center align-items-center">
            <Modal.Title>Inicio de Sesión</Modal.Title>
            <Form.Text className="text-muted">
              ¿Es tu primera vez?{" "}
              <Link className="rounded-2 text-black px-3 py-2" to={"/register"}>
                Regístrate
              </Link>
            </Form.Text>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <div className="d-flex justify-content-between mt-2">
                  <Form.Text className="text-muted">
                    <Link className="rounded-2 text-black px-3 py-2" to={"/"}>
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </Form.Text>
                  <Form.Check type="checkbox" label="Mantener sesión" />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer className="container-footer d-flex flex-column justify-content-between">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Button
                className="border-0 fw-bolder"
                type="submit"
                onClick={() => handleLogin(event)}
              >
                Iniciar Sesión
              </Button>
            </Form.Group>
            <Form.Text className="text-muted">O inicia con</Form.Text>
            <Form.Group>
              <Button
                onClick={() => handleLogin(event)}
                className="d-flex justify-content-center align-items-center py-2 px-3 border-dark bg-transparent"
              >
                <FcGoogle className="fs-4" />
              </Button>
            </Form.Group>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default NavbarComponent;
