import React from 'react';
import estilos from './ListaArchivosServidor.module.css';

function ListaArchivosServidor({ archivos, urlBaseApi, alEliminarArchivo }) {
    if (!archivos) {
        return <p className={estilos.sinArchivos}>Cargando archivos del servidor...</p>;
    }
    if (archivos.length === 0) {
        return <p className={estilos.sinArchivos}>No hay archivos actualmente en el servidor.</p>;
    }

    const obtenerIconoArchivo = (nombreArchivo) => {
        const extension = nombreArchivo.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) return '🖼️';
        if (['mp4', 'mov', 'avi', 'wmv', 'mkv'].includes(extension)) return '🎬';
        if (extension === 'pdf') return '📋';
        if (['doc', 'docx', 'txt', 'rtf'].includes(extension)) return '📝';
        return '📄'; // Genérico
    };


        const manejarClickEliminar = (nombreArchivo) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar el archivo "${nombreArchivo}"? Esta acción no se puede deshacer.`)) {
            if (alEliminarArchivo) {
                alEliminarArchivo(nombreArchivo);
            } else {
                console.warn("La función 'alEliminarArchivo' no fue proporcionada a ListaArchivosServidor.");
            }
        }
    };

    return (
        <ul className={estilos.listaArchivos}>
            {archivos.map((nombreArchivo) => (
                <li key={nombreArchivo} className={estilos.itemArchivo}>
                    <a
                        href={`${urlBaseApi}/download/${encodeURIComponent(nombreArchivo)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Descargar ${nombreArchivo}`}
                    >
                        <span className={estilos.iconoArchivo} aria-hidden="true">{obtenerIconoArchivo(nombreArchivo)}</span>
                        {nombreArchivo}
                    </a>
                    <button
                        onClick={() => manejarClickEliminar(nombreArchivo)}
                        className={estilos.botonEliminarItem}
                        title={`Eliminar ${nombreArchivo} del servidor`}
                        aria-label={`Eliminar archivo ${nombreArchivo}`}
                    >
                        🗑️
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default ListaArchivosServidor;