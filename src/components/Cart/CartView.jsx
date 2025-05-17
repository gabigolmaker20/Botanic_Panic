import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../zustand/cartStore";
import { MdDeleteForever } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa"; 


const CartView = () => {
  const navigate = useNavigate();
  const { items, removeFromCart } = useCart();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f6f8ee] px-4 py-8">
      <h1 className="text-5xl font-extrabold text-green-900 text-center mb-10">
        Cart
      </h1>

     {items.length === 0 ? (
  <div className="flex flex-col justify-center items-center h-[70vh] text-center">
    <img
  src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
  alt="Carrito vacío"
  className="w-32 h-32 mb-6 opacity-80"
/>

    <h2 className="text-4xl font-bold text-green-900 mb-3">Tu carrito está vacío 🛒</h2>
    <p className="text-gray-600 text-lg mb-6">Aún no has añadido productos.</p>
    <button
      className="bg-[#7e9e41] hover:bg-[#6e8e37] text-white font-semibold text-lg py-3 px-10 rounded-full shadow-lg transition-all duration-300"
      onClick={() => navigate("/products")}
    >
      Volver a la tienda
    </button>
  </div>
) : (


        <div className="max-w-4xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-4 mb-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imageSrc}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.price}</p>
                </div>
              </div>
             <button
                onClick={() => removeFromCart(item.id)}
                className="hover:text-red-700"
                title="Eliminar del carrito"
            >
            <MdDeleteForever style={{ fontSize: "42px", color: "#dc2626" }} />
             </button>


            </div>
          ))}
          {/* Sección: Tabla de totales */}
{/* Totales del carrito */}
{/* Totales del carrito - nuevo estilo armonizado */}
<div className="mt-12 bg-[#f6f8ee] border border-gray-300 rounded-2xl shadow-md p-8 w-full max-w-[800px] mx-auto">
 <div className="flex items-center gap-4 mb-6">
  <FaMoneyCheckAlt
    className="text-[#4c7c0b]"
    style={{ fontSize: "4rem", minWidth: "40px" }}
  />
  <h3 className="text-2xl font-bold text-[#091a04]">Resumen del Carrito</h3>
</div>


  <table className="w-full text-md text-gray-800">
    <tbody>
      <tr className="border-b border-gray-200">
        <td className="py-4 font-medium">Subtotal</td>
        <td className="py-4 text-right">${total}</td>
      </tr>
      <tr>
        <td className="py-4 font-medium">Total</td>
        <td className="py-4 text-right font-bold text-[#4c7c0b] text-lg">
          ${total}
        </td>
      </tr>
    </tbody>
  </table>

  <div className="mt-8 flex justify-center">
  <button className="w-full max-w-xs bg-[#4c7c0b] hover:bg-[#3a610c] transition-all duration-200 text-white text-base font-semibold py-3 px-10 rounded-full shadow-md">
    Proceder al Pago
  </button>
</div>
</div>



        </div>
      )}
    </div>
  );
};

export default CartView;
