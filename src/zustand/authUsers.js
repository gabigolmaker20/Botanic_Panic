// src/zustand/authUsers.js
import { create } from "zustand";
import { auth, provider, signInWithPopup, signOut } from "../firebase/firebase.config"; // Firebase para Google Auth y signOut
import Swal from "sweetalert2";

// IMPORTA las funciones de TU backend desde userService
import {
  registerBackend,
  loginBackend,
  syncUserWithBackend, // Para el login con Google via tu backend
  // getUserDataFromFirestore, // Opcional: si necesitas cargar datos extra de Firestore
  // saveUserDataToFirestore,  // Opcional: si necesitas guardar datos extra en Firestore
} from "../firebase/userService"; // Ajusta la ruta si es necesario

export const authUsers = create((set, get) => ({
  user: null, // Contendrá el objeto user de TU backend { id, nombre, email, rol, etc. }
  token: localStorage.getItem('token') || null, // Carga el token de localStorage al inicio
  loading: false,
  error: null,
  isAuthentication: !!localStorage.getItem('token'), // Verdadero si hay un token al inicio

  // Acción para manejar la respuesta exitosa de autenticación del backend
  handleAuthSuccess: (backendResponse) => {
    if (backendResponse.token && backendResponse.user) {
      localStorage.setItem('token', backendResponse.token);
      set({
        user: backendResponse.user,
        token: backendResponse.token,
        loading: false,
        isAuthentication: true,
        error: null
      });
      return true; // Indica éxito
    } else {
      // Esto no debería suceder si el backend responde correctamente
      throw new Error(backendResponse.message || "Respuesta de autenticación incompleta del backend");
    }
  },

  // Acción para manejar errores de autenticación
  handleAuthError: (error, defaultMessage = "Ocurrió un error") => {
    const errorMessage = error.message || defaultMessage;
    console.error("Error de autenticación en store:", errorMessage, error);
    localStorage.removeItem('token');
    set({
      error: errorMessage,
      loading: false,
      isAuthentication: false,
      user: null,
      token: null
    });
    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "OK",
    });
    throw error; // Re-lanza para que el componente pueda saber que falló si es necesario
  },

  loginWithGoogle: async () => {
    set({ loading: true, error: null });
    try {
      const firebaseAuthResponse = await signInWithPopup(auth, provider);
      const firebaseIdToken = await firebaseAuthResponse.user.getIdToken();
      const backendResponse = await syncUserWithBackend(firebaseIdToken); // Llama a tu backend

      get().handleAuthSuccess(backendResponse); // Usa la función helper

      Swal.fire({ // SweetAlert de éxito específico para Google
        title: `Hola ${backendResponse.user?.nombre || firebaseAuthResponse.user.displayName}`,
        text: "Bienvenid@ con Google!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      get().handleAuthError(error, "No se pudo iniciar sesión con Google.");
    }
  },

  registerWithEmailAndPassword: async (email, password, extraData) => {
    set({ loading: true, error: null });
    try {
      const backendResponse = await registerBackend({
        nombre: extraData.nombre,
        email,
        contraseña: password,
        rol: extraData.rol || "cliente",
        direccion: extraData.direccion,
        telefono: extraData.telefono,
      });

      get().handleAuthSuccess(backendResponse); // Usa la función helper

      Swal.fire({
        title: `Registro exitoso`,
        text: "Bienvenid@ " + (backendResponse.user?.nombre || ""),
        icon: "success",
        confirmButtonText: "OK",
      });
      // Opcional: Si después de registrar en tu backend quieres guardar datos extra en Firestore
      // if (backendResponse.user && firebaseAuthResponse?.user?.uid) { // Necesitarías el UID de Firebase si se creara una cuenta Firebase también
      //   await saveUserDataToFirestore(firebaseAuthResponse.user.uid, { /* datos para firestore */ });
      // }
    } catch (error) {
      get().handleAuthError(error, "No se pudo completar el registro.");
    }
  },

  loginWithEmailAndPassword: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const backendResponse = await loginBackend(email, password); // Llama a tu backend
      get().handleAuthSuccess(backendResponse); // Usa la función helper

      Swal.fire({
        title: `Hola ${backendResponse.user?.nombre}`,
        text: "Bienvenid@ de nuevo",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      get().handleAuthError(error, "Credenciales inválidas o error en el servidor.");
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      if (auth.currentUser) {
        await signOut(auth); // Cierra sesión de Firebase si estaba activa
      }
      localStorage.removeItem('token'); // Elimina TU token JWT
      set({
        user: null,
        token: null,
        loading: false,
        isAuthentication: false,
        error: null
      });
      Swal.fire({
        title: "Adiós!",
        text: "Has cerrado sesión.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      const errorMessage = error.message || "Ocurrió un problema al cerrar sesión.";
      console.error("Error en el logout: ", errorMessage, error);
      localStorage.removeItem('token'); // Asegura limpiar el token local
      set({ user: null, token: null, loading: false, isAuthentication: false, error: errorMessage });
      Swal.fire({
        title: "Error al cerrar sesión",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  },

  // Acción para cargar el usuario si hay un token al iniciar la aplicación
  // Esto necesitaría un endpoint en tu backend: GET /api/auth/me o similar
  // que valide el token y devuelva los datos del usuario.
  /*
  fetchUserOnLoad: async () => {
    const token = get().token;
    if (token && !get().user) { // Si hay token pero no usuario en el estado
      set({ loading: true });
      try {
        // Asume que tienes una función en api.js o userService.js:
        // const userData = await api.get('/api/auth/me'); // El interceptor adjuntará el token
        // set({ user: userData.data, isAuthentication: true, loading: false, error: null });
        console.log("fetchUserOnLoad: Implementar llamada a /api/auth/me para validar token y obtener usuario.");
        set({ loading: false }); // Quitar esto cuando se implemente
      } catch (error) {
        console.error("Error validando token en carga:", error);
        get().logout(); // Si el token es inválido, cierra sesión
      }
    }
  }
  */

  
  fetchUserOnLoad: async () => {
    const token = get().token;
    if (token && !get().user) {
      set({ loading: true, error: null });
      try {
        const { default: api } = await import('../services/api'); // Importación dinámica
        const response = await api.get('/api/auth/me'); // Tu backend valida el token

        if (response.data && response.data.user) {
          set({
            user: response.data.user,
            isAuthentication: true,
            loading: false,
            error: null
          });
        } else {
          console.warn("fetchUserOnLoad: /api/auth/me no devolvió usuario. Limpiando sesión.");
          localStorage.removeItem('token');
          set({ user: null, token: null, isAuthentication: false, loading: false, error: "Sesión inválida." });
        }
      } catch (error) {
        console.error("fetchUserOnLoad: Error al validar token:", error.message);
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthentication: false, loading: false });
      }
    } else if (!token && get().isAuthentication) {
      set({ user: null, token: null, isAuthentication: false, loading: false, error: null });
    } else {
      set({ loading: false });
    }
  }
}));

// Para llamar a fetchUserOnLoad al inicio de tu app:
// En tu main.jsx o App.jsx:
// useEffect(() => {
//   authUsers.getState().fetchUserOnLoad();
// }, []);