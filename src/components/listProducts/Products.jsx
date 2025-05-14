  import React, { useRef, useState, useCallback } from 'react';
  import "./StylesProducts.css";
  import { VscChromeClose } from "react-icons/vsc";
  import { SlPencil, SlTrash } from "react-icons/sl";

  const products_y = [
    {
      id: 1,
      name: "Suculenta",
      href: "#",
      imageSrc:
        "https://images.stockcake.com/public/f/7/d/f7df4c36-2d58-4568-8713-2e03e833050a_large/sunny-succulent-display-stockcake.jpg",
      imageAlt: "Suculenta en maceta.",
      price: "$5000",
      color: "Black",
    },
    {
      id: 2,
      name: "Cinta",
      href: "#",
      imageSrc:
        "https://cdn.pixabay.com/photo/2014/12/29/14/23/potted-plants-582820_1280.jpg",
      imageAlt: "Planta Cinta.",
      price: "$5200",
      color: "Black",
    },
    {
      id: 3,
      name: "Rosal Amarillo",
      href: "#",
      imageSrc:
        "https://cdn.pixabay.com/photo/2017/03/16/13/49/desk-2149265_1280.jpg",
      imageAlt: "Rosal Amarillo en maceta.",
      price: "$7300",
      color: "Black",
    },
    {
      id: 4,
      name: "Aloe Vera",
      href: "#",
      imageSrc:
        "https://cdn.pixabay.com/photo/2018/01/05/12/22/leaf-3062792_1280.jpg",
      imageAlt: "Planta de Aloe Vera.",
      price: "$6000",
      color: "Black",
    },
    {
      id: 5,
      name: "Campanilla",
      href: "#",
      imageSrc:
        "https://cdn.pixabay.com/photo/2017/01/22/19/21/house-plant-2000617_1280.jpg",
      imageAlt: "Planta Campanilla.",
      price: "$15000",
      color: "Black",
    },
    {
      id: 6,
      name: "Venus atrapamoscas",
      href: "#",
      imageSrc:
        "https://cdn.pixabay.com/photo/2015/10/04/19/12/muchoapka-971655_1280.jpg",
      imageAlt: "Planta Venus Atrapamoscas.",
      price: "$2500",
      color: "Black",
    },
    {
      id: 7,
      name: "Romero",
      href: "#",
      imageSrc:
        "https://cdn.pixabay.com/photo/2022/04/30/18/05/rosemary-7166091_1280.jpg",
      imageAlt: "Planta de Romero.",
      price: "$8600",
      color: "Black",
    },
    {
      id: 8,
      name: "Lirio de agua",
      href: "#",
      imageSrc:
        "https://cdn.pixabay.com/photo/2015/01/10/14/38/calla-595272_1280.jpg",
      imageAlt: "Flor Lirio de Agua.",
      price: "$7000",
      color: "Black",
    },
  ];

  const Products = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [products, setProducts] = useState(products_y);

    const [imageSrc, setImageSrc] = useState(null);
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');

    const fileInputRef = useRef(null);

    const abrirModal = () => setMostrarModal(true);

    const limpiarFormularioYcerrarModal = () => {
      setImageSrc(null);
      setNombre('');
      setCategoria('');
      setDescripcion('');
      setPrecio('');
      setStock('');
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setMostrarModal(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      previewFile(file);
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      previewFile(file);
    };

    const previewFile = (file) => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImageSrc(null);
        alert("Por favor, selecciona un archivo de imagen válido.");
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleSubmitProducto = (e) => {
      e.preventDefault();
      let esValido = true;
      const errores = [];

      if (!imageSrc) {
        errores.push("La imagen es requerida.");
        esValido = false;
      }
      if (!nombre.trim()) {
        errores.push("El nombre es requerido.");
        esValido = false;
      }
      if (!categoria.trim()) {
        errores.push("La categoría es requerida.");
        esValido = false;
      }
      if (!descripcion.trim()) {
        errores.push("La descripción es requerida.");
        esValido = false;
      }
      const precioNum = parseFloat(precio);
      if (isNaN(precioNum) || precioNum <= 0) {
        errores.push("El precio debe ser un número positivo.");
        esValido = false;
      }
      const stockNum = parseInt(stock, 10);
      if (isNaN(stockNum) || stockNum < 0) {
        errores.push("El stock debe ser un número entero no negativo.");
        esValido = false;
      }

      if (!esValido) {
        alert("Por favor, corrige los siguientes errores:\n- " + errores.join("\n- "));
        return;
      }

      const nuevoProducto = {
        id: Date.now(),
        name: nombre.trim(),
        category: categoria.trim(), // Guardamos la categoría
        description: descripcion.trim(), // Guardamos la descripción
        price: `$${precioNum.toFixed(2)}`,
        stock: stockNum, // Guardamos el stock
        imageSrc: imageSrc,
        imageAlt: `Imagen de ${nombre.trim()}`,
        href: "#",
      };

      alert(`Producto a guardar (simulación):\n${JSON.stringify(nuevoProducto, null, 2)}`);
      
      // Simulación: añadir al estado local de productos
      setProducts(prevProducts => [nuevoProducto, ...prevProducts]);

      limpiarFormularioYcerrarModal();
    };

    const handleEditProduct = (productId) => {
      console.log("Editar producto:", productId);
      // Aquí podrías abrir el modal con los datos del producto para editar.
      // Por ejemplo, encontrar el producto por ID, setear los estados del formulario
      // y luego llamar a abrirModal().
    };

    const handleDeleteProduct = (productId) => {
      if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        console.log("Eliminar producto:", productId);
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        // Aquí también harías la llamada a la API para eliminarlo de la base de datos.
      }
    };

    return (
      <div className="mx-5 mb-4 bg-white"> {/* Eliminado cursor-pointer global si no es necesario */}
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between my-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Nuestros productos
            </h2>
            <button
              className="bg-[#091a04] text-amber-50 px-4 py-2 rounded font-semibold hover:scale-95 transition-all duration-300 ease-in-out"
              onClick={abrirModal}
            >
              Añadir producto
            </button>
          </div>

          {mostrarModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-12 md:p-20">
              <div style={{width:"590px", background:"rgb(242, 244, 245)"}} className="rounded-lg shadow-xl p-6 sm:p-8 relative border border-gray-300 mt-8 sm:mt-0 max-h-[90vh] overflow-y-auto">
                <button
                  style={{ margin: "10px" }}
                  onClick={limpiarFormularioYcerrarModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl transition-colors hover:text-red-600 rounded-md p-1"
                >
                  <VscChromeClose size={24} />
                </button>
                <h3 style={{ margin: "15px 0" }} className="text-2xl font-semibold mb-6 text-emerald-700 text-center">Nuevo producto</h3>
                <form onSubmit={handleSubmitProducto} className="space-y-4 px-4 sm:px-6">
                  <div>
                    <label className="block mb-1.5 font-medium text-emerald-600">Imagen</label>
                    <div
                      style={{ width: "100%", background: "white", height: "180px", marginBottom: "10px" }}
                      onClick={() => fileInputRef.current.click()}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="border-2 border-dashed border-gray-300 rounded-lg w-full h-48 sm:h-64 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all"
                    >
                      {imageSrc ? (
                        <img src={imageSrc} alt="Preview" className="object-contain max-h-full max-w-full rounded-md" />
                      ) : (
                        <p className="text-gray-500 text-center p-2">Haz clic o arrastra una imagen aquí</p>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="nombreProducto" className="block mb-1.5 font-medium text-emerald-600">Nombre</label>
                    <input
                      id="nombreProducto"
                      style={{ width: "100%", marginBottom: "10px" }}
                      type="text"
                      className=" border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400"
                      placeholder="Ej: Menta"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="categoriaProducto" className="block mb-1.5 font-medium text-emerald-600">Categoría</label>
                    <input
                      id="categoriaProducto"
                      style={{ width: "100%", marginBottom: "10px" }}
                      type="text"
                      className=" border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400"
                      placeholder="Ej: Aromáticas, Interior, Exterior..."
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="descripcionProducto" className="block mb-1.5 font-medium text-emerald-600">Descripción</label>
                    <textarea
                      id="descripcionProducto"
                      style={{ width: "100%", marginBottom: "10px" }}
                      className=" border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400"
                      rows="3"
                      placeholder="Detalles sobre la planta, cuidados, etc."
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="precioProducto" className="block mb-1.5 font-medium text-emerald-600">Precio</label>
                    <input
                      id="precioProducto"
                      style={{ width: "100%", marginBottom: "10px" }}
                      type="number"
                      step="0.01"
                      className=" border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400"
                      placeholder="0.00"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="stockProducto" className="block mb-1.5 font-medium text-emerald-600">Stock</label>
                    <input
                      id="stockProducto"
                      style={{ width: "100%" }}
                      type="number"
                      className=" border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400"
                      placeholder="0"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      style={{ marginBottom: "15px", marginRight: "0px" }}
                      type="submit"
                      className="rounded py-2 bg-[#029a67] text-white px-5 py-2.5 rounded-md font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-300 ease-in-out"
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
              <div key={product.id} className="group relative"> {/* 'group' para el hover */}
                <div className="group relative"> {/* 'relative' para los botones absolutos */}
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:scale-95 transition-all group-hover:opacity-75 lg:aspect-auto lg:h-80" // La imagen se oscurece en hover
                  />
                </div>

                {/* Información del producto */}
                <div className="mt-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-gray-700">
                      <h6 href={product.href} className="hover:underline"> {/* Enlace clickeable */}
                        {product.name}
                      </h6>
                    </h3>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  </div>
                  <div className="mt-1 flex justify-center">
                    <button className="bg-[#091a04] text-amber-50 w-full rounded py-2 font-semibold group-hover:scale-95 transition-all duration-300 ease-in-out">
                      Añadir al carrito
                    </button>
                  </div>


                    <div className="flex justify-center gap-12 mt-4">
                      {/* Botón de editar */}
                      <button style={{background:"rgb(243, 245, 235)"}}
                        className="w-14 h-14 rounded-full  shadow-md flex items-center justify-center
                                  transition-all duration-300 ease-in-out
                                  hover:scale-110 hover:shadow-xl hover:bg-gray-100"
                        title="Editar"
                      >
                        <SlPencil className="text-gray-800 text-xl" />
                      </button>

                      {/* Botón de eliminar */}
                      <button style={{background:"rgb(242, 244, 245)"}}
                        className="w-14 h-14 rounded-full  shadow-md flex items-center justify-center
                                  transition-all duration-300 ease-in-out
                                  hover:scale-110 hover:shadow-xl hover:bg-gray-100"
                        title="Eliminar"
                      >
                        <SlTrash className="text-red-600 text-xl" />
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