import { HiOutlineUser } from "react-icons/hi2";
import { BsBagPlus } from "react-icons/bs";
import "./StylesNavbar.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const NavbarComponent = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const listTitlesHeader = [
    {
      id: 1,
      title: "Home",
      path: "/",
    },
    {
      id: 2,
      title: "About",
      path: "/about",
    },
    {
      id: 3,
      title: "Contact",
      path: "/contact",
    },
    {
      id: 4,
      title: "Blog",
      path: "/blog",
    },
    {
      id: 5,
      title: "Services",
      path: "/services",
    },
    {
      id: 6,
      title: "Portfolio",
      path: "/portfolio",
    },
  ];
  return (
    <div className="nav_container d-flex bg- w-100 justify-content-around align-items-center py-4">
      <div className="d-flex justify-content-center align-items-center">
        <figure>
          <img
            className="w-50"
            src="https://gardenia-blog.axiomthemes.com/wp-content/uploads/2024/01/logo-1-retina.png"
            alt="icono_botanic_panic"
          />
        </figure>
      </div>
      <div className="nav_links d-flex justify-content-center align-items-center">
        <ul className="list-unstyled d-flex gap-1 fw-bold justify-content-between align-items-center">
          {listTitlesHeader?.map((item) => (
            <li key={item.id} className="rounded-3 py-2 px-3">
              {item.title}
            </li>
          ))}
        </ul>
        <div
          onClick={handleShow}
          className="nav_buttons d-flex gap-4 justify-content-center py-2 px-3 align-items-center"
        >
          <button className="border-0 bg-transparent pb-4 m-0">
            <HiOutlineUser className="fs-5" />
          </button>
          <button className="border-0 pb-4 bg-transparent m-0">
            <BsBagPlus className="fs-5" />
          </button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="d-flex flex-column w-100 justify-content-center align-items-center">
            <Modal.Title>Inicio de Sesión</Modal.Title>
            <Form.Text className="text-muted">
              ¿Es tu primera vez? <Link className="rounded-2 text-black px-3 py-2" to={"/register"}>Regístrate</Link>
            </Form.Text>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                <div className="d-flex justify-content-between mt-2">
                  <Form.Text className="text-muted">
                    <Link className=" rounded-2 mt-5 text-black px-3 py-2" to={"/"}>
                      Olvidaste tu contraseña?
                    </Link>
                  </Form.Text>
                  <Form.Check type="checkbox" label="Mantener sesión" />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="container-footer d-flex flex-column justify-content-between">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Button className="border-0 fw-bolder" type="submit">
                Iniciar Sesión
              </Button>
            </Form.Group>
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
