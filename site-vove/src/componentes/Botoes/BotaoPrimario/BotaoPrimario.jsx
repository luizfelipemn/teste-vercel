import React from "react";
import "../BotaoPrimario/BotaoPrimario.css"


function BotaoPrimario(props){
    return(
        <>
            <button className="btnVerde">
                <span>
                {props.tituloBtn}

                </span>
            </button>
        </>
    )
}

export default BotaoPrimario;