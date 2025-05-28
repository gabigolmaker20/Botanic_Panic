
import PropTypes from "prop-types"; // Recomendado para validar props
import "./UserProfile.css"; // Importa los estilos CSS
import { Link } from "react-router-dom";

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import api from "../../services/api"; 
import { useNavigate } from "react-router-dom";

const CartIcon = () => (
  <span role="img" aria-label="Carrito">
    🛒
  </span>
);
const OrdersIcon = () => (
  <span role="img" aria-label="Pedidos">
    📦
  </span>
);
const SettingsIcon = () => (
  <span role="img" aria-label="Configuración">
    ⚙️
  </span>
);
const CameraIcon = () => (
  <span role="img" aria-label="Cambiar foto">
    📷
  </span>
);
const EditIcon = () => (
  <span role="img" aria-label="Editar">
    ✏️
  </span>
);


function UserProfile({
  userName,
  userBio = "", // Valor por defecto para la bio
  profileImageUrl,
  coverImageUrl,
  itemCount = 0,
  onEditProfile,
  onChangeProfilePic,
  onChangeCoverPic,
}) {

  // --- URLs por defecto en caso de que no se proporcionen imágenes ---
  const defaultCover =
    "https://via.placeholder.com/1170x220/E9ECEF/6C757D?text=Cover+Photo";
  const defaultProfile =
    "https://via.placeholder.com/150/CCCCCC/808080?text=User";

  
  // --- Estados Locales ---
    const [showOrdersModal, setShowOrdersModal] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [ordersError, setOrdersError] = useState(null);

  // --- Funcion cargar pedido ---
        const handleShowOrders = async () => {
      setShowOrdersModal(true);
      setLoadingOrders(true);
      setOrdersError(null);
      try {
      
        const res = await api.get("/api/pedidos"); 
        setOrders(res.data);
      } catch (err) {
        setOrdersError("Error al cargar pedidos");
      }
      setLoadingOrders(false);
    };
    // --- Manejadores de Eventos Internos ---


  const navigate = useNavigate();
  // ...
  const handleLinkClick = (path) => {
    navigate(path);
  };
  // ...


  /**
   * Maneja el clic en el botón para cambiar la foto de perfil.
   */
  const handleChangeProfilePicClick = () => {
    if (onChangeProfilePic) {
      onChangeProfilePic();
    } else {
      console.info(
        "UserProfile: onChangeProfilePic prop is not defined. Add functionality if needed."
      );
      // Podrías abrir un input[type=file] aquí si lo manejas localmente
    }
  };

  /**
   * Maneja el clic en el botón para cambiar la foto de portada.
   */
  const handleChangeCoverPicClick = () => {
    if (onChangeCoverPic) {
      onChangeCoverPic();
    } else {
      console.info(
        "UserProfile: onChangeCoverPic prop is not defined. Add functionality if needed."
      );
    }
  };

  // --- Renderizado del Componente ---
  return (

     


    
    // Contenedor principal con clases de Bootstrap para tarjeta y sombra
    <div className="user-profile-container card shadow-sm mb-4">

      <Modal show={showOrdersModal} onHide={() => setShowOrdersModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Mis Pedidos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loadingOrders && <p>Cargando pedidos...</p>}
        {ordersError && <p className="text-danger">{ordersError}</p>}
        {!loadingOrders && !ordersError && (
          <div>
            {orders.length === 0 ? (
              <p>No tienes pedidos.</p>
            ) : (
              orders.map((pedido) => (
                <div key={pedido.id} className="mb-4">
                  <h6>Pedido #{pedido.id} - Total: ${pedido.total}</h6>
                  <ul>
                    {pedido.detalles?.map((detalle) => (
                      <li key={detalle.id}>
                        Planta ID: {detalle.id_planta} | Cantidad: {detalle.cantidad}
                      </li>
                    ))}
                  </ul>
                  <hr />
                </div>
              ))
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowOrdersModal(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
      {/* === Sección de Cabecera: Portada y Barra de Información === */}
      <div className="profile-header">
        {/* --- Foto de Portada --- */}
        <div
          className="cover-photo"
          // Usa la imagen de portada proporcionada o la por defecto
          style={{ backgroundImage: `url(${coverImageUrl || defaultCover})` }}
          role="img" // Rol semántico
          aria-label={`Foto de portada de ${userName || "Usuario"}`} // Accesibilidad
        >

        </div>

        {/* --- Barra de Información del Perfil (Debajo de la portada) --- */}
        <div className="profile-info-bar p-3 p-md-4">
          {/* Contenedor Flex para alinear foto, nombre y botón de editar */}
          <div className="d-flex align-items-md-end align-items-center">
            {" "}
            {/* Ajuste para mejor alineación vertical */}
            {/* --- Foto de Perfil --- */}
            <div className="profile-picture-wrapper">
              {/* Imagen de perfil real */}
              <img
                src={profileImageUrl || defaultProfile}
                alt={`Foto de perfil de ${userName || "Usuario"}`}
                className="profile-picture img-thumbnail rounded-circle"
              />
        
            </div>
            {/* --- Nombre y Biografía --- */}
            <div className="user-details ms-3 ms-md-4 flex-grow-1">
              {/* Nombre del usuario */}
              <h2 className="user-name h4 mb-1">
                {userName || "Nombre de Usuario"}
              </h2>
              {/* Biografía o estado del usuario (solo si existe) */}
              {userBio && (
                <p className="user-bio text-muted small mb-0">{userBio}</p>
              )}
            </div>
            {/* --- Botón Modificar Perfil --- */}
            <div className="ms-auto align-self-start pt-md-0 pt-2">
              {" "}
              {/* Ajuste de padding top en móvil */}
          <Link
            to="/gestor"
            className="btn btn-outline-secondary btn-sm edit-profile-button"
            aria-label="Gestor de archivos"
          >
            Gestor de Archivos
          </Link>
            </div>
          </div>
        </div>
      </div>
      {/* === Fin Sección de Cabecera === */}

      {/* === Sección de Vínculos Rápidos === */}
      <div className="quick-links-section card-body border-top">
        {/* Título de la sección */}
        <h5 className="mb-3 quick-links-title">Vínculos rápidos</h5>
        {/* Contenedor Flex para los botones */}
        <div className="d-flex flex-wrap gap-2">
          {/* Botón Mi Carrito */}
          <button
            className="btn btn-primary d-inline-flex align-items-center"
            onClick={() => handleLinkClick("/cart")} // Navega a /cart
            aria-label={`Ir a mi carrito, ${itemCount} ${
              itemCount === 1 ? "artículo" : "artículos"
            }`}
          >
            <CartIcon />
            {/* Muestra el contador de ítems */}
            <span className="ms-2">Mi Carrito ({itemCount})</span>
          </button>

          {/* Botón Mis Pedidos */}
          <button
            className="btn btn-outline-secondary d-inline-flex align-items-center"
            onClick={handleShowOrders}
            aria-label="Ir a mis pedidos"
          >
            <OrdersIcon />
            <span className="ms-2">Mis Pedidos</span>
          </button>

          {/* Botón Configuración */}
          <button
            className="btn btn-outline-info d-inline-flex align-items-center"
            onClick={() => handleLinkClick("/settings")} // Navega a /settings
            aria-label="Ir a configuración de la cuenta"
          >
            <SettingsIcon />
            <span className="ms-2">Configuración</span>
          </button>

          {/* Puedes añadir más botones de vínculos rápidos aquí siguiendo el mismo patrón */}
        </div>
      </div>
      {/* === Fin Sección de Vínculos Rápidos === */}
    </div> // Fin .user-profile-container

  
    
  );
}

// --- Validación de PropTypes ---
// Ayuda a prevenir errores asegurando que las props correctas se pasen al componente.
UserProfile.propTypes = {
  userName: PropTypes.string.isRequired, // userName es obligatorio
  userBio: PropTypes.string,
  profileImageUrl: PropTypes.string.isRequired, // profileImageUrl es obligatoria
  coverImageUrl: PropTypes.string.isRequired, // coverImageUrl es obligatoria
  itemCount: PropTypes.number,
  onEditProfile: PropTypes.func.isRequired, // onEditProfile es obligatoria
  onNavigate: PropTypes.func.isRequired, // onNavigate es obligatoria
  onChangeProfilePic: PropTypes.func, // opcional
  onChangeCoverPic: PropTypes.func, // opcional
};

export default UserProfile;
