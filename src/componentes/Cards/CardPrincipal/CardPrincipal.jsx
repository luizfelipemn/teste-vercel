import React, { useState } from "react";
import "./CardPrincipal.css"
import banner from "../../../imgs/imgsTeste/poster.png"
import { useNavigate } from "react-router-dom";



function CardPrincipal(props) {
    const estiloCard = {
        backgroundImage: `url(${props.capa ? props.capa : banner})`
    };

    const[nome, setNome] = useState(props.nomeFilme);
    const[nota, setNota] = useState(props.nota);

    const usuario = sessionStorage.getItem('usuarioLogado')

    const navigate = useNavigate();

    function handleClick(){
        if(usuario == null){
            navigate("/cadastro")
        } else{
            navigate("/avaliacao")
        }
    }


    return (
        <>
        
            <div className="cardPrincipal">
                <div className="banner" style={estiloCard}>
                    <div className="texto">
                        <h1 onClick={handleClick} className="h1-texto">AVALIAR</h1>
                    </div>
                </div>

                <div className="texto">
                    <h2 className="nota">
                        Nota: {props.nota}
                    </h2>
                    <span className="nomeFilme">
                        {props.nomeFilme}
                    </span>
                
                </div>
            </div>
        </>
    );
  }

  export default CardPrincipal;