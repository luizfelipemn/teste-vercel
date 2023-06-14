import React from "react";
import "./Menu.css"
import BotaoPrimario from "../../Botoes/BotaoPrimario/BotaoPrimario";
import BotaoSecundario from "../../Botoes/BotaoSecundario/BotaoSecundario";
import logo from "../../../imgs/imgs/logo.svg"
import { useNavigate } from "react-router-dom";


function Menu(){
    const navigate = useNavigate();
    const handleIndexClick = () => {
        navigate("/");
      };

    const handleLoginClick = () => {
      navigate("/login");
    };

    const handleCadastroClick = () => {
      navigate("/cadastro");
    };
    return(
        <>
            <div className="navBar">
                <div className="logo">
                <a className="hrefStyleNone" onClick={handleIndexClick}><img alt="Logo VoVê" src={logo}></img></a>
                </div>
                <div className="botoes">
                <a className="hrefStyleNone" onClick={handleLoginClick} ><BotaoSecundario tituloBtn = "Entrar" /></a>
                    <a className="hrefStyleNone" onClick={handleCadastroClick}><BotaoPrimario tituloBtn = "Cadastrar" /></a>
                </div>
            </div>
        </>
    )
}

export default Menu;