import React from 'react';
import "./Navigation.css";

function Navigation({ paginaAtual, handlePaginaClick, totalPaginas }) {
  // Função para lidar com a página anterior
  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      handlePaginaClick(paginaAtual - 1);
    }
  };

  // Função para lidar com a próxima página
  const handleProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      handlePaginaClick(paginaAtual + 1);
    }
  };

  return (
    <div className="pagination">
      <a href="#" className="page-link" onClick={handlePaginaAnterior}>Prev</a>
      {Array.from({ length: totalPaginas }).map((_, index) => (
        <a
          key={index}
          href="#"
          className={`page-link ${paginaAtual === index + 1 ? 'selected' : ''}`}
          onClick={() => handlePaginaClick(index + 1)}
        >
          {index + 1}
        </a>
      ))}
      <a href="#" className="page-link" onClick={handleProximaPagina}>Next</a>
    </div>
  );
}

export default Navigation;
