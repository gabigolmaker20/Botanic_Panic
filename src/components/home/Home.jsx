import React from "react";
import "./styleshome.css"
import { Link } from "react-router-dom"
import imagen1 from "../../assets/imagen1.jpg"
import imagen2 from "../../assets/imagen2.jpg"
import imagen3 from "../../assets/imagen3.jpg"
import imagen4 from "../../assets/imagen4.jpg"
import imagen5 from "../../assets/imagen5.jpg"
import imagen6 from "../../assets/imagen6.jpg"
import imagen7 from "../../assets/imagen7.jpg"
import imagen8 from "../../assets/imagen8.jpg"
import videoPlanta from "../../assets/videoPlanta2.mp4"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section con Video */}
      <section className="home-video">
        <video
          src={videoPlanta}
          autoPlay
          muted
          loop
          playsInline
          className="video-bg"
          aria-label="Video de fondo mostrando servicios de jardinería"
        />
        <div className="video-overlay">
          <h1>Transforma tus espacios verdes</h1>
          <p className="hero-description">
            Descubre nuestra amplia colección de plantas, macetas y productos especializados para crear el jardín de tus
            sueños
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn-hero primary">
              Explorar Catálogo
            </Link>
            <Link to="/contact" className="btn-hero secondary">
              Contactar Experto
            </Link>
          </div>
        </div>
      </section>

   <section className="home-sobre-nosotros">
        <div className="sobre-nosotros-container">
          <div className="sobre-nosotros-content">
            <div className="sobre-nosotros-imagen">
              <img src={imagen7 || "/placeholder.svg"} alt="Sobre nosotros" loading="lazy" />
            </div>
            <div className="sobre-nosotros-texto">
              <h2>Cultivamos vida, creamos espacios únicos</h2>
              <p className="sobre-intro">
                Somos una empresa especializada en transformar espacios a través del poder de las plantas. Con más de 10
                años de experiencia, nos dedicamos a acercar la naturaleza a tu hogar y oficina.
              </p>
              <div className="sobre-puntos">
                <div className="punto-item">
                  <span className="punto-icon">🌱</span>
                  <div>
                    <h4>Plantas de Calidad</h4>
                    <p>Seleccionamos cuidadosamente cada planta para garantizar su salud y belleza</p>
                  </div>
                </div>
                <div className="punto-item">
                  <span className="punto-icon">🏡</span>
                  <div>
                    <h4>Diseño Personalizado</h4>
                    <p>Creamos espacios verdes únicos adaptados a tu estilo y necesidades</p>
                  </div>
                </div>
                <div className="punto-item">
                  <span className="punto-icon">🤝</span>
                  <div>
                    <h4>Acompañamiento Completo</h4>
                    <p>Te guiamos desde la selección hasta el cuidado continuo de tus plantas</p>
                  </div>
                </div>
              </div>
              <Link to="/nosotros" className="btn-sobre-nosotros">
                Conoce más sobre nosotros
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="home-servicios" aria-labelledby="servicios-heading">
        <div className="servicios-header">
          <h2 id="servicios-heading">Nuestros Servicios</h2>
          <p className="servicios-subtitle">Todo lo que necesitas para crear y mantener tu espacio verde perfecto</p>
        </div>

        <div className="servicios-grid">
          <div className="servicio-card">
            <div className="card-image">
              <img src={imagen4 || "/placeholder.svg"} alt="Plantas" loading="lazy" />
              <div className="card-overlay">
                <span className="card-icon">🌿</span>
              </div>
            </div>
            <div className="card-content">
              <h3>Plantas</h3>
              <p className="card-description">
                Amplia variedad de plantas de interior y exterior para todos los espacios
              </p>
              <Link to="/products" className="btn-servicio-card">
                Ver más
              </Link>
            </div>
          </div>

          <div className="servicio-card">
            <div className="card-image">
              <img src={imagen5 || "/placeholder.svg"} alt="Macetas" loading="lazy" />
              <div className="card-overlay">
                <span className="card-icon">🪴</span>
              </div>
            </div>
            <div className="card-content">
              <h3>Macetas</h3>
              <p className="card-description">Diseños únicos y funcionales para complementar tus plantas favoritas</p>
              <Link to="/products" className="btn-servicio-card">
                Ver más
              </Link>
            </div>
          </div>

          <div className="servicio-card">
            <div className="card-image">
              <img src={imagen6 || "/placeholder.svg"} alt="Mantenimiento" loading="lazy" />
              <div className="card-overlay">
                <span className="card-icon">🔧</span>
              </div>
            </div>
            <div className="card-content">
              <h3>Mantenimiento</h3>
              <p className="card-description">Servicios profesionales de cuidado y mantenimiento de jardines</p>
              <Link to="/products" className="btn-servicio-card">
                Ver más
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="home-beneficios">
        <div className="beneficios-container">
          <h2>¿Por qué elegirnos?</h2>
          <div className="beneficios-grid">
            <div className="beneficio-item">
              <div className="beneficio-icon">🚚</div>
              <h3>Envío Gratis</h3>
              <p>En compras superiores a $50.000</p>
            </div>
            <div className="beneficio-item">
              <div className="beneficio-icon">🌱</div>
              <h3>Plantas Saludables</h3>
              <p>Garantía de calidad en todas nuestras plantas</p>
            </div>
            <div className="beneficio-item">
              <div className="beneficio-icon">💬</div>
              <h3>Asesoría Experta</h3>
              <p>Te ayudamos a elegir las mejores opciones</p>
            </div>
            <div className="beneficio-item">
              <div className="beneficio-icon">🔧</div>
              <h3>Mantenimiento</h3>
              <p>Servicios de cuidado profesional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="home-testimonios">
        <div className="testimonios-container">
          <div className="testimonios-header">
            <h2>Lo que dicen nuestros clientes</h2>
            <p>Miles de personas ya han transformado sus espacios con nuestras plantas</p>
          </div>

          <div className="testimonios-grid">
            <div className="testimonio-card">
              <div className="testimonio-content">
                <div className="estrellas">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <p className="testimonio-texto">
                  "Increíble servicio y plantas de excelente calidad. Mi Monstera llegó perfecta y ya está creciendo
                  hermosa en mi sala. El equipo me asesoró muy bien sobre los cuidados."
                </p>
                <div className="testimonio-autor">
                  <div className="autor-info">
                    <h4>María González</h4>
                    <span>Cliente desde 2023</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonio-card">
              <div className="testimonio-content">
                <div className="estrellas">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <p className="testimonio-texto">
                  "El servicio de mantenimiento es fantástico. Mis plantas nunca habían estado tan saludables. Los
                  expertos realmente saben lo que hacen y son muy profesionales."
                </p>
                <div className="testimonio-autor">
                  <div className="autor-info">
                    <h4>Carlos Ruiz</h4>
                    <span>Cliente desde 2022</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonio-card">
              <div className="testimonio-content">
                <div className="estrellas">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <p className="testimonio-texto">
                  "Las macetas son hermosas y de muy buena calidad. Transformaron completamente mi balcón. Además, el
                  envío fue súper rápido y todo llegó en perfecto estado."
                </p>
                <div className="testimonio-autor">
                  <div className="autor-info">
                    <h4>Ana Martínez</h4>
                    <span>Cliente desde 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carrusel Original */}
      <section className="home-carrusel" aria-label="Galería de proyectos">
        <div className="carrusel-header">
          <h2>Nuestros Proyectos</h2>
          <p>Descubre cómo transformamos espacios con nuestras plantas y servicios</p>
        </div>

        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide-to="0"
              className="active"
            ></button>
            <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="4000">
              <img src={imagen1 || "/placeholder.svg"} className="d-block w-100" alt="Proyecto 1" loading="lazy" />
              <div className="carousel-caption">
                <h3>Renovación</h3>
                <p>Transformación completa de espacios verdes</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <img src={imagen2 || "/placeholder.svg"} className="d-block w-100" alt="Proyecto 2" loading="lazy" />
              <div className="carousel-caption">
                <h3>Vida</h3>
                <p>Transformación completa de espacios verdes</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <img src={imagen3 || "/placeholder.svg"} className="d-block w-100" alt="Proyecto 3" loading="lazy" />
              <div className="carousel-caption">
                <h3>Armonía</h3>
                <p>Transformación completa de espacios verdes</p>
              </div>
            </div>
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

      {/* Call to Action */}
      <section className="home-cta">
        <div className="cta-content">
          <h2>¿Listo para crear tu jardín perfecto?</h2>
          <p>Únete a cientos de clientes satisfechos que ya han transformado sus espacios</p>
          <div className="cta-buttons">
            <Link to="/products" className="btn-cta primary">
              Ver Productos
            </Link>
            <Link to="/contact" className="btn-cta secondary">
              Solicitar Asesoría
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home