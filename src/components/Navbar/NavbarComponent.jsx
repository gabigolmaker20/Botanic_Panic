import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./StylesNavbar.css";

const NavbarComponent = () => {
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
    <div className="d-flex w-100 justify-content-around align-items-center mt-4">
      <div className="d-flex">
        <figure>
          <img
            className="w-50"
            src="https://gardenia-blog.axiomthemes.com/wp-content/uploads/2024/01/logo-1-retina.png"
            alt="icono_botanic_panic"
          />
        </figure>
      </div>
      <div className="d-flex">
        {listTitlesHeader.map((item) => (
          <ul
            className="list-unstyled d-flex justify-content-between align-items-center"
            key={item.id}
          >
            <li className="">{item.title}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default NavbarComponent;
