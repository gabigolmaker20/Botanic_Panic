
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StylesVistaProducto.css";

// Componente reutilizable que acepta props para los datos del producto
const VistaProducto = () => {
  const { productId } = useParams(); // Para obtener el ID del producto de la URL si usas rutas dinámicas
  const location = useLocation(); // Para obtener datos pasados a través del state de navegación
  const navigate = useNavigate(); // Para navegar programáticamente

  // Estado para el producto
  const [plant, setPlant] = useState({
    id: 1,
    name: "Monstera Deliciosa",
    price: 24.99,
    stock: 15,
    image: "/placeholder.svg?height=500&width=500",
    description:
      'La Monstera Deliciosa, también conocida como "planta de queso suizo", es una planta de interior muy popular por sus hojas grandes y perforadas de forma natural. Es originaria de las selvas tropicales de América Central y es relativamente fácil de cuidar.',
    additionalInfo:
      "Esta planta puede crecer hasta convertirse en una planta de interior impresionante y llamativa, perfecta para añadir un toque tropical a cualquier espacio.",
    careGuide: [
      { aspect: "Luz", info: "Luz indirecta brillante. Evitar la luz solar directa." },
      { aspect: "Riego", info: "Regar cuando la capa superior del suelo esté seca (cada 1-2 semanas)." },
      { aspect: "Humedad", info: "Prefiere ambientes húmedos. Rociar las hojas ocasionalmente." },
      { aspect: "Temperatura", info: "18-27°C. No tolera temperaturas por debajo de 12°C." },
      { aspect: "Dificultad", info: "Fácil", badge: true, badgeColor: "success" },
    ],
  });

  const [quantity, setQuantity] = useState(1);

  // Efecto para cargar datos del producto si se pasan a través de location.state
  useEffect(() => {
    if (location.state && location.state.productData) {
      setPlant(location.state.productData);
    } else if (productId) {
      // Aquí podrías hacer una llamada a tu API o Firebase para obtener los datos del producto por ID
      // Ejemplo:
      // fetchProductById(productId).then(data => setPlant(data));
      console.log("Cargando producto con ID:", productId);
    }
  }, [location.state, productId]);

  const handleIncrement = () => {
    if (quantity < plant.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Aquí implementarías la lógica para añadir al carrito
    // Por ejemplo, podrías usar un estado global, context, o una función de Zustand
    console.log(`Añadido al carrito: ${plant.id}, cantidad: ${quantity}`);
    
    // Ejemplo de cómo podrías usar Zustand (ajusta según tu implementación)
    // const addToCart = useCartStore(state => state.addToCart);
    // addToCart(plant.id, quantity, plant.name, plant.price);
    
    // Opcional: navegar al carrito o mostrar una notificación
    // navigate('/cart');
  };

  const handleGoBack = () => {
    navigate(-1); // Vuelve a la página anterior
  };

  return (
    <div className="container py-5">
      <button className="btn btn-outline-secondary mb-4" onClick={handleGoBack}>
        <i className="bi bi-arrow-left me-2"></i>
        Volver
      </button>
      
      <div className="plant-product-view">
        <div className="row">
          {/* Imagen del producto */}
          <div className="col-md-6 mb-4">
            <div className="card">
              <img src={plant.image || "/placeholder.svg"} alt={plant.name} className="card-img-top img-fluid" />
            </div>
          </div>

          {/* Información del producto */}
          <div className="col-md-6">
            <h2 className="fw-bold">{plant.name}</h2>
            <p className="text-success mb-2">
              <i className="bi bi-check-circle-fill me-2"></i>
              En stock: {plant.stock} unidades
            </p>
            <h3 className="fs-4 fw-bold text-primary mb-3">€{plant.price.toFixed(2)}</h3>

            <div className="mb-4">
              <p className="mb-3">{plant.description}</p>
              {plant.additionalInfo && <p>{plant.additionalInfo}</p>}
            </div>

            {/* Selector de cantidad y botón de añadir al carrito */}
            <div className="d-flex align-items-center mb-4">
              <div className="input-group me-3" style={{ width: "130px" }}>
                <button className="btn btn-outline-secondary" type="button" onClick={handleDecrement}>
                  -
                </button>
                <input type="text" className="form-control text-center" value={quantity} readOnly />
                <button className="btn btn-outline-secondary" type="button" onClick={handleIncrement}>
                  +
                </button>
              </div>
              <button className="btn btn-success btn-lg" onClick={handleAddToCart}>
                <i className="bi bi-cart-plus me-2"></i>
                Añadir al carrito
              </button>
            </div>

            {/* Tabla de cuidados */}
            {plant.careGuide && plant.careGuide.length > 0 && (
              <div className="card mt-4">
                <div className="card-header bg-light">
                  <h4 className="mb-0 fs-5">Guía de cuidados</h4>
                </div>
                <div className="card-body p-0">
                  <table className="table table-hover mb-0">
                    <tbody>
                      {plant.careGuide.map((item, index) => (
                        <tr key={index}>
                          <th className="w-25">{item.aspect}</th>
                          <td>
                            {item.badge ? (
                              <span className={`badge bg-${item.badgeColor || "primary"}`}>{item.info}</span>
                            ) : (
                              item.info
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaProducto;
