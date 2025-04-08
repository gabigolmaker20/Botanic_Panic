import { HiOutlineUser } from "react-icons/hi2";
import { BsBagPlus } from "react-icons/bs";
import "./StylesNavbar.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

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
          <Modal.Header
            closeButton
            className="d-flex w-100 justify-content-center align-items-center ring-success"
          >
            <Modal.Title>Inicio de Sesión</Modal.Title>
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
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="container-footer d-flex justify-content-between">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Mantener sesión" />
            </Form.Group>
            <Button
              className="border-0 fw-bolder"
              type="submit"
            >
              Iniciar Sesión
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default NavbarComponent;
