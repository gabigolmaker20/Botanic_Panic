    import React from "react";
    import Form from "react-bootstrap/Form";
    import Button from "react-bootstrap/Button";

    const Filtro = () => {
    return (
        <div className="p-3 border rounded bg-light" style={{ minWidth: "250px" }}>
        <h5 className="mb-3">Buscar</h5>
        <Form.Control
            type="text"
            placeholder="Buscar productos..."
            className="mb-4"
        />

        <h5 className="mb-3">Categorías</h5>
        <ul className="list-unstyled">
            <li><Form.Check type="checkbox" label="Categoria" /></li>
        
        </ul>

        <h5 className="mt-4">Filtrar por precio</h5>
        <Form.Label>Rango: $2500 — $15000</Form.Label>
        <Form.Range min={2500} max={15000} className="mb-3" />

        <Button variant="success" className="w-100">
            Aplicar filtros →
        </Button>
        </div>
    );
    };

    export default Filtro;