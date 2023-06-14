import React, { useState } from 'react';
import "../Pesquisa/Pesquisa.css";
import debounce from 'lodash.debounce';


function Pesquisa(props) {
  const [searchTerm, setSearchTerm] = useState('');


  function handleSearch(event) {
    event.preventDefault();
    props.onSearch(searchTerm);
    console.log(`Você pesquisou por: ${searchTerm}`);
  }

  const handlePesquisaDebounced = debounce((termo) => {
    props.onSearch(termo);
  }, 500);



  return (<>
    <form onSubmit={handleSearch}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Título do filme"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            handlePesquisaDebounced(event.target.value);
          }}
          className="search-input"
        />


      </div>
    </form>
  </>);
}

export default Pesquisa;