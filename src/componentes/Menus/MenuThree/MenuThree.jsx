import React from "react";
import "./MenuThree.css";
import logo from "../../../imgs/imgs/logo.svg";
import { useNavigate } from "react-router-dom";

function MenuThree ()
{
    const navigate = useNavigate();
    const handlePrincipalClick = () => {
        navigate("/principal");
      };
    return ( <>

        <div className="navBar">
            <div className="logo">
            <a className="hrefStyleNone" onClick={handlePrincipalClick}><img src={ logo } alt="Logo VoVê" /></a>
            </div>
        </div>

    </> )
}

export default MenuThree;