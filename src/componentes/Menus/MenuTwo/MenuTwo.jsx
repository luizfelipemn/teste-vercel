import React from "react"
import "../MenuOne/Menu.css"
import "../MenuTwo/MenuTwo.css"
import logo from "../../../imgs/imgs/logo.svg"
import iconMenu from "../../../imgs/icons/menuListIcon.svg"
import perfilIcon from "../../../imgs/icons/perfilIcon.svg"
import setaBaixo from "../../../imgs/icons/down arrow.svg";
import MenuHamburger from "../MenuHambuger/MenuHamburger"
import { useNavigate } from "react-router-dom"
import MenuLista from "../Listas/MenuLista"

function MenuTwo(props){
    const navigate = useNavigate();
    
    return(
        <>
            <div className="navBar">
                <div className="logo">
                    <a className="hrefStyleNone" href="http://localhost:3000/principal"><img alt="Logo VoVê" src={logo}></img></a>
                </div>
                <div className="menuRight">
                    <MenuLista/>
                    <img className="iconProfile" src={perfilIcon}/>
                    <div className="userNav">
                        <span className="userName">
                            {props.userName}
                        </span>
                        <MenuHamburger />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuTwo;