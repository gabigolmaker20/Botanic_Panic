import React from "react";
import "./StylesHome.css";
import { Link } from "react-router-dom";
import imagen1 from "../../assets/imagen1.jpg";
import imagen2 from "../../assets/imagen2.jpg";
import imagen3 from "../../assets/imagen3.jpg";
import imagen4 from "../../assets/imagen4.jpg";
import imagen5 from "../../assets/imagen5.jpg";
import imagen6 from "../../assets/imagen6.jpg";
import videoPlanta from "../../assets/videoPlanta2.mp4";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Home = () => {
  return (
    <div className="home-container">
      <section className="home-video">
        <video
          src={videoPlanta}
          autoPlay
          muted
          loop
          playsInline
          className="video-bg"
          aria-label="Video de fondo mostrando servicios de jardinería"
        >
          
        </video>
        <div className="video-overlay">
          <h1>Transformamos tus espacios verdes</h1>
        </div>
      </section>

      <section className="home-servicios" aria-labelledby="servicios-heading">
        <h2 id="servicios-heading">Nuestros Servicios</h2>
        <div className="servicios-grid">
          {[
            { img: imagen4, title: "Plantas", path: "/products" },
            { img: imagen5, title: "Macetas", path: "/products" },
            { img: imagen6, title: "Mantenimiento", path: "/products" },
          ].map((servicio, index) => (
            <div className="servicio-card" key={index}>
              <img 
                src={servicio.img} 
                alt={servicio.title} 
                loading="lazy" // Mejora performance
              />
              <h3>{servicio.title}</h3>
              <Link to={servicio.path} className="btn-servicio-card">
                Ver más
              </Link>
            </div>
          ))}
        </div>
      </section>

      
      <section className="home-carrusel" aria-label="Galería de proyectos">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {[imagen1, imagen2, imagen3].map((img, index) => (
              <div 
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                data-bs-interval="3000"
                key={index}
              >
                <img 
                  src={img} 
                  className="d-block w-100" 
                  alt={`Proyecto ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
            aria-label="Anterior"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
            aria-label="Siguiente"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;