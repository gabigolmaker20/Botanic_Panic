import React, { useState } from 'react';
import "./StylesProducts.css";
import { VscChromeClose } from "react-icons/vsc";

import { FaHeart, FaShoppingCart } from 'react-icons/fa';


const products = [
  {
    id: 1,
    name: "Suculenta",
    href: "#",
    imageSrc:
      "https://images.stockcake.com/public/f/7/d/f7df4c36-2d58-4568-8713-2e03e833050a_large/sunny-succulent-display-stockcake.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$5000",
    color: "Black",
  },
  {
    id: 2,
    name: "Cinta",
    href: "#",
    imageSrc:
      "https://cdn.pixabay.com/photo/2014/12/29/14/23/potted-plants-582820_1280.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$5200",
    color: "Black",
  },
  {
    id: 3,
    name: "Rosal Amarillo",
    href: "#",
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/03/16/13/49/desk-2149265_1280.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$7300",
    color: "Black",
  },
  {
    id: 4,
    name: "Aloe Vera",
    href: "#",
    imageSrc:
      "https://cdn.pixabay.com/photo/2018/01/05/12/22/leaf-3062792_1280.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$6000",
    color: "Black",
  },
  {
    id: 5,
    name: "Campanilla",
    href: "#",
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/01/22/19/21/house-plant-2000617_1280.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$15000",
    color: "Black",
  },
  {
    id: 6,
    name: "Venus atrapamoscas",
    href: "#",
    imageSrc:
      "https://cdn.pixabay.com/photo/2015/10/04/19/12/muchoapka-971655_1280.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$2500",
    color: "Black",
  },
  {
    id: 7,
    name: "Romero",
    href: "#",
    imageSrc:
      "https://cdn.pixabay.com/photo/2022/04/30/18/05/rosemary-7166091_1280.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$8600",
    color: "Black",
  },
  {
    id: 8,
    name: "Lirio de agua",
    href: "#",
    imageSrc:
      "https://cdn.pixabay.com/photo/2015/01/10/14/38/calla-595272_1280.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$7000",
    color: "Black",
  },
];

const Products = () => {
    const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return (
    
    <div className="mx-5 mb-4 cursor-pointer bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="flex items-center justify-between my-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Nuestros productos
        </h2>
        <button className="bg-[#091a04] text-amber-50 px-4 py-2 rounded font-semibold hover:scale-95 transition-all duration-300 ease-in-out" onClick={() => abrirModal()}>
          Añadir producto
        </button>
      </div>


     {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-20 sm:p-12 md:p-20">
          <div style={{width:"590px"}} className="bg-white rounded-lg shadow-xl  p-20 relative border border-gray-300 mt-8 sm:mt-0">
            <button style={{margin:"15px"}} 
              onClick={cerrarModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl transition-colors hover:text-red-600 rounded-md"
            >
              <VscChromeClose  size={24}/>
            </button>

            <h3  style={{margin:"25px"}} className="text-2xl font-semibold mb-6 text-emerald-700">Nuevo producto</h3>
            <form className="space-y-4">
              <div>
                <label   style={{marginLeft:"25px"}}className="block mb-1.5 font-medium text-emerald-600">Imagen</label>
                <input  style={{marginLeft:"25px", width:"540px"}}
                  type="file"
                  className=" text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                />
              </div>
              <div>
                <label  style={{marginLeft:"25px"}}className="block mb-1.5 font-medium text-emerald-600">Nombre</label>
                <input style={{marginLeft:"25px", width:"540px"}}
                  type="text"
                  className=" border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400"
                  placeholder="Ej: Menta"
                />
              </div>
              <div>
                <label  style={{marginLeft:"25px"}}className="block mb-1.5 font-medium text-emerald-600">Categoria</label>
                <input style={{marginLeft:"25px", width:"540px"}}
                  type="text"
                  className=" border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400"
                  placeholder="Ej: Aromáticas, Interior, Exterior..."
                />
              </div>
              <div>
                <label  style={{marginLeft:"25px"}} className="block mb-1.5 font-medium text-emerald-600">Descripción</label>
                <textarea style={{marginLeft:"25px", width:"540px"}}
                  className=" border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400"
                  rows="3"
                  placeholder="Detalles sobre la planta, cuidados, etc."
                ></textarea>
              </div>
              <div>
                <label  style={{marginLeft:"25px"}} className="block mb-1.5 font-medium text-emerald-600">Precio</label>
                <input style={{marginLeft:"25px", width:"540px"}}
                  type="number"
                  step="0.01"
                  className=" border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label style={{marginLeft:"25px"}}className="block mb-1.5 font-medium text-emerald-600">Stock</label>
                <input style={{marginLeft:"25px", width:"540px"}}
                  type="number"
                  className=" border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400"
                  placeholder="0"
                />
              </div>
              <div className="flex justify-end pt-4">
                <button  style={{marginBottom:"15px",marginRight:"25px"}}
                  type="submit"
                  className=" rounded py-2 bg-[#029a67] text-black px-5 py-2.5 rounded-md font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-300 ease-in-out"
                >
                  Guardar producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                {/* Imagen con botones flotantes */}
                <div className="relative group">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:scale-95 transition-all group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />

                </div>



                {/* Información del producto */}
                <div className="mt-4 flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-gray-700">
                      <div>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </div>
                    </h3>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  </div>

                  <div className="mt-1 flex justify-center">
                    <button className="bg-[#091a04] text-amber-50 w-full rounded py-2 font-semibold group-hover:scale-95 transition-all duration-300 ease-in-out">
                      Añadir al carrito
                    </button>
                  </div>

                  <div className="flex justify-between gap-4 mt-2">
                    <button className="bg-[#0a3d91] text-white w-full rounded py-2 font-semibold group-hover:scale-95 transition-all duration-300 ease-in-out">
                      Editar
                    </button>
                    <button className="bg-red-700 text-white w-full rounded py-2 font-semibold group-hover:scale-95 transition-all duration-300 ease-in-out flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a2 2 0 00-2-2H9a2 2 0 00-2 2m10 0H5" />
                      </svg> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}

        </div>
      </div>
    </div>
  );
};

export default Products;
