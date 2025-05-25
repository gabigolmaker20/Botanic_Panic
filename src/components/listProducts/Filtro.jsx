import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Filtro = ({ onSearch, onCategoryChange, onPriceChange }) => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(1000);

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
            label="Suculenta"
            name="categoria"
            onChange={() => setCategory("Suculenta")}
          />
        </li>
        <li>
          <Form.Check
            type="radio"
            label="Romero"
            name="categoria"
            onChange={() => setCategory("Romero")}
          />
        </li>
        <li>
          <Form.Check
            type="radio"
            label="Cinta"
            name="categoria"
            onChange={() => setCategory("Cinta")}
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
