// src/firebase/userService.js
import { db } from "./firebase.config"; // Para Firestore, si aún lo usas para datos extra
import { doc, setDoc, getDoc } from "firebase/firestore";
import api from "../services/api"; // <--- IMPORTA TU INSTANCIA DE AXIOS CONFIGURADA

// --- FUNCIONES PARA TU BACKEND LOCAL (MySQL + JWT) ---

export const registerBackend = async (userData) => {
  try {
    // La URL base (http://localhost:3000) ya está en la instancia 'api'
    // El token se añadirá automáticamente por el interceptor si existe (aunque para register no es típico)
    const response = await api.post("/api/auth/register", userData);
    // El token y el usuario vendrán de tu backend
    // El store de Zustand se encargará de guardar el token en localStorage y en el estado.
    return response.data; // Devuelve { token, user }
  } catch (error) {
    console.error("Error en registerBackend:", error.response ? error.response.data : error.message);
    throw error.response ? new Error(error.response.data.message || 'Error al registrar en el backend') : error;
  }
};

export const loginBackend = async (email, contraseña) => {
  try {
    const response = await api.post("/api/auth/login-db", { email, contraseña });
    // El token y el usuario vendrán de tu backend
    return response.data; // Devuelve { token, user }
  } catch (error) {
    console.error("Error en loginBackend:", error.response ? error.response.data : error.message);
    throw error.response ? new Error(error.response.data.message || 'Credenciales inválidas o error del servidor') : error;
  }
};

export const syncUserWithBackend = async (firebaseIdToken) => {
  try {
    const response = await api.post("/api/auth/login-google", { idToken: firebaseIdToken });
    // El token y el usuario vendrán de tu backend
    return response.data; // Devuelve { token, user }
  } catch (error) {
    console.error("Error en syncUserWithBackend (Google):", error.response ? error.response.data : error.message);
    throw error.response ? new Error(error.response.data.message || 'Error al sincronizar con Google en el backend') : error;
  }
};


// --- FUNCIONES PARA CRUD DE PLANTAS (Ejemplos) ---
// Estas también usarán la instancia `api` y el token se adjuntará automáticamente.

export async function createPlantaEnBackend(plantaData) {
  try {
    const response = await api.post('/api/plantas', plantaData);
    return response.data; // Devuelve la planta creada
  } catch (error) {
    console.error('Error en createPlantaEnBackend:', error.response ? error.response.data : error.message);
    throw error.response ? new Error(error.response.data.message || 'Error al crear la planta') : error;
  }
}

export async function updatePlantaEnBackend(idPlanta, plantaData) {
  try {
    const response = await api.put(`/api/plantas/${idPlanta}`, plantaData);
    return response.data; // Devuelve { message: "Planta actualizada" }
  } catch (error) {
    console.error('Error en updatePlantaEnBackend:', error.response ? error.response.data : error.message);
    throw error.response ? new Error(error.response.data.message || 'Error al actualizar la planta') : error;
  }
}

export async function deletePlantaEnBackend(idPlanta) {
  try {
    const response = await api.delete(`/api/plantas/${idPlanta}`);
    return response.data; // Devuelve { message: "Planta eliminada" }
  } catch (error) {
    console.error('Error en deletePlantaEnBackend:', error.response ? error.response.data : error.message);
    throw error.response ? new Error(error.response.data.message || 'Error al eliminar la planta') : error;
  }
}

// --- FUNCIONES OPCIONALES PARA FIRESTORE (Si las sigues necesitando) ---
// Guardar datos extra del usuario en Firestore
export const saveUserDataToFirestore = async (uid, data) => {
  try {
    // Considera qué datos realmente necesitas en Firestore si tu backend es la fuente principal
    await setDoc(doc(db, "users", uid), data, { merge: true });
    console.log("Datos extra guardados en Firestore para UID:", uid);
  } catch (error) {
    console.error("Error guardando datos de usuario en Firestore:", error);
  }
};

// Obtener datos extra del usuario desde Firestore
export const getUserDataFromFirestore = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error obteniendo datos de usuario de Firestore:", error);
    return null;
  }
};