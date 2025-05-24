    import React from "react";
    import { useNavigate } from "react-router-dom";
    import { useCart } from "../../zustand/cartStore";
    import { MdDeleteForever } from "react-icons/md";
    import { FaChevronDown, FaChevronUp } from "react-icons/fa";

    const CartView = () => {
    const navigate = useNavigate();
    const { items, removeFromCart, updateQuantity } = useCart();

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(id, newQuantity);
    };

    return (
        <div className="min-h-screen bg-[#f6f8ee] px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center text-[#4c7c0b] mb-8">
    🛒 Carrito de Compras
    </h1>

        {/* Pasos del checkout */}
        <div className="max-w-4xl mx-auto mb-12">
            <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#4c7c0b] text-white flex items-center justify-center font-bold mb-2">
                1
                </div>
                <span className="font-semibold text-[#4c7c0b]">Carrito de Compras</span>
            </div>
            
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold mb-2">
                2
                </div>
                <span className="font-semibold text-gray-500">Pago y Envío</span>
            </div>
            
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold mb-2">
                3
                </div>
                <span className="font-semibold text-gray-500">Orden Recibida</span>
            </div>
            </div>
            
            <div className="relative mt-4">
            <div className="absolute h-1 bg-gray-200 w-full top-1/2 transform -translate-y-1/2"></div>
            <div className="absolute h-1 bg-[#4c7c0b] w-1/3 top-1/2 transform -translate-y-1/2"></div>
            </div>
        </div>

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
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

            {/* Lista de productos - Estilo tabla mejorado */}
            <div className="md:col-span-2 bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-green-900 mb-8 px-2">Tus Productos</h2>
                
                {/* Encabezados de tabla */}
                <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 mb-4 px-2">
                <div className="col-span-6 font-medium text-gray-500">Producto</div>
                <div className="col-span-2 font-medium text-gray-500 text-center">Precio</div>
                <div className="col-span-2 font-medium text-gray-500 text-center">Cantidad</div>
                <div className="col-span-2.2 font-medium text-gray-500 text-right">Total</div>
                </div>
                
                {items.map((item) => (
    <div key={item.id} className="grid grid-cols-12 gap-4 items-center py-6 border-b border-gray-100 px-2">
        {/* Columna Producto */}
        <div className="col-span-6 flex items-center gap-4">
        <img
            src={item.imageSrc}
            alt={item.name}
            className="w-16 h-16 object-cover rounded border border-gray-200"
        />
        <div>
            <h3 className="font-semibold">{item.name}</h3>
        </div>
        </div>
        
        {/* Columna Precio */}
        <div className="col-span-2 text-gray-600 text-center">
        ${item.price.toFixed(2)}
        </div>
        
        {/* Columna Cantidad - Corregido el espaciado */}
        <div className="col-span-2 flex justify-center">
        <div className="flex items-center border border-gray-300 rounded">
            <button
            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
            <FaChevronDown size={12} />
            </button>
            <span className="px-2 py-1 border-x border-gray-300 min-w-[30px] text-center">
            {item.quantity}
            </span>
            <button
            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
            <FaChevronUp size={12} />
            </button>
        </div>
        </div>
        
        {/* Columna Total + Eliminar */}
    <div className="col-span-2 flex justify-end items-center gap-3">
    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
    <button
    onClick={() => removeFromCart(item.id)}
    className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-full"
    title="Eliminar"
    >
    <MdDeleteForever size={20} />
    </button>

    </div>




    </div>
    ))}
                
                <div className="mt-8 pt-4 border-t border-gray-200 px-2">
                <button
                    onClick={() => navigate("/products")}
                    className="text-[#4c7c0b] hover:text-[#3a610c] font-medium"
                >
                    ← Seguir comprando
                </button>
                </div>
            </div>
            
            {/* Resumen del pedido - Estilo tabla mejorado */}
            <div className="bg-white p-8 rounded-lg shadow h-fit sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">Total del carrito</h2>
                
                <div className="space-y-4 px-2">
                <div className="flex justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between pb-4 border-b border-gray-200">
                    <div>
                    <span className="text-gray-600">Envío</span>
                    <p className="text-sm text-gray-500 mt-1">Tarifa plana a NY.</p>
                    </div>
                    <span className="font-medium">$0.00</span>
                </div>
                
                <div className="flex justify-between pt-2">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-[#4c7c0b]">${total.toFixed(2)}</span>
                </div>
                </div>
                
                <div className="flex justify-center mt-6">
    <button
        onClick={() => navigate("/checkout")}
        className="bg-[#4c7c0b] hover:bg-[#3a610c] text-white font-semibold px-15 py-4.0 rounded-full transition-all duration-300 shadow-md"
        style={{
        minHeight: "55px",        
        borderRadius: "9999px",    
        }}
    >
        Finalizar compra
    </button>
    </div>




            </div>
            </div>
        )}
        </div>
    );
    };

    export default CartView;