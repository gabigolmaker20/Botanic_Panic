
import React from "react";
import "./StylesHome.css"; // Asegúrate que esta ruta es correcta
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Tus importaciones de react-icons
import { FaLeaf, FaShoppingCart, FaStar} from "react-icons/fa"
import { BiDroplet, BiSun, BiWind } from "react-icons/bi" // BiWind no se usará en este ejemplo, pero lo dejamos
import { MdLocalShipping } from "react-icons/md"
import { LuCloudSun } from "react-icons/lu"; // Usaremos este para el sustrato/ambiente

// Importaciones de imágenes y video
import imagen4 from "../../assets/imagen4.jpg";
import imagen5 from "../../assets/imagen5.jpg";
import imagen6 from "../../assets/imagen6.jpg";
import videoPlanta from "../../assets/videoPlanta2.mp4";

import { FiHelpCircle, FiSmile, FiHeart, FiShield } from 'react-icons/fi'; 



const faqDataAesthetic = [
  {
    id: "faqComoCuidar",
    icon: FiHelpCircle,
    question: "¿Cuál es el secreto para que mis plantas prosperen?",
    answer: "El secreto está en entender sus necesidades básicas: luz adecuada, riego consciente y un sustrato de calidad. Observa tu planta, ella te dará señales.",
    details: [
      "Investiga las necesidades específicas de cada especie.",
      "Menos es más con el riego para muchas plantas de interior.",
      "Un buen drenaje en la maceta es fundamental."
    ]
  },
  {
    id: "faqBeneficios",
    icon: FiSmile,
    question: "¿Realmente mejoran el ánimo tener plantas en casa?",
    answer: "¡Absolutamente! Las plantas aportan vida y color, reducen el estrés y pueden aumentar tu productividad y creatividad. Son pequeñas compañeras verdes que alegran el día.",
    details: [
        "Conectan con la naturaleza, incluso en la ciudad.",
        "Purifican el aire, creando un ambiente más saludable.",
        "Cuidarlas puede ser una actividad relajante y gratificante."
    ]
  },
  {
    id: "faqEnvio",
    icon: FiShield, // Un escudo para la seguridad del envío
    question: "¿Cómo garantizan que las plantas lleguen bien en el envío?",
    answer: "Empaquetamos cada planta con extremo cuidado, utilizando materiales protectores y técnicas especiales para asegurar que lleguen a tu hogar sanas y salvas, listas para embellecer tu espacio.",
    details: [
        "Embalaje especializado para proteger hojas y tallos.",
        "Instrucciones claras para el desempaquetado y primeros cuidados.",
        "Soporte post-venta si surge algún inconveniente."
    ]
  },
];


// --- DATOS PARA CONSEJOS DE CUIDADOS ACTUALIZADOS CON REACT-ICONS ---
const consejosCuidados = [
  {
    icon: BiSun, // Usamos el componente directamente
    title: "Luz Adecuada",
    description: "Cada planta tiene necesidades de luz específicas. Investiga si prefiere sol directo, luz indirecta brillante o sombra parcial para asegurar su crecimiento."
  },
  {
    icon: BiDroplet, // Usamos el componente directamente
    title: "Riego Consciente",
    description: "Evita el exceso o la falta de agua. La frecuencia de riego depende de la planta, la estación y la humedad del ambiente. ¡Toca la tierra!"
  },
  {
    icon: LuCloudSun, // Usamos el componente directamente (representando ambiente/sustrato)
    // Opcional: si quisieras un icono más específico para "sustrato" o "nutrientes",
    // podrías buscar en react-icons, por ejemplo, algo como FaSeedling de "react-icons/fa" o "react-icons/fa6"
    // import { FaSeedling } from "react-icons/fa"; // o fa6
    // icon: FaSeedling,
    title: "Sustrato y Ambiente",
    description: "Un buen sustrato es clave. Asegura una buena aireación y considera las necesidades de nutrientes de tus plantas."
  }
];
// --- FIN DE DATOS PARA CONSEJOS DE CUIDADOS ---




