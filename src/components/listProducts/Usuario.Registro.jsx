import React, { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import * as yup from "yup";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { saveUserDataToFirestore } from "../../firebase/userService";
import { authUsers } from "../../zustand/authUsers";

// Esquema de validación Yup
const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio."),
  email: yup.string().email("Email inválido.").required("El email es obligatorio."),
  contrasena: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres.").required("La contraseña es obligatoria."),
  rol: yup.string().required("El rol es obligatorio."),
  direccion: yup.string().required("La dirección es obligatoria."),
  telefono: yup
    .string()
    .matches(/^[0-9]{7,15}$/, "El teléfono debe ser numérico y tener entre 7 y 15 dígitos.")
    .required("El teléfono es obligatorio."),
});


const NuevoUsuarioModal = ({ mostrar, onClose, onSubmit }) => {
  const { registerWithEmailAndPassword } = authUsers(); // obtiene la función del store
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    rol: "",
    direccion: "",
    telefono: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: undefined });
  };

  
const handleRegister = async (form) => {
  // form: { nombre, email, contrasena, rol, direccion, telefono }
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    form.email,
    form.contrasena
  );
  await saveUserDataToFirestore(userCredential.user.uid, {
    nombre: form.nombre,
    email: form.email,
    rol: form.rol, // "admin" o "cliente"
    direccion: form.direccion,
    telefono: form.telefono,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Intentando registrar usuario...", form);
    try {
      await schema.validate(form, { abortEarly: false });
      // Llama a la función de registro de tu store
      await registerWithEmailAndPassword(
        form.email,
        form.contrasena,
        {
          nombre: form.nombre,
          email: form.email,
          rol: form.rol, // "admin" o "cliente"
          direccion: form.direccion,
          telefono: form.telefono,
        }
      );
      setForm({
        nombre: "",
        email: "",
        contrasena: "",
        rol: "",
        direccion: "",
        telefono: "",
      });
      setFormErrors({});
      onClose();
    } catch (err) {
      if (err.inner) {
        const errors = {};
        alert("Error al registrar usuario: " + err.message);
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setFormErrors(errors);
      }
    }
  };

  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-12 md:p-20" style={{ zIndex: 9999 }}>
      <div style={{ width: "590px", background: "rgb(242, 244, 245)" }} className="rounded-lg shadow-xl p-6 sm:p-8 relative border border-gray-300 mt-8 sm:mt-0 max-h-[90vh] overflow-y-auto">
        <button
          style={{ margin: "10px" }}
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl transition-colors hover:text-red-600 rounded-md p-1"
        >
          <VscChromeClose size={24} />
        </button>
        <h3 style={{ margin: "15px 0" }} className="text-2xl font-semibold mb-6 text-emerald-700 text-center">
          Nuevo Usuario
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4 px-4 sm:px-6">
          <div>
            <label className="block mb-1.5 font-medium text-emerald-600">Nombre</label>
            <input
              type="text"
              name="nombre"
              className={`border ${formErrors.nombre ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 bg-white text-gray-800 w-full`}
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre completo"
            />
            {formErrors.nombre && (
              <p style={{ color: "#991b1b", fontSize: "15px" }} className="mt-1">
                {formErrors.nombre}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1.5 font-medium text-emerald-600">Email</label>
            <input
              type="email"
              name="email"
              className={`border ${formErrors.email ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 bg-white text-gray-800 w-full`}
              value={form.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />
            {formErrors.email && (
              <p style={{ color: "#991b1b", fontSize: "15px" }} className="mt-1">
                {formErrors.nombre}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1.5 font-medium text-emerald-600">Contraseña</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="contrasena"
                className={`border ${formErrors.contraseña ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 bg-white text-gray-800 w-full`}
                value={form.contrasena}
                onChange={handleChange}
                placeholder="********"
              />
              <span
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#888",
                  fontSize: "1.2rem"
                }}
                tabIndex={0}
                role="button"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </span>
            </div>
            {formErrors.contraseña && (
              <p style={{ color: "#991b1b", fontSize: "15px" }} className="mt-1">
                {formErrors.nombre}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1.5 font-medium text-emerald-600">Rol</label>
            <input
              type="text"
              name="rol"
              className={`border ${formErrors.rol ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 bg-white text-gray-800 w-full`}
              value={form.rol}
              onChange={handleChange}
              placeholder="Ej: admin, cliente"
            />
            {formErrors.rol && (
              <p style={{ color: "#991b1b", fontSize: "15px" }} className="mt-1">
                {formErrors.nombre}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1.5 font-medium text-emerald-600">Dirección</label>
            <input
              type="text"
              name="direccion"
              className={`border ${formErrors.direccion ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 bg-white text-gray-800 w-full`}
              value={form.direccion}
              onChange={handleChange}
              placeholder="Dirección completa"
            />
            {formErrors.direccion && (
              <p style={{ color: "#991b1b", fontSize: "15px" }} className="mt-1">
                {formErrors.nombre}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1.5 font-medium text-emerald-600">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              className={`border ${formErrors.telefono ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 bg-white text-gray-800 w-full`}
              value={form.telefono}
              onChange={handleChange}
              placeholder="Ej: 3001234567"
            />
            {formErrors.telefono && (
              <p style={{ color: "#991b1b", fontSize: "15px" }} className="mt-1">
                {formErrors.nombre}
              </p>
            )}
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="rounded py-2 bg-[#029a67] text-white px-5 py-2.5 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-300 ease-in-out hover:bg-emerald-700"
            style={{ marginBottom:"15px" } }
            >
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoUsuarioModal;