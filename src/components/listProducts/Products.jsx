import React, { useRef, useState, useEffect } from "react";
import "./StylesProducts.css";
import { VscChromeClose } from "react-icons/vsc";
import { SlPencil, SlTrash } from "react-icons/sl";
import * as yup from "yup";

import fileUpLoad from "../../service/uploadFileToCloudinary";

const esquemaValidacion = yup.object().shape({
  imageSrc: yup.string().nullable().required("La imagen es obligatoria."),
  nombre: yup.string().trim().required("El nombre es obligatorio."),
  categoria: yup.string().trim().required("La categoría es obligatoria."),
  descripcion: yup.string().trim().required("La descripción es obligatoria."),
  precio: yup
    .number()
    .typeError("El precio debe ser un número.")
    .positive("El precio debe ser mayor a 0.")
    .required("El precio es obligatorio."),
  stock: yup
    .number()
    .typeError("El stock debe ser un número.")
    .integer("El stock debe ser un número entero.")
    .min(0, "El stock no puede ser negativo.")
    .required("El stock es obligatorio."),
});

// Asegúrate de que tus productos iniciales tengan todos los campos que usas en el formulario/edición
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
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [
    productoParaConfirmarEliminacion,
    setProductoParaConfirmarEliminacion,
  ] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);

  const limpiarCamposFormulario = () => {
    setImageSrc(null);
    setNombre("");
    setCategoria("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setIsUploading(false);
    setFormErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const abrirModalParaCrear = () => {
    setProductoAEditar(null);
    limpiarCamposFormulario();
    setMostrarModal(true);
  };

  const cerrarModalPrincipal = () => {
    limpiarCamposFormulario();
    setProductoAEditar(null);
    setMostrarModal(false);
  };

  // Cloudinary (Asegúrate que TU_CLOUD_NAME y react_preset estén configurados si usas esta función directamente)
  // const subirImagenACloudinary = async (file) => {
  //   const cloudName = "TU_CLOUD_NAME";
  //   const uploadPreset = "react_preset";
  //   if (!cloudName || cloudName === "TU_CLOUD_NAME" || !uploadPreset || uploadPreset === "react_preset") {
  //     alert("Por favor, configura tu 'cloudName' y 'uploadPreset' de Cloudinary.");
  //     console.error("Cloudinary no configurado. Revisa cloudName y uploadPreset.");
  //     return null;
  //   }
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", uploadPreset);
  //   try {
  //     const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);
  //     if (response.data && response.data.secure_url) {
  //       return response.data.secure_url;
  //     } else {
  //       throw new Error("No se pudo obtener la URL segura de la respuesta.");
  //     }
  //   } catch (error) {
  //     console.error("Error subiendo imagen con Axios:", error);
  //     let alertMessage = "Hubo un error al subir la imagen.";
  //     if (error.response) {
  //       const cloudinaryError = error.response.data?.error?.message;
  //       if (cloudinaryError) alertMessage = `Error de Cloudinary: ${cloudinaryError}`;
  //     }
  //     alert(alertMessage);
  //     return null;
  //   }
  // };

  const previewFile = async (file) => {
    if (file && file.type.startsWith("image/")) {
      setIsUploading(true);
      setFormErrors((prev) => ({ ...prev, imageSrc: undefined }));

      const cloudinaryUrl = await fileUpLoad(file); // Usar tu función importada
      setIsUploading(false);

      if (cloudinaryUrl) {
        setImageSrc(cloudinaryUrl);
      } else {
        if (fileInputRef.current) fileInputRef.current.value = "";
        // Opcional: setFormErrors(prev => ({...prev, imageSrc: "Error al subir la imagen."}));
      }
    } else {
      alert("Por favor selecciona un archivo de imagen válido.");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) previewFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) previewFile(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmitProducto = async (e) => {
    e.preventDefault();
    if (isUploading) {
      alert("Por favor, espera a que la imagen termine de subirse.");
      return;
    }

    const currentImageSrc =
      imageSrc || (productoAEditar ? productoAEditar.imageSrc : null);

    const datosParaValidar = {
      imageSrc: currentImageSrc,
      nombre,
      categoria,
      descripcion,
      precio: precio === "" ? undefined : Number(precio),
      stock: stock === "" ? undefined : Number(stock),
    };

    try {
      await esquemaValidacion.validate(datosParaValidar, {
        abortEarly: false,
      });
      setFormErrors({});

      const datosProducto = {
        name: nombre.trim(),
        category: categoria.trim(),
        description: descripcion.trim(),
        price: `$${parseFloat(precio).toFixed(2)}`,
        stock: parseInt(stock, 10),
        imageSrc: currentImageSrc,
      };

      console.log("Producto a enviar a la BD", datosProducto);

      if (productoAEditar) {
        const productosActualizados = products.map((p) =>
          p.id === productoAEditar.id
            ? { ...p, ...datosProducto, id: p.id }
            : p
        );
        setProducts(productosActualizados);
        alert("Producto actualizado exitosamente!");
      } else {
        const nuevoProductoConId = { ...datosProducto, id: Date.now() };
        setProducts((prevProducts) => [nuevoProductoConId, ...prevProducts]);
        alert("Producto creado exitosamente!");
      }
      cerrarModalPrincipal();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const erroresYup = {};
        err.inner.forEach((error) => {
          erroresYup[error.path] = error.message;
        });
        setFormErrors(erroresYup);
      } else {
        console.error("Error inesperado:", err);
        alert("Ocurrió un error inesperado.");
      }
    }
    // --- El bloque de código problemático que fue eliminado estaba aquí ---
  };

  const handleEditProduct = (producto) => {
    limpiarCamposFormulario();
    setProductoAEditar(producto);
    setNombre(producto.name);
    setCategoria(producto.category || ""); // Asegura que no sea undefined si el producto inicial no lo tenía
    setDescripcion(producto.description || ""); // Igual aquí
    setPrecio(producto.price ? producto.price.replace("$", "") : "");
    setStock(producto.stock !== undefined ? producto.stock.toString() : ""); // Igual aquí
    setImageSrc(producto.imageSrc);
    setMostrarModal(true);
  };

  const abrirModalEliminar = (producto) => {
    setProductoParaConfirmarEliminacion(producto);
    setMostrarModalEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setProductoParaConfirmarEliminacion(null);
    setMostrarModalEliminar(false);
  };

  const confirmarEliminacionProducto = () => {
    if (productoParaConfirmarEliminacion) {
      setProducts((prevProducts) =>
        prevProducts.filter(
          (p) => p.id !== productoParaConfirmarEliminacion.id
        )
      );
      alert(
        `Producto "${productoParaConfirmarEliminacion.name}" eliminado.`
      );
    }
    cerrarModalEliminar();
  };

  return (
    <div className="mx-5 mb-4 bg-white" style={{ marginTop: "8rem" }}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between my-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Nuestros productos
          </h2>
          <button
            className="bg-[#091a04] text-amber-50 px-4 py-2 rounded font-semibold hover:scale-95 transition-all duration-300 ease-in-out"
            onClick={abrirModalParaCrear}
          >
            Crear producto
          </button>
        </div>

        {mostrarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-12 md:p-20" style={{  zIndex: 9999}} >
            <div
              style={{ width: "590px", background: "rgb(242, 244, 245)" }}
              className="rounded-lg shadow-xl p-6 sm:p-8 relative border border-gray-300 mt-8 sm:mt-0 max-h-[90vh] overflow-y-auto"
            >
              <button
                style={{ margin: "10px" }}
                onClick={cerrarModalPrincipal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl transition-colors hover:text-red-600 rounded-md p-1"
              >
                <VscChromeClose size={24} />
              </button>
              <h3
                style={{ margin: "15px 0" }}
                className="text-2xl font-semibold mb-6 text-emerald-700 text-center"
              >
                {productoAEditar ? "Editar Producto" : "Nuevo Producto"}
              </h3>
              <form
                onSubmit={handleSubmitProducto}
                className="space-y-4 px-4 sm:px-6"
              >
                <div>
                  <label className="block mb-1.5 font-medium text-emerald-600">
                    Imagen
                  </label>
                  <div
                    style={{
                      width: "100%",
                      background: "white",
                      height: "180px",
                    }}
                    onClick={() => !isUploading && fileInputRef.current.click()}
                    onDrop={
                      !isUploading ? handleDrop : (e) => e.preventDefault()
                    }
                    onDragOver={
                      !isUploading ? handleDragOver : (e) => e.preventDefault()
                    }
                    className={`border-2 border-dashed ${
                      formErrors.imageSrc ? "border-red-500" : "border-gray-300"
                    } rounded-lg w-full h-48 sm:h-64 flex items-center justify-center ${
                      !isUploading
                        ? "cursor-pointer bg-gray-50 hover:bg-gray-100"
                        : "bg-gray-200 cursor-not-allowed"
                    } transition-all`}
                  >
                    {isUploading ? (
                      <p className="text-gray-600">Subiendo imagen...</p>
                    ) : imageSrc ||
                      (productoAEditar && productoAEditar.imageSrc) ? (
                      <img
                        src={
                          imageSrc ||
                          (productoAEditar && productoAEditar.imageSrc)
                        }
                        alt="Preview"
                        className="object-contain max-h-full max-w-full rounded-md"
                      />
                    ) : (
                      <p className="text-gray-500 text-center p-2">
                        Haz clic o arrastra una imagen aquí
                      </p>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                  </div>
                  {formErrors.imageSrc && (
                    <p
                      style={{ color: "rgb(219, 53, 69)", fontSize: "14px" }}
                      className="mt-1"
                    >
                      {formErrors.imageSrc}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="nombreProducto"
                    className="block mb-1.5 font-medium text-emerald-600"
                  >
                    Nombre
                  </label>
                  <input
                    id="nombreProducto"
                    style={{ width: "100%" }}
                    type="text"
                    className={`border ${
                      formErrors.nombre ? "border-red-500" : "border-gray-300"
                    } rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400`}
                    placeholder="Ej: Menta"
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                      if (formErrors.nombre)
                        setFormErrors((prev) => ({
                          ...prev,
                          nombre: undefined,
                        }));
                    }}
                  />
                  {formErrors.nombre && (
                    <p
                      style={{ color: "rgb(219, 53, 69)", fontSize: "14px" }}
                      className="mt-1"
                    >
                      {formErrors.nombre}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="categoriaProducto"
                    className="block mb-1.5 font-medium text-emerald-600"
                  >
                    Categoría
                  </label>
                  <input
                    id="categoriaProducto"
                    style={{ width: "100%" }}
                    type="text"
                    className={`border ${
                      formErrors.categoria
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400`}
                    placeholder="Ej: Aromáticas, Interior, Exterior..."
                    value={categoria}
                    onChange={(e) => {
                      setCategoria(e.target.value);
                      if (formErrors.categoria)
                        setFormErrors((prev) => ({
                          ...prev,
                          categoria: undefined,
                        }));
                    }}
                  />
                  {formErrors.categoria && (
                    <p
                      style={{ color: "rgb(219, 53, 69)", fontSize: "14px" }}
                      className="mt-1"
                    >
                      {formErrors.categoria}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="descripcionProducto"
                    className="block mb-1.5 font-medium text-emerald-600"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="descripcionProducto"
                    style={{ width: "100%" }}
                    className={`border ${
                      formErrors.descripcion
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400`}
                    rows="3"
                    placeholder="Detalles sobre la planta, cuidados, etc."
                    value={descripcion}
                    onChange={(e) => {
                      setDescripcion(e.target.value);
                      if (formErrors.descripcion)
                        setFormErrors((prev) => ({
                          ...prev,
                          descripcion: undefined,
                        }));
                    }}
                  ></textarea>
                  {formErrors.descripcion && (
                    <p
                      style={{ color: "rgb(219, 53, 69)", fontSize: "14px" }}
                      className="mt-1"
                    >
                      {formErrors.descripcion}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="precioProducto"
                    className="block mb-1.5 font-medium text-emerald-600"
                  >
                    Precio
                  </label>
                  <input
                    id="precioProducto"
                    style={{ width: "100%" }}
                    type="number"
                    step="0.01"
                    className={`border ${
                      formErrors.precio ? "border-red-500" : "border-gray-300"
                    } rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400`}
                    placeholder="0.00"
                    value={precio}
                    onChange={(e) => {
                      setPrecio(e.target.value);
                      if (formErrors.precio)
                        setFormErrors((prev) => ({
                          ...prev,
                          precio: undefined,
                        }));
                    }}
                  />
                  {formErrors.precio && (
                    <p
                      style={{ color: "rgb(219, 53, 69)", fontSize: "14px" }}
                      className="mt-1"
                    >
                      {formErrors.precio}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="stockProducto"
                    className="block mb-1.5 font-medium text-emerald-600"
                  >
                    Stock
                  </label>
                  <input
                    id="stockProducto"
                    style={{ width: "100%" }}
                    type="number"
                    className={`border ${
                      formErrors.stock ? "border-red-500" : "border-gray-300"
                    } rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 placeholder-gray-400`}
                    placeholder="0"
                    value={stock}
                    onChange={(e) => {
                      setStock(e.target.value);
                      if (formErrors.stock)
                        setFormErrors((prev) => ({
                          ...prev,
                          stock: undefined,
                        }));
                    }}
                  />
                  {formErrors.stock && (
                    <p
                      style={{ color: "rgb(219, 53, 69)", fontSize: "14px" }}
                      className="mt-1"
                    >
                      {formErrors.stock}
                    </p>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    style={{ marginBottom: "15px", marginRight: "0px" }}
                    type="submit"
                    disabled={isUploading}
                    className={`rounded py-2 bg-[#029a67] text-white px-5 py-2.5 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-300 ease-in-out ${
                      isUploading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-emerald-700"
                    }`}
                  >
                    {isUploading
                      ? "Subiendo..."
                      : productoAEditar
                      ? "Actualizar Producto"
                      : "Crear Producto"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {mostrarModalEliminar && productoParaConfirmarEliminacion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div
              style={{ background: "rgb(243, 245, 235)" }}
              className=" rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md"
            >
              <h3
                style={{ margin: "10px" }}
                className="text-xl font-semibold mb-4 text-gray-800"
              >
                Confirmar Eliminación
              </h3>
              <p style={{ margin: "10px" }} className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas eliminar el producto "
                <strong>{productoParaConfirmarEliminacion.name}</strong>
                "? Esta acción no se puede deshacer.
              </p>
              <div
                style={{ background: "rgb(243, 245, 235)" }}
                className="flex justify-end space-x-3"
              >
                <button
                  style={{ marginBottom: "10px", marginRight: "10px" }}
                  onClick={cerrarModalEliminar}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  style={{ marginBottom: "10px", marginRight: "10px" }}
                  onClick={confirmarEliminacionProducto}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="group relative">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:scale-95 transition-all group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm text-gray-700">{product.name}</h5>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>

                <div className="mt-1 flex justify-center">
                  <button className="bg-[#091a04] text-amber-50 w-full rounded py-2 font-semibold group-hover:scale-95 transition-all duration-300 ease-in-out">
                    Añadir al carrito
                  </button>
                </div>
                <div className="flex justify-center gap-12 mt-4">
                  <button
                    style={{ background: "rgb(243, 245, 235)" }}
                    onClick={() => handleEditProduct(product)}
                    className="w-14 h-14 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:bg-gray-100"
                    title="Editar"
                  >
                    <SlPencil className="text-gray-800 text-xl" />
                  </button>
                  <button
                    style={{ background: "rgb(242, 244, 245)" }}
                    onClick={() => abrirModalEliminar(product)}
                    className="w-14 h-14 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:bg-gray-100"
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
