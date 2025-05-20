import { create } from "zustand";
import { auth, provider, signInWithPopup, signOut } from "../firebase/firebase.config";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import apiClient from "../api/apiClient";


export const authUsers = create((set) => ({
    //Estados iniciales
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthentication: false,


    //Funciones para cambiar los estados (Acciones)

    loginWithGoogle: async () => {
        set({ loading: true });
        try {
            const response = await signInWithPopup(auth, provider);
            const idToken = await response.user.getIdToken();
            console.log('Respuesta desde zustand: ', response.user);

            //Enviar token al backend
            const backendResponse = await apiClient.post("/auth/login-google", { idToken });
            const { token, user } = backendResponse.data;

            Swal.fire({
                title: `Hola ${response.user.displayName}`,
                text: "Bienvenid@",
                icon: "success",
                confirmButtonText: "OK",
            })

            set({
                user: user ? response.user : null,
                token: token,
                loading: false,
                isAuthentication: true
            });
            localStorage.setItem("token", token); // Guardar el token en el localStorage
        } catch (error) {
            console.log("Error en el login: ", error);
            Swal.fire({
                title: "Error!",
                text: "Do you want to continue",
                icon: "error",
                confirmButtonText: "Cool",
            });

            set({ error, loading: false, isAuthentication: false });
        }
    },

    loginWithEmailAndPassword: async (email, password) => {
        set({ loading: true });
        try {
            const response = await apiClient.post("/auth/login-db", { email, contraseña: password });
            const { token, user } = response.data;
            console.log('Respuesta desde zustand: ', response.data);

            set({
                user: user,
                token: token,
                loading: false,
                isAuthentication: true
            });
            localStorage.setItem("token", token); // Guardar el token en el localStorage
        } catch (error) {
            console.log("Error en el login: ", error);
            Swal.fire({
                title: "Error!",
                text: "Do you want to continue",
                icon: "error",
                confirmButtonText: "Cool",
            });

            set({ error, loading: false, isAuthentication: false });
        }
    },

    setUser: (user) => set({ user }),
    setIsAuthenticated: (isAuthentication) => set({ isAuthentication }),

    logout: async () => {
        try {
            await signOut(auth);
            set({
                user: null,
                token: null,
                loading: false,
                isAuthentication: false
            });
            localStorage.removeItem("token"); // Eliminar el token del localStorage
            Swal.fire({
                title: "Adiós!",
                text: "Hasta luego",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                window.location.reload(); // Recargar la página después de cerrar sesión
            });

        } catch (error) {
            console.log("Error en el logout: ", error);
            Swal.fire({
                title: "Error!",
                text: "Do you want to continue",
                icon: "error",
                confirmButtonText: "Cool",
            });
        }
    }
}));