import { create } from "zustand";
import { auth, provider, signInWithPopup } from "../firebase/firebase.config";
import Swal from "sweetalert2";


export const authUsers = create((set) => ({
    //Estados iniciales
    user: null,
    loading: false,
    error: null,
    isAuthentication: false,
    usuarios: [],
    dataSingIn: null,


    //Funciones para cambiar los estados (Acciones)

    loginWithGoogle: async () => {
        set({ loading: true });
        try {
            const response = await signInWithPopup(auth, provider);
            console.log('Respuesta desde zustand: ', response.user);

            Swal.fire({
                title: `Hola ${response.user.displayName}`,
                text: "Bienvenid@",
                icon: "success",
                confirmButtonText: "OK",
            })

            set({
                user: response.user,
                loading: false,
                isAuthentication: true
            });
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
    }
}));