const Home = () => {


  const servicios = [
    { img: imagen4, title: "Plantas Frescas", description: "Descubre nuestra variedad de plantas de interior y exterior.", path: "/products" },
    { img: imagen5, title: "Macetas con Estilo", description: "Encuentra la maceta perfecta que complemente tu espacio.", path: "/products" },
    { img: imagen6, title: "Mantenimiento Experto", description: "Servicios profesionales para que tus plantas prosperen.", path: "/products" },
  ];

  const beneficios = [
    { iconComponent: MdLocalShipping, title: "Envío Gratis", description: "En pedidos superiores a $50" },
    { iconComponent: FaLeaf, title: "Plantas Saludables", description: "Garantía de 30 días" },
    { iconComponent: FaStar, title: "Expertos en Plantas", description: "Asesoramiento personalizado" },
    { iconComponent: FaShoppingCart, title: "Compra Segura", description: "Pago 100% seguro" },
  ];


  const carruselImagenes = [
    {
      src: "https://cdn.pixabay.com/photo/2020/08/23/02/29/lake-5509721_1280.jpg",
      alt: "Paisaje sereno con lago y vegetación",
      captionTitle: "Naturaleza Inspiradora",
      captionText: "Espacios que conectan con la tranquilidad."
    },
    {
      src: "https://cdn.pixabay.com/photo/2021/04/02/08/25/orange-flowers-6144272_1280.jpg",
      alt: "Flores naranjas vibrantes en primer plano",
      captionTitle: "Colores que Alegran",
      captionText: "Un toque de vitalidad para tus ambientes."
    },
    {
      src: "https://cdn.pixabay.com/photo/2016/11/29/05/01/lights-1867437_1280.jpg",
      alt: "Luces cálidas entre hojas verdes",
      captionTitle: "Ambientes Mágicos",
      captionText: "Crea atmósferas acogedoras con luz y naturaleza."
    },
    {
      src: "https://cdn.pixabay.com/photo/2014/01/04/12/07/leaves-238452_1280.jpg",
      alt: "Detalle de hojas verdes frescas",
      captionTitle: "Frescura Natural",
      captionText: "La belleza simple de las hojas verdes."
    },
  ];



  return (

    <div className="home-container" role="main" style={{background:"rgb(247, 249, 250)"}}>



      {/* Hero Section con Video */}
      <section className="home-video position-relative vh-100 d-flex align-items-center justify-content-center text-center overflow-hidden">
        <video
          src={videoPlanta}
          autoPlay
          muted
          loop
          playsInline
          className="video-bg position-absolute top-0 start-0 w-100 h-100"
          aria-hidden="true"
        >
          Tu navegador no soporta el tag de video.
        </video>
        <div className="video-overlay position-relative z-1 p-3">
          <h1 className="display-3 fw-bold text-white mb-3 animate-hero-title">
            Transformamos tus espacios verdes
          </h1>
          <p className="lead fs-4 text-white mb-4 animate-hero-subtitle">
            Descubre la belleza y tranquilidad que las plantas pueden aportar a tu vida y hogar.
          </p>
          <Link to="/products" className="btn btn-lg btn-success btn-hero animate-hero-button">
            Explorar Plantas <i className="fas fa-arrow-right ms-2"></i> {/* Mantengo este como estaba en tu código original */}
          </Link>
        </div>
      </section>



      {/* Sección de Servicios */}
      <section className="home-servicios py-5" style={{background:"rgb(247, 249, 250)"}}>
        <div className="container">
          <h2 className="text-center section-title mb-5">Nuestros Servicios Estrella</h2>
          <div className="row g-4">
            {servicios.map((servicio, index) => (
              <div className="col-md-6 col-lg-4 d-flex align-items-stretch" key={index}>
                <div className="card servicio-card shadow-sm w-100">
                  <div className="servicio-card-img-container">
                    <img
                      src={servicio.img}
                      className="card-img-top"
                      alt={servicio.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="card-body text-center d-flex flex-column">
                    <h3 className="card-title fs-4 fw-semibold">{servicio.title}</h3>
                    <p className="card-text text-muted flex-grow-1">{servicio.description}</p>
                    <Link to={servicio.path} className="btn btn-outline-success mt-auto">
                      Ver más <i className="fas fa-chevron-right small"></i> {/* Mantengo este como estaba */}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <br />
      <br />



      {/* Beneficios (usando la estructura que ya tenías, que parece ser Tailwind) */}
      <section className="py-16" style={{background:"rgb(247, 249, 250)"}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beneficios.map((beneficio, index) => {
              // Asignamos el componente del icono aquí para usarlo en el JSX
              const IconComponent = beneficio.iconComponent;
              return (
                <div key={index} className="flex flex-col items-center rounded-lg p-6 text-center shadow-sm bg-white"> {/* Añadido bg-white para contraste si el fondo de la sección es claro */}
                  <div className="mb-4 rounded-full bg-green-100 p-3">
                    <IconComponent className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mb-2 font-medium">{beneficio.title}</h3>
                  <p className="text-sm text-gray-600">{beneficio.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <br />
      <br />




      {/* Sección Carrusel de Proyectos con Bootstrap */}
      <section className="home-carrusel-bootstrap py-5 bg-light">
        <div className="container">
          <h2 className="text-center section-title mb-5">Inspírate con Nuestros Espacios</h2>
          <div id="proyectosCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4000">
            <div className="carousel-indicators">
              {carruselImagenes.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#proyectosCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner rounded shadow">
              {carruselImagenes.map((img, index) => (
                <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                  <img
                    src={img.src}
                    className="d-block w-100 carousel-img-custom"
                    alt={img.alt}
                    loading="lazy"
                  />
                  <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
                    <h5>{img.captionTitle}</h5>
                    <p>{img.captionText}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#proyectosCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#proyectosCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>
      </section>
      



      {/* Sección de Consejos y Cuidados ACTUALIZADA PARA USAR REACT-ICONS */}
      <section className="home-consejos-cuidados py-5" >
        <div className="container">
          <h2 className="text-center section-title mb-3">Cuidados Esenciales para tus Plantas</h2>
          <p className="text-center text-muted mb-5 lead fs-6">
            Descubre los secretos para mantener tus plantas felices y saludables.
          </p>
          <div className="row g-4">
            {consejosCuidados.map((consejo, index) => {
              // Asignamos el componente del icono aquí para usarlo en el JSX
              const IconComponent = consejo.icon;
              return (
                <div className="col-md-6 col-lg-4 d-flex align-items-stretch" key={index}>
                  <div className="card consejo-card shadow-sm w-100 text-start">
                    <div className="card-body p-4">
                      <div className="consejo-icon-wrapper mb-3">
                        {/* Renderiza el icono como un componente */}
                        <IconComponent className="consejo-icon" /> {/* Aplica la clase CSS para tamaño/color */}
                      </div>
                      <h3 className="card-title fs-5 fw-semibold mb-2">{consejo.title}</h3>
                      <p className="card-text text-muted small">{consejo.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



          
      {/* Sección de Llamada a la Acción (CTA) */}
      <section className="home-cta py-5 text-white text-center" /* style={{ backgroundImage: `url(${ctaBackground})` }} */>
        <div className="container cta-content">
          <h2 className="display-5 fw-bold mb-3">¿Listo para dar vida a tus ideas?</h2>
          <p className="lead fs-5 mb-4">Contacta con nuestros expertos o explora nuestro catálogo completo.</p>
          <div>
            <Link to="/contact" className="btn btn-lg btn-light text-success me-2 mb-2 mb-md-0">Contáctanos</Link>
            <Link to="/products" className="btn btn-lg btn-outline-light">Ver Catálogo</Link>
          </div>
        </div>
      </section>
      </div>
  
  );
};

export default Home;
