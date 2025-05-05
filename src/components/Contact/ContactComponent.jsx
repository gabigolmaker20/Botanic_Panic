import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'; // Importa Form desde react-bootstrap para la estructura del formulario
import { useForm } from "react-hook-form"; // Importa useForm de react-hook-form para manejar el estado y validación del formulario
import * as yup from "yup";// Importa yup para la definición del esquema de validación
import { yupResolver } from '@hookform/resolvers/yup'; // Importa yupResolver para conectar yup con react-hook-form
import "./StylesContact.css";

// --- Esquema de Validación con Yup ---

// Define las reglas de validación para los campos del formulario.
const esquemaValidacion = yup.object().shape({
    nombre: yup.string().required("El nombre es obligatorio"),
    apellidos: yup.string().required("Los apellidos son obligatorios"),
    telefono: yup.string().optional(),
    correo: yup.string().email("El formato del correo no es válido")
    .required("El correo electrónico es obligatorio"),
    comentarios: yup.string().optional(),
    // recaptcha: yup.boolean().oneOf([true], 'Debes verificar que no eres un robot') // Comentado como en el original
});

const Contactos = () => {

    // --- Configuración de React Hook Form ---
    const {
        register,           // Función para registrar inputs en el hook
        handleSubmit,       // Función para manejar el envío del formulario (valida antes de ejecutar onSubmit)
        formState: { errors, isSubmitting }, // Estado del formulario: errores de validación y estado de envío
        reset,              // Función para resetear los campos del formulario
    } = useForm({
        resolver: yupResolver(esquemaValidacion), // Usa el resolver de Yup para la validación
        defaultValues: { // Define los valores iniciales (similar a initialValues en Formik)
            nombre: "",
            apellidos: "",
            telefono: "",
            correo: "",
            comentarios: "",
            // recaptcha: false, 
        }
    });

    // --- Función: Envío del Formulario ---

    // Se ejecuta SÓLO si la validación es exitosa. Recibe los datos del formulario.

    const onSubmit = (data) => {
        // Simula el envío a un servidor
        console.log("Datos del formulario:", data);
        alert("Formulario enviado con éxito. 🎉\n" + JSON.stringify(data, null, 2));

        // Resetea el formulario a los valores por defecto después del envío.
        reset();
    };



    return (
        // Contenedor principal 
        <div style={{ backgroundColor: "#f3f5ec" }} >

            {/* Encabezado con imagen */}
            <div className="encabezado-contacto">
                <img
                    src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    alt="Fondo del encabezado de Contacto"
                    className="imagen-encabezado"
                />
                <div className="titulo-sobre-imagen">Contáctenos</div>
            </div>

            {/* Contenedor del contenido principal */}
            <div style={{ marginLeft: "50px", marginRight: "50px", backgroundColor: "#f3f5ec" }} className="seccion-contacto py-5">
                <Row>

                    {/* Columna Izquierda (Mapa e Info ) */}
                    <Col md={6} className="mb-4 mb-md-0">
                        <h3 className="titulo-seccion">CONTÁCTANOS</h3>
                        <div className="info-contacto">
                            <p style={{fontSize:"20px"}}><strong style={{fontSize:"20px"}}>Teléfono:</strong> +57 313 456 7890</p>
                            <p style={{fontSize:"20px"}}><strong style={{fontSize:"20px"}}>Dirección:</strong> Calle 9  #carrera 27, Bucaramanga, Santander</p>
                            <a  href="mailto:ejemplo@correo.com" style={{ color: 'inherit', textDecoration: 'none', fontSize:"20px" }}> {/* mailto: sirve para que, al hacer clic en el correo electrónico,
                                el navegador abra automáticamente  la aplicación de correo predeterminada del usuario (como Outlook, Gmail, Apple Mail, etc.)*/}
                            <strong style={{fontSize:"20px"}}>Correo:</strong> botanicpanic48@gmail.com
                            </a>

                        </div>
                        <div className="contenedor-mapa">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1979.4366827019544!2d-73.1209847918734!3d7.140639299178554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e68156d1c0c8689%3A0x873d16bf1221d419!2sUniversidad%20Industrial%20de%20Santander!5e0!3m2!1ses!2sco!4v1743882242278!5m2!1ses!2sco"
                                allowFullScreen=""
                                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                                className="mapa-iframe"
                                title="Mapa de Ubicación"></iframe> {/* Añadido title por accesibilidad */}
                        </div>
                    </Col>


                    {/* --- Columna Derecha (Formulario con React Hook Form) --- */}
                    <Col md={6}>
                        <h3 className="titulo-seccion">DÉJANOS TUS DATOS</h3>
                        <p style={{fontSize:"20px"}} className="descripcion-formulario">
                            Permítenos contactarlo y resolver sus dudas o sugerencias.
                        </p>

                        {/* --- Formulario de React Bootstrap manejado por React Hook Form --- */}

                        {/* handleSubmit valida antes de llamar a onSubmit */}
                        <Form noValidate onSubmit={handleSubmit(onSubmit)}>

                            {/* Fila para Nombre y Apellidos */}
                            <Row>
                                <Col md={6}>
                                    {/* Grupo Nombre */}
                                    <Form.Group className="mb-3" controlId="formNombre">
                                        <Form.Label style={{fontSize:"20px"}}>
                                            Nombre: <span className="campo-obligatorio">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nombre"
                                            // Registra el input con react-hook-form
                                            {...register("nombre")}
                                            // Muestra estado inválido si hay error para este campo
                                            isInvalid={!!errors.nombre}
                                        />
                                        {/* Muestra el mensaje de error si existe */}
                                        <Form.Control.Feedback type="invalid">
                                            {errors.nombre?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>


                                <Col md={6}>
                                    {/* Grupo Apellidos */}
                                    <Form.Group className="mb-3" controlId="formApellidos">
                                        <Form.Label style={{fontSize:"20px"}}>
                                            Apellidos: <span className="campo-obligatorio">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Apellidos"
                                            {...register("apellidos")}
                                            isInvalid={!!errors.apellidos}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.apellidos?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Grupo Teléfono */}
                            <Form.Group className="mb-3" controlId="formTelefono">
                                <Form.Label style={{fontSize:"20px"}}>Teléfono:</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Teléfono (opcional)"
                                    {...register("telefono")}
                                
                                />
    
                            </Form.Group>

                            {/* Grupo Correo Electrónico */}
                            <Form.Group className="mb-3" controlId="formCorreo">
                                <Form.Label style={{fontSize:"20px"}}>
                                    Correo electrónico: <span className="campo-obligatorio">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="correo@gmail.com"
                                    {...register("correo")}
                                    isInvalid={!!errors.correo}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.correo?.message}
                                </Form.Control.Feedback>
                            </Form.Group>


                            {/* Grupo Comentarios */}
                            <Form.Group className="mb-3" controlId="formComentarios">
                                <Form.Label style={{fontSize:"20px"}}>Comentarios:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Escribe aquí tus comentarios o preguntas (opcional)"
                                    {...register("comentarios")}

                                />
                            </Form.Group>



                            {/* Botón de Envío */}
                            <Button
                                className="boton-enviar"
                                type="submit"
                                // Deshabilitado mientras se envía el formulario
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Contactos;