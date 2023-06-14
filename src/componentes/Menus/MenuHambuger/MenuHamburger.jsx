import React, { useState } from "react";
import "./MenuHamburger.css";
import PerfilIcon from "../../../imgs/icons/account_circle.svg"
import infoIcon from "../../../imgs/icons/info.svg"
import exitIcon from "../../../imgs/icons/logout.svg"
import { useNavigate } from "react-router-dom";
import api from "../../../api";


function MenuHamburger() {
  const idUser = sessionStorage.getItem('idUser');

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function handleLogout() {
    console.log(idUser)

    api.post(`usuarios/deslogar/${idUser}`)
      .then(() => {
        // Limpa os dados do usuário armazenados (por exemplo, localStorage)
        sessionStorage.removeItem("idUser");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem('usuarioLogado');
        sessionStorage.removeItem('nomeUsuario');

        // Redireciona para a página de login ou qualquer outra página desejada
        navigate("/");
      })
      .catch((error) => {
        console.error("Erro ao deslogar:", error);
        // Lida com erros, por exemplo, exibindo uma mensagem de erro
      });
  }

  return (
    <div className="menu-container">
      <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`menu-items ${isOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => navigate("/dashboard")}>Perfil <img src={PerfilIcon} /></li>
          <li onClick={() => navigate("/sobreNos")}>Sobre nós <img src={infoIcon} /></li>
          <li onClick={() => navigate("/principal")}>Página principal <img src={exitIcon} /> </li>
          <li onClick={handleLogout}>Sair <img src={exitIcon} /></li>

        </ul>
      </div>
    </div>
  );
}

export default MenuHamburger;