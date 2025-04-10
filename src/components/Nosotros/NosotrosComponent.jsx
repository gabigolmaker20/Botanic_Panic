import React from 'react';
import { FaTwitter, FaGithub, FaLinkedinIn, FaGooglePlusG } from 'react-icons/fa';
import './StylesNosotros.css';


// informacion de los miembros del equipo
const teamMembers = [
{
    nombre: 'Yesid Vanegas',
    descripcion: 'Código_Estudiantil: 2225001',
    img: '../src/assets/yesid.jpg', 
    twitter: '#', linkedin: '#',  github: '#',
},
{
    nombre: 'Laura Rosas',
    descripcion: 'Código_Estudiantil: 2225616',
    img: '../src/assets/laura.jpg', 
    twitter: '#', linkedin: '#',  github: '#',
},
{
    nombre: 'Gabriel Vera',
    descripcion: 'Código_Estudiantil: 2225618',
    img: '../src/assets/gabriel.jpg', 
    twitter: '#', linkedin: '#',  github: '#',
},
{
    nombre: 'Alejandro Farelo',
    descripcion: 'Código_Estudiantil: 2221919',
    img: '../src/assets/alejandro.jpg', 
    twitter: '#', linkedin: '#', github: '#',
},
];

const Equipo= () => {
return (

            < >               
             {/* imagen del encabezado. */}
            <div className="encabezado-equipo">
                <img
                //https://ubvillalba.com/sites/default/files/equipo3.jpg
                src="https://previews.123rf.com/images/mash3r/mash3r1603/mash3r160300196/54226075-cuatro-manos-juntas-trabajo-en-equipo-manos-de-diferentes-colores-la-diversidad-cultural-y-%C3%A9tnica.jpg" // URL de la imagen
                alt="Fondo del encabezado del equipo"
                className="imagen-encabezado"
                />
                {/* Título que se superpone a la imagen del encabezado. */}
                <div className="titulo-sobre-imagen">Sobre Nosotros</div>
            </div>
            
            <div className="seccion-equipo">
                    
                    <h2 style={{textAlign:"center"}}>Quizás todos venimos en diferentes barcos, pero ahora todos estamos en el mismo bote. <br />
                    <span style={{fontFamily:"cursive",fontSize:"26px"}}>~ Martin Luther King, Jr.</span></h2>

                    <br />
                    <br />
                    {/* CONTENEDOR GRID CENTRADO */}
                    <div className="equipo-grid-centrado"> {/* Clase para el grid centrado */}
                        {teamMembers.map((member, index) => (
                        // Tarjeta individual
                        <div key={index} className="tarjeta-miembro">
                            {/* Contenedor Imagen */}
                            <div className="tarjeta-imagen-contenedor">
                                <img src={member.img} alt={member.nombre} className="tarjeta-imagen-miembro" />
                            </div>
                            {/* Contenido */}
                            <div className="tarjeta-contenido">
                                <h3 className="tarjeta-nombre">{member.nombre}</h3>
                                <div className="linea-decorativa-nombre"></div>
                                <p className="tarjeta-descripcion">{member.descripcion}</p>
                                <div className="tarjeta-redes">
                                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="icono-social" aria-label={`${member.nombre} en Twitter`} > <FaTwitter /> </a>
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="icono-social" aria-label={`${member.nombre} en LinkedIn`} > <FaLinkedinIn /> </a>
                                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="icono-social" aria-label={`${member.nombre} en Github`} > <FaGithub/> </a>
                
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            
            </>



);
};

export default Equipo;