import React from "react";
import "../BotaoSecundario/BotaoSecundario.css"


function BotaoSecundario(props){
    return(
        <>
            <button className="btnSecundario">
                <span>
                {props.tituloBtn}

                </span>
            </button>
        </>
    )
}

export default BotaoSecundario;