import React from 'react';
import "./Resenha.css"
import userPicture from "../../imgs/icons/account_circle.svg"

function Resenha(props){
    return (
        <>
            <div className="usersResenhas">
                <div className="dadosDoUsuario">
                    <img src={userPicture}/> <span className="userNameResenha">{props.userName}</span> <span className="userNota">Nota: {props.userNota}</span>
                </div>
                <div className="resenhaUsuario">
                        <span className="aspas">" </span>{props.resenha}<span className="aspas"> "</span>
                </div>
            </div>
        </>
    );
}

export default Resenha;
