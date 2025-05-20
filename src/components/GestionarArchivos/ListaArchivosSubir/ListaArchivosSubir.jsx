import React from 'react';
import estilos from './ListaArchivosSubir.module.css';

function ListaArchivosSubir({ archivos, alQuitarArchivo }) {
    if (!archivos || archivos.length === 0) {
        return null;
    }

    return (
        <div className={estilos.contenedorVistaPrevia}>
            <h4>Archivos seleccionados para subir:</h4>
            <ul>
                {archivos.map((archivo, indice) => (
                    <li key={`${archivo.name}-${archivo.lastModified}-${indice}`} className={estilos.itemVistaPrevia}>
                        <span className={estilos.nombreArchivo} title={archivo.name}>
                            {archivo.name} ({(archivo.size / 1024).toFixed(1)} KB)
                        </span>
                        <button
                            onClick={() => alQuitarArchivo(indice)}
                            className={estilos.botonQuitarArchivo}
                            title="Quitar archivo de la lista"
                            aria-label={`Quitar ${archivo.name} de la lista`}
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaArchivosSubir;