import React from "react";
import '../../componentes/boxCircleGreen/BoxCircleGreen.css';

function BoxCircleGreen (props)
{
    return (
        <>
            <div className="divBoxCircleGreen">
                <span className="tituloBoxCircleGreen">{props.tituloBoxCircleGreen}</span>
                <div className="divCircleGreen">
                    <span className="spanCircleGreen">{props.spanCircleGreen}</span>
                </div>
            </div>
        </>
    )
}

export default BoxCircleGreen;