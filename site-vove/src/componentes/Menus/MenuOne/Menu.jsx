import React from "react";
import "./Menu.css"
import BotaoPrimario from "../../Botoes/BotaoPrimario/BotaoPrimario";
import BotaoSecundario from "../../Botoes/BotaoSecundario/BotaoSecundario";
import logo from "../../../imgs/imgs/logo.svg"


function Menu(){
    return(
        <>
            <div className="navBar">
                <div className="logo">
                    <a className="hrefStyleNone" href="http://localhost:3000/"><img alt="Logo VoVê" src={logo}></img></a>
                </div>
                <div className="botoes">
                    <a className="hrefStyleNone" href="http://localhost:3000/login"><BotaoSecundario tituloBtn = "Entrar" /></a>
                    <a className="hrefStyleNone" href="http://localhost:3000/cadastro"><BotaoPrimario tituloBtn = "Cadastrar" /></a>
                </div>
            </div>
        </>
    )
}

export default Menu;