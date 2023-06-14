import React from "react";
import "./MenuThree.css";
import logo from "../../../imgs/imgs/logo.svg";

function MenuThree ()
{
    return ( <>

        <div className="navBar">
            <div className="logo">
                <a className="hrefStyleNone" href="http://localhost:3000/principal"><img src={ logo } alt="Logo VoVê" /></a>
            </div>
        </div>

    </> )
}

export default MenuThree;