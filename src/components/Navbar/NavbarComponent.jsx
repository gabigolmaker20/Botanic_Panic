import { HiOutlineUser } from "react-icons/hi2";
import { BsBagPlus } from "react-icons/bs";
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
          {listTitlesHeader.map((item) => (
            <li className="rounded-3 py-2 px-3">{item.title}</li>
          ))}
        </ul>
        <div className="d-flex gap-4 justify-content-center py-2 px-3 align-items-center">
          <button className="border-0 pb-4 m-0"><HiOutlineUser className="fs-5"/></button>
          <button className="border-0 pb-4 m-0"><BsBagPlus  className="fs-5"/></button>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
