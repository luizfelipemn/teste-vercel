import React from 'react';
import "./TituloLinhaVerde.css"
import LinhaVerde from "../../imgs/icons/linhaVerde.svg"


function TituloLinhaVerde(props) {
  return (
    <>
        <div className="tituloLinhaVerde">
            <h1 className='titleLinhaVerdeText'>
                {props.titulo}
            </h1>
        </div>
    </>
  );
}

export default TituloLinhaVerde;