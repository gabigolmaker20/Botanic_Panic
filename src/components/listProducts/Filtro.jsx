    import React, { useState } from "react";
    import Form from "react-bootstrap/Form";
    import Button from "react-bootstrap/Button";

    const Filtro = ({ onSearch, onCategoryChange, onPriceChange }) => {
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(100);

    const handleApplyFilters = () => {
        onSearch(searchText);
        onCategoryChange(category);
        onPriceChange(price);
    };

    return (
        <div className="p-3 border rounded bg-light" style={{ minWidth: "250px" }}>
        <h5 className="mb-3">Buscar</h5>
        <Form.Control
            type="text"
            placeholder="Buscar productos..."
            className="mb-4"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
        />

        <h5 className="mb-3">Categorías</h5>
        <ul className="list-unstyled">
            <li>
            <Form.Check
                type="radio"
                label="Exterior"
                name="categoria"
                onChange={() => setCategory("Exterior")}
            />
            </li>
            <li>
            <Form.Check
                type="radio"
                label="Interior"
                name="categoria"
                onChange={() => setCategory("Interior")}
            />
            </li>
            <li>
            <Form.Check
                type="radio"
                label="Accesorio"
                name="categoria"
                onChange={() => setCategory("Accesorio")}
            />
            </li>
            <li>
            <Form.Check
                type="radio"
                label="Maceta"
                name="categoria"
                onChange={() => setCategory("Maceta")}
            />
            </li>
            <li>
            <Form.Check
                type="radio"
                label="Fertilizante"
                name="categoria"
                onChange={() => setCategory("Fertilizante")}
            />
            </li>
        </ul>

        <h5 className="mt-4">Filtrar por precio</h5>
        <Form.Label>Hasta: ${price}</Form.Label>
        <Form.Range
            min={0}
            max={100}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mb-3"
        />

        <Button variant="success" className="w-100" onClick={handleApplyFilters}>
            Aplicar filtros →
        </Button>
        </div>
    );
    };

    export default Filtro;