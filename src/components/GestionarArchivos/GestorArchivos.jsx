import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; 
import AreaSubida from './AreaSubida/AreaSubida';
import ListaArchivosSubir from './ListaArchivosSubir/ListaArchivosSubir';
import ListaArchivosServidor from './ListaArchivosServidor/ListaArchivosServidor';
import estilos from './GestorArchivos.module.css';

const URL_BASE_API = 'http://localhost:3000';



// Cliente Axios para llamadas a la API
const apiClient = axios.create({
    baseURL: `${URL_BASE_API}`, 
});

function GestorArchivos() {
    const [archivosParaSubir, setArchivosParaSubir] = useState([]);
    const [archivosDelServidor, setArchivosDelServidor] = useState(null);
    const [estadoSubida, setEstadoSubida] = useState({ mensaje: '', tipo: '' });
    const [subiendo, setSubiendo] = useState(false);

    const manejarNuevosArchivos = useCallback((nuevosArchivos) => {
        setArchivosParaSubir(prevArchivos => {
            const archivosFiltrados = nuevosArchivos.filter(
                nuevo => !prevArchivos.some(existente => 
                    existente.name === nuevo.name && 
                    existente.size === nuevo.size &&
                    existente.lastModified === nuevo.lastModified
                )
            );
            return [...prevArchivos, ...archivosFiltrados];
        });
    }, []);

    const quitarArchivoDeLista = useCallback((indice) => {
        setArchivosParaSubir(prevArchivos => prevArchivos.filter((_, i) => i !== indice));
    }, []);

    const subirArchivos = async () => {
        if (archivosParaSubir.length === 0) {
            setEstadoSubida({ mensaje: 'Por favor, selecciona al menos un archivo.', tipo: 'error' });
            return;
        }

        const formData = new FormData();
        archivosParaSubir.forEach(archivo => {
            formData.append('files', archivo);
        });

        setSubiendo(true);
        setEstadoSubida({ mensaje: 'Subiendo archivos...', tipo: 'info' });

        try {
            // Usando apiClient (axios)
            const respuesta = await apiClient.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            // Axios pone la respuesta en .data
            setEstadoSubida({ mensaje: respuesta.data.message || '¡Archivos subidos exitosamente!', tipo: 'exito' });
            setArchivosParaSubir([]);
            obtenerArchivosDelServidor();
        } catch (error) {
            console.error('Error en la subida:', error);
            if (error.response) {
                setEstadoSubida({ mensaje: `Error: ${error.response.data.message || 'Error del servidor al subir.'}`, tipo: 'error' });
            } else if (error.request) {
                setEstadoSubida({ mensaje: 'Error de red: No se pudo conectar al servidor.', tipo: 'error' });
            } else {
                setEstadoSubida({ mensaje: 'Error desconocido al intentar subir archivos.', tipo: 'error' });
            }
        } finally {
            setSubiendo(false);
        }
    };

    const obtenerArchivosDelServidor = useCallback(async () => {
        const esMensajeCritico = estadoSubida.tipo === 'exito' || estadoSubida.tipo === 'error';
        try {
            // Usando apiClient (axios)
            const respuesta = await apiClient.get('/files');
            // Axios pone la respuesta en .data
            setArchivosDelServidor(respuesta.data);
            if (!esMensajeCritico && estadoSubida.mensaje !== 'Procesando...' && !estadoSubida.mensaje.toLowerCase().includes('eliminando')) {
                setEstadoSubida({ mensaje: '', tipo: '' });
            }
        } catch (error) {
            console.error('Error de conexión al obtener archivos:', error);
            setArchivosDelServidor([]);
            if (error.response) {
                setEstadoSubida({ mensaje: `Error del servidor: ${error.response.data.message || 'No se pudo cargar la lista de archivos.'}`, tipo: 'error'});
            } else if (error.request) {
                setEstadoSubida({ mensaje: 'Error de red al obtener la lista de archivos.', tipo: 'error'});
            } else {
                setEstadoSubida({ mensaje: 'Error desconocido al obtener la lista de archivos.', tipo: 'error'});
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [estadoSubida.tipo, estadoSubida.mensaje]);


    const eliminarArchivoDelServidor = async (nombreArchivo) => {
        setSubiendo(true);
        setEstadoSubida({ mensaje: `Eliminando ${nombreArchivo}...`, tipo: 'info' });

        try {
            // Usando apiClient (axios)
            const respuesta = await apiClient.delete(`/delete/${encodeURIComponent(nombreArchivo)}`);
            // Axios pone la respuesta en .data
            setEstadoSubida({ mensaje: respuesta.data.message || `Archivo '${nombreArchivo}' eliminado.`, tipo: 'exito' });
            setArchivosDelServidor(prevArchivos => prevArchivos.filter(archivo => archivo !== nombreArchivo));

        } catch (error) {
            console.error(`Error al eliminar ${nombreArchivo}:`, error);
            if (error.response) {
                setEstadoSubida({ mensaje: `Error: ${error.response.data.message || 'No se pudo eliminar el archivo.'}`, tipo: 'error' });
            } else if (error.request) {
                setEstadoSubida({ mensaje: 'Error de red al intentar eliminar el archivo.', tipo: 'error' });
            } else {
                setEstadoSubida({ mensaje: 'Error desconocido al intentar eliminar el archivo.', tipo: 'error' });
            }
        } finally {
            setSubiendo(false);
        }
    };

    useEffect(() => {
        obtenerArchivosDelServidor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={estilos.contenedorPrincipal}>
            <header className={estilos.cabeceraPagina}>
                <h1>Gestor de Archivos Botanic Panic 🌿</h1>
                <p>Sube y administra tus documentos, imágenes y videos relacionados con plantas.</p>
            </header>

            <section className={estilos.seccionSubida}>
                <h2>Subir Nuevos Archivos</h2>
                <AreaSubida alSeleccionarArchivos={manejarNuevosArchivos} />
                
                <ListaArchivosSubir
                    archivos={archivosParaSubir}
                    alQuitarArchivo={quitarArchivoDeLista}
                />
                
                <button 
                    onClick={subirArchivos} 
                    className={`${estilos.boton} ${estilos.botonSubir}`} 
                    disabled={archivosParaSubir.length === 0 || subiendo}
                >
                    {subiendo && estadoSubida.mensaje.toLowerCase().includes('subiendo') ? 'Subiendo...' : `Subir ${archivosParaSubir.length > 0 ? `(${archivosParaSubir.length})` : ''} Archivo(s)`}
                </button>

                {estadoSubida.mensaje && (
                    <div className={`${estilos.estadoSubida} ${estilos[estadoSubida.tipo] || ''}`}>
                        {estadoSubida.mensaje}
                    </div>
                )}
            </section>

            <section className={estilos.seccionListaArchivos}>
                <h2>Archivos en el Servidor</h2>
                <button 
                    onClick={obtenerArchivosDelServidor} 
                    className={`${estilos.boton} ${estilos.botonRefrescar}`}
                    disabled={subiendo} // Deshabilitar si se está subiendo o eliminando
                >
                    Refrescar Lista de Archivos
                </button>
                <ListaArchivosServidor 
                    archivos={archivosDelServidor} 
                    urlBaseApi={URL_BASE_API} 
                    alEliminarArchivo={eliminarArchivoDelServidor}
                />
            </section>
        </div>
    );
}

export default GestorArchivos;