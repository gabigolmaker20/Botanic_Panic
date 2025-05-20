import React, { useRef, useState, useCallback } from 'react';
import estilos from './AreaSubida.module.css';

function AreaSubida({ alSeleccionarArchivos }) {
    const entradaArchivoRef = useRef(null);
    const [arrastrando, setArrastrando] = useState(false);

    const manejarClick = () => {
        entradaArchivoRef.current?.click();
    };

    const manejarCambioInput = (evento) => {
        if (evento.target.files) {
            alSeleccionarArchivos(Array.from(evento.target.files));
            evento.target.value = '';
        }
    };

    const manejarDragOver = useCallback((evento) => {
        evento.preventDefault();
        evento.stopPropagation();
        if (!arrastrando) setArrastrando(true);
    }, [arrastrando]);

    const manejarDragLeave = useCallback((evento) => {
        evento.preventDefault();
        evento.stopPropagation();
        setArrastrando(false);
    }, []);

    const manejarDrop = useCallback((evento) => {
        evento.preventDefault();
        evento.stopPropagation();
        setArrastrando(false);
        if (evento.dataTransfer.files && evento.dataTransfer.files.length > 0) {
            alSeleccionarArchivos(Array.from(evento.dataTransfer.files));
        }
    }, [alSeleccionarArchivos]);

    return (
        <div
            className={`${estilos.areaSubida} ${arrastrando ? estilos.arrastrandoEncima : ''}`}
            onClick={manejarClick}
            onDragOver={manejarDragOver}
            onDragLeave={manejarDragLeave}
            onDrop={manejarDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && manejarClick()}
            aria-label="Área para subir archivos. Haz clic o arrastra archivos aquí."
        >
            <input
                type="file"
                ref={entradaArchivoRef}
                multiple
                hidden
                onChange={manejarCambioInput}
                aria-hidden="true"
            />
            <div className={estilos.iconoSubida}>📄</div>
            <p>
                Arrastra archivos aquí o{' '}
                <span className={estilos.etiquetaSeleccionarArchivos}>
                    selecciona desde tu ordenador
                </span>
            </p>
            <p className={estilos.infoTiposArchivo}>(Texto, Imágenes, Videos)</p>
        </div>
    );
}

export default AreaSubida;