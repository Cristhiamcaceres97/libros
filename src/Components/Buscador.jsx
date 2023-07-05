import React, { useState } from "react";
import axios from "axios";
import "./Buscador.css";

const Buscador = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${busqueda}`
      );

      const data = response.data.docs;                   
                                                   
      setResultados(data);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div>
      <nav>
        <div className="navbar">
          <h1 className="logo">Mi Tienda</h1>
          <form onSubmit={handleSubmit} className="search-form">
            <input
              type="text"
              placeholder="Buscar libro..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Buscar
            </button>
          </form>
        </div>
      </nav>

      <div className="buscador-container">
        {resultados.map((libro) => (
          <div key={libro.key} className="libro-item">
            <img
              src={`http://covers.openlibrary.org/b/ID/${libro.cover_i}-M.jpg`}
              alt={libro.title}
              className="libro-imagen"
            />
            <div className="libro-info">
              <h2 className="libro-titulo">{libro.title}</h2>
              <p className="libro-autor">
                Autor: {libro.author_name?.join(", ")}
              </p>
              <p className="libro-publicacion">
                Publicación: {libro.first_publish_year}
              </p>
              <p className="libro-precio">Precio: No disponible</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buscador;
