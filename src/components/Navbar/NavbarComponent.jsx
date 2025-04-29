import React, { useState, useEffect } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { BsBagPlus } from "react-icons/bs";
import "./StylesNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

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

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = usersData.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      console.log("Usuario autenticado:", foundUser);
      localStorage.setItem("loggedInUserId", foundUser.id);
      setLoggedIn(true);
      handleClose();
      navigate("/perfiles");
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  };

  const listTitlesHeader = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Productos", path: "/products" },
    { id: 3, title: "Contact", path: "/contact" },
    { id: 5, title: "Services", path: "/services" },
    // "Perfil" y "Nosotros" sólo si está logueado
    ...(loggedIn ? [
      { id: 4, title: "Perfil", path: "/perfiles" },
      { id: 6, title: "Nosotros", path: "/nosotros" }
    ] : [])
  ];

  return (
    <div className="nav_container d-flex w-100 justify-content-around align-items-center py-4">
      <div className="d-flex justify-content-center align-items-center">
        <figure>
          <Link to={"/"}>
            <img className="w-50" src="../src/assets/barra_logo.png" alt="icono_botanic_panic" />
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
          {!loggedIn && (
            <button onClick={handleShow} className="border-0 bg-transparent pb-4 m-0">
              <HiOutlineUser className="fs-5" />
            </button>
          )}
          <button className="border-0 pb-4 bg-transparent m-0">
            <BsBagPlus className="fs-5" />
          </button>
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

              <Button className="w-100 mb-3 border-0 fw-bolder" type="submit">
                Iniciar Sesión
              </Button>
            </Form>
          </Modal.Body>

          <Modal.Footer className="container-footer d-flex flex-column justify-content-between">
            <Form.Text className="text-muted">O inicia con</Form.Text>
            <Form.Group>
              <Button className="d-flex justify-content-center align-items-center py-2 px-3 border-dark bg-transparent">
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
