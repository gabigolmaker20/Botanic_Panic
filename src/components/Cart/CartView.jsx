import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../zustand/cartStore";
import { MdDeleteForever } from "react-icons/md";


const CartView = () => {
  const navigate = useNavigate();
  const { items, removeFromCart } = useCart(); // ✅ añadimos removeFromCart

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f6f8ee] px-4 py-8">
      <h1 className="text-5xl font-extrabold text-green-900 text-center mb-10">
        Cart
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-20 text-center">
          <p className="text-gray-700 text-lg mb-8">
            Your cart is currently empty.
          </p>
          <button
            className="bg-[#7e9e41] hover:bg-[#6e8e37] text-white font-semibold py-2 px-6 rounded-full shadow-md"
            onClick={() => navigate("/products")}
          >
            Return to shop
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
<div className="mt-10 w-full max-w-xl ml-auto rounded-lg overflow-hidden shadow-md bg-[#f7f9ee] border border-gray-200">
  <div className="text-left text-gray-900 font-bold text-2xl px-6 py-5 border-b border-gray-300">
    Cart totals
  </div>
  <table className="w-full text-sm text-gray-700">
    <tbody>
      <tr className="border-b border-gray-300">
        <td className="px-6 py-4 font-semibold text-lg text-gray-900">Subtotal</td>
        <td className="px-6 py-4 text-right text-base font-medium">${total}</td>
      </tr>
      <tr>
        <td className="px-6 py-4 font-semibold text-lg text-gray-900">Total</td>
        <td className="px-6 py-4 text-right text-lg font-bold text-green-800">${total}</td>
      </tr>
    </tbody>
  </table>
</div>

{/* Botón de pago */}
<div className="mt-8 flex justify-end">
  <button className="bg-[#7e9e41] hover:bg-[#6e8e37] text-white font-semibold py-3 px-12 rounded-full shadow-xl transition-all duration-300">
    Proceder al Pago
  </button>
</div>


        </div>
      )}
    </div>
  );
};

export default CartView;
