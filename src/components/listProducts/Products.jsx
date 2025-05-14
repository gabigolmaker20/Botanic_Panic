import React, { useEffect } from "react";
import "./StylesProducts.css";
import useProductsStore from "../../zustand/products/productsState";

const Products = () => {
  const { products, fetchProducts } = useProductsStore();

  console.log('Productos desde el componente' ,products)
  useEffect(() => {
    fetchProducts();
  }, []);

  // const products = [
  //   {
  //     id: 1,
  //     name: "Suculenta",
  //     href: "#",
  //     imageSrc:
  //       "https://images.stockcake.com/public/f/7/d/f7df4c36-2d58-4568-8713-2e03e833050a_large/sunny-succulent-display-stockcake.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //     price: "$5000",
  //     color: "Black",
  //   },
  //   {
  //     id: 2,
  //     name: "Cinta",
  //     href: "#",
  //     imageSrc:
  //       "https://cdn.pixabay.com/photo/2014/12/29/14/23/potted-plants-582820_1280.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //     price: "$5200",
  //     color: "Black",
  //   },
  //   {
  //     id: 3,
  //     name: "Rosal Amarillo",
  //     href: "#",
  //     imageSrc:
  //       "https://cdn.pixabay.com/photo/2017/03/16/13/49/desk-2149265_1280.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //     price: "$7300",
  //     color: "Black",
  //   },
  //   {
  //     id: 4,
  //     name: "Aloe Vera",
  //     href: "#",
  //     imageSrc:
  //       "https://cdn.pixabay.com/photo/2018/01/05/12/22/leaf-3062792_1280.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //     price: "$6000",
  //     color: "Black",
  //   },
  //   {
  //     id: 5,
  //     name: "Campanilla",
  //     href: "#",
  //     imageSrc:
  //       "https://cdn.pixabay.com/photo/2017/01/22/19/21/house-plant-2000617_1280.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //     price: "$15000",
  //     color: "Black",
  //   },
  //   {
  //     id: 6,
  //     name: "Venus atrapamoscas",
  //     href: "#",
  //     imageSrc:
  //       "https://cdn.pixabay.com/photo/2015/10/04/19/12/muchoapka-971655_1280.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //     price: "$2500",
  //     color: "Black",
  //   },
  //   {
  //     id: 7,
  //     name: "Romero",
  //     href: "#",
  //     imageSrc:
  //       "https://cdn.pixabay.com/photo/2022/04/30/18/05/rosemary-7166091_1280.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //     price: "$8600",
  //     color: "Black",
  //   },
  //   {
  //     id: 8,
  //     name: "Lirio de agua",
  //     href: "#",
  //     imageSrc:
  //       "https://cdn.pixabay.com/photo/2015/01/10/14/38/calla-595272_1280.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //     price: "$7000",
  //     color: "Black",
  //   },
  // ];

  return (
    <div className="mx-5 mb-4 cursor-pointer bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl my-4 font-bold tracking-tight text-gray-900">
          Nuestros productos
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <img
                alt={product.nombre}
                src={product.imagen}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:scale-95 transition-all group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex-col justify-between">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-700">
                    <div>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.nombre}
                    </div>
                  </h3>
                  <p className="text-sm font-medium text-gray-900">
                    {product.precio}
                  </p>
                </div>
                <div className="mt-1 flex justify-center">
                  <button className="bg-[#091a04] text-amber-50 w-full rounded py-2 font-semibold group-hover:scale-95 transition-all duration-300 ease-in-out">
                    Añadir al carrito
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
