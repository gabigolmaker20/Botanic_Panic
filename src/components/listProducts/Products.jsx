import React from "react";
import "./StylesProducts.css";
import Filtro from "./Filtro"; // 
import { useCart } from "../../zustand/cartStore";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const products = [
  {
    id: 1,
    name: "Suculenta",
    imageSrc: "https://images.stockcake.com/public/f/7/d/f7df4c36-2d58-4568-8713-2e03e833050a_large/sunny-succulent-display-stockcake.jpg",
    imageAlt: "Suculenta",
    price: 5000,
  },
  {
    id: 2,
    name: "Cinta",
    imageSrc: "https://cdn.pixabay.com/photo/2014/12/29/14/23/potted-plants-582820_1280.jpg",
    imageAlt: "Cinta",
    price: 5200,
  },
  {
    id: 3,
    name: "Rosal Amarillo",
    imageSrc: "https://cdn.pixabay.com/photo/2017/03/16/13/49/desk-2149265_1280.jpg",
    imageAlt: "Rosal Amarillo",
    price: 7300,
  },
  {
    id: 4,
    name: "Aloe Vera",
    imageSrc: "https://cdn.pixabay.com/photo/2018/01/05/12/22/leaf-3062792_1280.jpg",
    imageAlt: "Aloe Vera",
    price: 6000,
  },
  {
    id: 5,
    name: "Campanilla",
    imageSrc: "https://cdn.pixabay.com/photo/2017/01/22/19/21/house-plant-2000617_1280.jpg",
    imageAlt: "Campanilla",
    price: 15000,
  },
  {
    id: 6,
    name: "Venus atrapamoscas",
    imageSrc: "https://cdn.pixabay.com/photo/2015/10/04/19/12/muchoapka-971655_1280.jpg",
    imageAlt: "Venus atrapamoscas",
    price: 2500,
  },
  {
    id: 7,
    name: "Romero",
    imageSrc: "https://cdn.pixabay.com/photo/2022/04/30/18/05/rosemary-7166091_1280.jpg",
    imageAlt: "Romero",
    price: 8600,
  },
  {
    id: 8,
    name: "Lirio de agua",
    imageSrc: "https://cdn.pixabay.com/photo/2015/01/10/14/38/calla-595272_1280.jpg",
    imageAlt: "Lirio de agua",
    price: 7000,
  },
];
const Products = () => {
  const { addToCart } = useCart(); // 👈 HOOK DE ZUSTAND
  const [loadingId, setLoadingId] = useState(null); // para spinner individual
  const [successId, setSuccessId] = useState(null);

 const handleAddToCart = (product) => {
  setLoadingId(product.id);
  setSuccessId(null);
  
  setTimeout(() => {
    addToCart(product);
    setLoadingId(null);
    setSuccessId(product.id);
    toast.success(`${product.name} fue agregado al carrito.`, {
      position: "top-right",
      autoClose: 2000,
    });

    setTimeout(() => {
      setSuccessId(null);
    }, 1500);
  }, 1000);
};


  return (
    <div className="container-fluid mt-4 mb-8">
      <div className="row">
        <div className="col-md-3 px-4 mb-4">
          <Filtro />
        </div>

        <div className="col-md-9 pr-4">
          <h2 className="text-2xl my-4 font-bold tracking-tight text-gray-900">
            Nuestros productos
          </h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 pb-32 pr-6 mr-2">

            {products.map((product) => (
              <div key={product.id} className="group relative">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:scale-95 transition-all group-hover:opacity-75 lg:h-80"
                />
                <div className="mt-4 flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-gray-700">{product.name}</h3>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  </div>
                  <div className="mt-1 flex justify-center">
                   <button
  onClick={() => handleAddToCart(product)}
  disabled={loadingId === product.id}
  className={`bg-[#091a04] text-white w-full rounded py-2 font-semibold group-hover:scale-95 transition-all duration-300 ease-in-out flex justify-center items-center ${loadingId === product.id ? 'opacity-70 cursor-not-allowed' : ''}`}
>
  {loadingId === product.id ? (
  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
) : successId === product.id ? (
  <span className="text-green-300 text-xl font-bold">✔</span>
) : (
  "Añadir al carrito"
)}

</button>


                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default Products;