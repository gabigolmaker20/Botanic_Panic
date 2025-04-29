    import React, { useState, useEffect } from 'react';
    import UserProfile from '../Perfiles/UserProfile'; 
    import { getLoggedInUser } from '../Perfiles/userData-';
    import { useNavigate } from 'react-router-dom';

    function ProfilePage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUserId = localStorage.getItem("loggedInUserId");

        if (!loggedInUserId) {
        console.error("No hay usuario logueado.");
        setIsLoading(false);
        return;
        }

        const timer = setTimeout(() => {
        const userData = getLoggedInUser(loggedInUserId);
        if (userData) {
            setCurrentUser(userData);
        } else {
            console.error("Usuario no encontrado.");
        }
        setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleEditProfile = () => {
        console.log("Acción: Editar Perfil para el usuario:", currentUser?.userName);
        alert("Funcionalidad 'Editar Perfil' no implementada.");
    };

    const handleNavigate = (path) => {
        console.log(`Acción: Navegar a ${path} para el usuario:`, currentUser?.userName);
        alert(`Navegando a ${path} (simulado)`);
    };

    const handleChangeProfilePic = () => {
        console.log("Acción: Cambiar foto de perfil");
        alert("Funcionalidad 'Cambiar Foto de Perfil' no implementada.");
    };

    const handleChangeCoverPic = () => {
        console.log("Acción: Cambiar foto de portada");
        alert("Funcionalidad 'Cambiar Foto de Portada' no implementada.");
    };

    const handleLogout = () => {
        localStorage.removeItem("loggedInUserId");
        alert("Has cerrado sesión exitosamente.");
        navigate("/"); // Navega a Home
        window.location.reload(); // Recarga la página
    };
    

    if (isLoading) {
        return (
        <div className="container mt-4">
            <p className="text-center">Cargando perfil...</p>
            <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            </div>
        </div>
        );
    }

    if (!currentUser) {
        return (
        <div className="container mt-4">
            <p className="alert alert-warning">
            No se pudo cargar la información del perfil. Por favor,{" "}
            <a href="/login">intenta iniciar sesión</a> de nuevo.
            </p>
        </div>
        );
    }

    return (
        <div className="container mt-4">
        <UserProfile
            userName={currentUser.userName}
            userBio={currentUser.bio}
            profileImageUrl={currentUser.profileImageUrl}
            coverImageUrl={currentUser.coverImageUrl}
            itemCount={currentUser.cartItemCount}
            onEditProfile={handleEditProfile}
            onNavigate={handleNavigate}
            onChangeProfilePic={handleChangeProfilePic}
            onChangeCoverPic={handleChangeCoverPic}
        />

        {/* Botón Cerrar Sesión */}
        <div className="d-flex justify-content-end mt-4">
            <button style={{marginBottom:"15px"}}
            onClick={handleLogout}
            className="btn btn-danger px-4 py-2"
            >
            Cerrar Sesión
            </button>
        </div>
        </div>
    );
    }

    export default ProfilePage;
