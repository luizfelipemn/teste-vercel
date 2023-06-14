import React from 'react';
import '../../componentes/EditarInfoUsuario/BoxEditar.css';

function BoxEditar ( props )
{

    return (
        <>
            <div className="divBoxEditarDashboard">
                <div className="divEditarDashboard">
                    <span className="tituloInputEditar">{ props.tituloInputEditar }</span>
                    <input
                       onChangA={props.onChange}
                        className="inputEditarDashboard"
                        type="text"
                    />
                </div>
            </div>
        </>
    );
}

export default BoxEditar;
