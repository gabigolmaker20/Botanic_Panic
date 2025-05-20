import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StylesVistaProducto.css";
import useProductsStore from "../../zustand/products/productsState";

// Componente reutilizable que acepta props para los datos del producto
const VistaProducto = () => {
  const { productId } = useParams(); // Para obtener el ID del producto de la URL si usas rutas dinámicas
  const location = useLocation(); // Para obtener datos pasados a través del state de navegación
  const navigate = useNavigate(); // Para navegar programáticamente

  // Estado para el producto
  const { product } = useProductsStore();
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
      {
        aspect: "Luz",
        info: "Luz indirecta brillante. Evitar la luz solar directa.",
      },
      {
        aspect: "Riego",
        info: "Regar cuando la capa superior del suelo esté seca (cada 1-2 semanas).",
      },
      {
        aspect: "Humedad",
        info: "Prefiere ambientes húmedos. Rociar las hojas ocasionalmente.",
      },
      {
        aspect: "Temperatura",
        info: "18-27°C. No tolera temperaturas por debajo de 12°C.",
      },
      {
        aspect: "Dificultad",
        info: "Fácil",
        badge: true,
        badgeColor: "success",
      },
    ],
  });

  const [position, setPosition] = useState({ x: "50%", y: "50%" });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x: `${x}%`, y: `${y}%` });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => {
    setIsZoomed(false);
    setPosition({ x: "50%", y: "50%" }); // Resetea la posición
  };

  const [quantity, setQuantity] = useState(1);

  // Efecto para cargar datos del producto si se pasan a través de location.state
  // useEffect(() => {
  //   sessionStorage.getItem()
  // }, [location.state, productId]);

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
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="col-md-6 mb-4"
          >
            <div className="card">
              <img
                src={product?.imagen}
                alt={product?.nombre}
                className={`w-full h-full object-contain rounded-lg transition-transform duration-300 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={{
                  transformOrigin: `${position.x} ${position.y}`,
                }}
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="col-md-6">
            <h2 className="fw-bold">{product?.nombre}</h2>
            <p className="text-success mb-2">
              <i className="bi bi-check-circle-fill me-2"></i>
              En stock: {product?.stock} unidades
            </p>
            <h3 className="fs-4 fw-bold text-primary mb-3">
              ${product?.precio}
            </h3>

            <div className="mb-4">
              <p className="mb-3">{product?.descripcion}</p>
              {plant?.additionalInfo && <p>{plant?.additionalInfo}</p>}
            </div>

            {/* Selector de cantidad y botón de añadir al carrito */}
            <div className="d-flex align-items-center mb-4">
              <div className="input-group me-3" style={{ width: "130px" }}>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control text-center"
                  value={quantity}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-success btn-lg"
                onClick={handleAddToCart}
              >
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
                              <span
                                className={`badge bg-${
                                  item.badgeColor || "primary"
                                }`}
                              >
                                {item.info}
                              </span>
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
