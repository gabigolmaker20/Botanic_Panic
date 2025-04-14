
import "./StylesFooter.css"
import { Link } from 'react-router-dom';

// Los integrantes del equipo: nombre, foto y descripcion
const participants = [
    { nombre: "Yesid Vanegas", imagen:"../src/assets/yesid.jpg", descripcion: "Desarrollador Frontend kjasndnvjhdijv ajsnvojasjdvij" },
    { nombre: "Laura Rosas", imagen: "../src/assets/laura.jpg", descripcion: "Diseñadora UX/UI" },
    { nombre: "Gabriel Vera ", imagen: "../src/assets/gabriel.jpg", descripcion: "Backend Developer" },
    { nombre: "Alejandro Farelo", imagen: "../src/assets/alejandro.jpg", descripcion: "Project Manager" }
];

       // imagened de las redes sociales
const buttonImages = [
        {
        src: "https://cdn.pixabay.com/photo/2021/06/15/12/51/facebook-6338508_1280.png",
        dataName: "Facebook",
        url: "https://www.facebook.com/profile.php?id=61575052720129"
        },
        {
        src: "https://esemanal.mx/revista/wp-content/uploads/2021/06/logo-instagram.png",
        dataName: "Instagram",
        url: "https://www.instagram.com/botanic_panic48/"
        },
        {
        src: "https://i0.wp.com/consultarse.org/wp-content/uploads/2020/06/Twitter_Logo_Blue.png?fit=400%2C400&ssl=1",
        dataName: "Twitter",
        url: "https://x.com/botanic20913"
        },
        {
        src: "https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338432_640.png",
        dataName: "TikTok",
        url: "https://www.tiktok.com/@botanicpanic785?lang=es"
        }
];






export default function Footer() {


return (

    <footer id="footer">
    {/* Capa semitransparente */}
    <div id="capa"></div>

    {/* Contenido Principal */}
    <div className="footer-content">

        {/* Contenedor de las columnas (flex) */}
        <div className="footer-columns-container">



        {/* --- Columna de contactos --- */}
        <div className="footer-column contact-column">
            <Link to="/contact" style={{textDecoration:' none'}}><h2>CONTÁCTANOS</h2></Link>
            <br />
            <br />
            <p style={{ textAlign: "center" ,fontSize:"23px"}}>⌖ Calle 9  #carrera 27, Bucaramanga, Santander </p>
            
            <a href="tel:+57313567890" style={{ color: 'inherit', textDecoration: 'none',fontSize:"20px" }} >
            📞 +57 313 456 7890
            </a>
            <br />
            <br />
            <a href="mailto:ejemplo@correo.com" style={{ color: 'inherit', textDecoration: 'none' , fontSize:"20px"}}> {/* mailto: sirve para que, al hacer clic en el correo electrónico,
                el navegador abra automáticamente  la aplicación de correo predeterminada del usuario (como Outlook, Gmail, Apple Mail, etc.)*/}
            ✉️ botanicpanic@gmail.com
            </a>

        </div>


        {/* --- Columna Central (Redes Sociales) --- */}
        <div className="footer-column social-column">

            <img style={{ height: "300px", marginTop:"-65px"}} src="../src/assets/logo_ blanco_sin fondo.png" alt="logo" />
            
            <h4 style={{  fontWeight: "normal", marginTop:"-50px"  }}>La belleza de una flor proviene de sus raíces.</h4>

            {/* Contenedor de botones de redes sociales */}
            <div className="social-buttons-container">
            {buttonImages.map((button, index) => (
                <button
                key={index}
                className="button social-button" // Añadida clase social-button si necesitas estilos específicos
                data-tooltip={button.dataName}
                onClick={() => window.location.href = button.url} // Redirige al hacer clic
                >
                <img
                    src={button.src}
                    alt={`${button.dataName} logo`} 
                    className="social-icon"
                />
                </button>
            ))}
            </div>
        </div>



        {/* --- Columna de Nuestro Equipo --- */}
        <div className="footer-column team-column">
        <Link to="/nosotros" style={{textDecoration:' none'}}><h2>NUESTRO EQUIPO</h2></Link>
            
            <br />
            <div className="team-members-container">
            {participants.map((participant, index) => (
                <div key={index} className="participant-card">
                <h3>{participant.nombre}</h3>
                <img style={{  border: "1px solid rgb(19, 74, 71)", boxShadow: "4px 4px 12px rgba(91, 193, 130, 0.4)"}}
                    src={participant.imagen}
                    alt={`Foto de ${participant.nombre}`} // Texto Alt más descriptivo
                    className="participant-image"
                />
                 {/* <p>{participant.descripcion}</p> */}
                
                </div>
            ))}
            </div>
        </div>




        </div> {/* Fin de footer-columns-container */}

        {/* Frase final */}
        <div className="footer-bottom-text">
        2025 Botanic_Panic
        
        </div>

    </div> {/* Fin de footer */}
    </footer>
);
}
