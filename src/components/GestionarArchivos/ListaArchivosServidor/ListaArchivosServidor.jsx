import React from 'react';
import estilos from './ListaArchivosServidor.module.css';

function ListaArchivosServidor({ archivos, urlBaseApi, alEliminarArchivo }) {
    if (!archivos) {
        return <p className={estilos.sinArchivos}>Cargando archivos del servidor...</p>;
    }
    if (archivos.length === 0) {
        return <p className={estilos.sinArchivos}>No hay archivos actualmente en el servidor.</p>;
    }

    const obtenerIconoArchivo = (nombreDelArchivoStr) => { // Renombrar para claridad
        if (typeof nombreDelArchivoStr !== 'string') { // Buena práctica: chequeo de tipo
            console.warn("obtenerIconoArchivo recibió algo que no es un string:", nombreDelArchivoStr);
            return '❓'; // Icono de error o fallback
        }
        const extension = nombreDelArchivoStr.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) return '🖼️';
        if (['mp4', 'mov', 'avi', 'wmv', 'mkv'].includes(extension)) return '🎬';
        if (extension === 'pdf') return '📋';
        if (['doc', 'docx', 'txt', 'rtf'].includes(extension)) return '📝';
        return '📄'; // Genérico
    };

    const manejarClickEliminar = (nombreDelArchivoStr) => { // Renombrar para claridad
        if (window.confirm(`¿Estás seguro de que quieres eliminar el archivo "${nombreDelArchivoStr}"? Esta acción no se puede deshacer.`)) {
            if (alEliminarArchivo) {
                alEliminarArchivo(nombreDelArchivoStr);
            } else {
                console.warn("La función 'alEliminarArchivo' no fue proporcionada a ListaArchivosServidor.");
            }
        }
    };

    return (
        <ul className={estilos.listaArchivos}>
            {/* Cambia 'nombreArchivo' a 'archivo' o 'archivoObjeto' para representar el objeto */}
            {archivos.map((archivo) => (
                // Usa archivo.name para la key si es único, o combina con index si es necesario
                // pero como el backend envía solo nombres de archivo, archivo.name es el identificador.
                <li key={archivo.name} className={estilos.itemArchivo}>
                    <a
                        // ASUMIENDO QUE TU RUTA DE DESCARGA EN EL BACKEND ES /download/:filename
                        // Y que urlBaseApi es solo http://localhost:3000
                        href={`${urlBaseApi}/download/${encodeURIComponent(archivo.name)}`}
                        // SI QUIERES USAR LA URL QUE YA VIENE DEL BACKEND (que es /uploads/nombre)
                        // SERÍA: href={`${urlBaseApi}${archivo.url}`} (esto abriría el archivo directamente, no forzaría descarga)
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Descargar ${archivo.name}`}
                    >
                        <span className={estilos.iconoArchivo} aria-hidden="true">
                            {obtenerIconoArchivo(archivo.name)} {/* Usa archivo.name */}
                        </span>
                        {archivo.name} {/* Usa archivo.name para mostrar el nombre */}
                    </a>
                    <button
                        onClick={() => manejarClickEliminar(archivo.name)} 
                        className={estilos.botonEliminarItem}
                        title={`Eliminar ${archivo.name} del servidor`}
                        aria-label={`Eliminar archivo ${archivo.name}`}
                    >
                        🗑️
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default ListaArchivosServidor;